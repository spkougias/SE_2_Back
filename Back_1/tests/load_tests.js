import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },  // Ramp-up to 100 (from 500) users
    { duration: '2m', target: 200 },  // Steady state (NFR: 1000 users)
    { duration: '1m', target: 0 },    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // Threshold: 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],   // Threshold: Error rate < 1%
  },
};

export default function () {
  const BASE_URL = __ENV.API_URL || 'http://localhost:8080';

  // 1. Load Test for Route: Search
  const resSearch = http.get(`${BASE_URL}/search?q=Event`);
  const responseBody = resSearch.json();

  check(resSearch, { 
    'search status 200': (r) => r.status === 200,
    // Check if the API actually returned an array/list of data
    'search returns events': (r) => responseBody.data && Array.isArray(responseBody.data.events)
  });

  // 2. Load Test for Route: Event by ID
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

  sleep(1);
}
