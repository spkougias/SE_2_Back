import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 },  // Baseline
    { duration: '20s', target: 1200 }, // Spike: Rapidly exceed (NFR: 1000 users)
    { duration: '20s', target: 50 },   // Scale back
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'], // Max 1.5s response time during a spike
    http_req_failed: ['rate<0.05'],    // Allow 5% failure during extreme spike
  },
};

export default function () {
  const BASE_URL = __ENV.API_URL || 'http://localhost:8080';

  // 1. Spike Test for Route: Search
  const resSearch = http.get(`${BASE_URL}/search?q=Event`);
  const responseBody = resSearch.json();
  
  check(resSearch, { 
    'search status 200': (r) => r.status === 200,
    // Check if the API actually returned an array/list of data
    'search returns events': (r) => responseBody.data && Array.isArray(responseBody.data.events)
  });
  
  // 2. Spike Test for Route: Event by ID
  const events = responseBody.data && responseBody.data.events;
  
  if (events && events.length > 0) { // Events exist
    // Pick the ID of the first event found
    const firstId = events[0].id; 
    const resEvent = http.get(`${BASE_URL}/event/${firstId}`);
    check(resEvent, { 'fetch existing event status 200': (r) => r.status === 200 });
  } else { // No events exist
    const resEvent = http.get(`${BASE_URL}/event/non-existent`);
    check(resEvent, { 'event route returns 404': (r) => r.status === 404 });
  }

  sleep(0.5); // Faster requests to simulate spike
}
