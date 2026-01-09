import http from "node:http";
import test from "ava";
import got from "got";
import app from "../app.js";

import connectDB, { disconnectDB } from '../config/db.js';

test.before(async (t) => {
  await connectDB();

  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({ 
    responseType: "json", 
    prefixUrl: `http://localhost:${port}`,
    throwHttpErrors: false
  });
});

test.after.always(async (t) => {
  await disconnectDB();
  t.context.server.close();
});

// --- SEARCH TESTS ---
test("GET /search returns results", async (t) => {
  const { body, statusCode } = await t.context.got("search");
  t.is(statusCode, 200);
  t.true(body.success);
  t.truthy(body.data);
});

test("GET /search with searchText parameter", async (t) => {
  const { body, statusCode } = await t.context.got("search?searchText=disco");
  t.is(statusCode, 200);
  t.true(body.success);
});

test("GET /search with type=event filter", async (t) => {
  const { body, statusCode } = await t.context.got("search?type=event");
  t.is(statusCode, 200);
  t.true(body.success);
  t.true(Array.isArray(body.data));
});

test("GET /search with type=user filter", async (t) => {
  const { body, statusCode } = await t.context.got("search?type=user");
  t.is(statusCode, 200);
  t.true(body.success);
  t.true(Array.isArray(body.data));
});


// --- EVENT TESTS ---
test("GET /event/:eventid returns event with comments", async (t) => {
  const { body, statusCode } = await t.context.got("event/101");
  t.is(statusCode, 200);
  t.true(body.success);
  t.is(body.data.id, 101);
  t.truthy(body.data.commentsData);
});

test("GET /event/:eventid returns 404 for non-existent event", async (t) => {
  const { body, statusCode } = await t.context.got("event/999");
  t.is(statusCode, 404);
  t.false(body.success);
});

test("POST /event creates new event", async (t) => {
  const { body, statusCode } = await t.context.got.post("event", {
    json: {
      name: "Test Event",
      date: "2025-12-25T20:00:00Z",
      price: 10,
      location: [40.6401, 22.9444],
      description: "Test event description",
      category: ["Party"],
      ageGroup: ["Adults"],
      host: "u1"
    },
    headers: {
      "x-username": "spyros"
    }
  });
  t.is(statusCode, 201);
  t.true(body.success);
  t.is(body.data.name, "Test Event");
});

test("POST /event requires authentication", async (t) => {
  const { body, statusCode } = await t.context.got.post("event", {
    json: {
      name: "Test Event",
      date: "2025-12-25T20:00:00Z",
      host: "u1"
    }
  });
  t.is(statusCode, 401);
  t.false(body.success);
});

test("PUT /event/:eventid updates event", async (t) => {
  const { body, statusCode } = await t.context.got.put("event/101", {
    json: {
      price: 15,
      description: "Updated description"
    },
    headers: {
      "x-username": "u1"
    }
  });
  t.is(statusCode, 200);
  t.true(body.success);
});

test("PUT /event/:eventid prevents unauthorized updates", async (t) => {
  const { body, statusCode } = await t.context.got.put("event/101", {
    json: {
      location: [42.7235, 56.9989],
      description: "Hacked description"
    },
    headers: {
      "x-username": "u2"
    }
  });
  t.is(statusCode, 403);
  t.false(body.success);
});

test("PUT /event/:eventid cleans up empty category/ageGroup arrays", async (t) => {
  const { body, statusCode } = await t.context.got.put("event/101", {
    json: {
      category: [],       // Should be converted to ['Other']
      ageGroup: [""]      // Should be converted to ['Everyone']
    },
    headers: {
      "x-username": "u1"
    }
  });
  t.is(statusCode, 200);
  t.true(body.success);
  t.deepEqual(body.data.category, ['Other']);
  t.deepEqual(body.data.ageGroup, ['Everyone']);
});

test("DELETE /event/:eventid deletes event", async (t) => {
  // First create an event to delete
  const createResponse = await t.context.got.post("event", {
    json: {
      name: "Event to Delete",
      date: "2025-12-30T20:00:00Z",
      host: "u1",
      location: [40.6401, 22.9444]
    },
    headers: {
      "x-username": "u1"
    }
  });
  
  const eventId = createResponse.body.data.id;
  
  const { body, statusCode } = await t.context.got.delete(`event/${eventId}?confirmed=true`, {
    headers: {
      "x-username": "u1"
    }
  });
  t.is(statusCode, 204);
});

test("DELETE /event/:eventid prevents non-host/non-admin deletion", async (t) => {
  const { statusCode, body } = await t.context.got.delete("event/101?confirmed=true", {
    headers: {
      "x-username": "u2"
    }
  });
  t.is(statusCode, 403);
  t.false(body.success);
});

test("DELETE /event/:eventid returns 404 for non-existent event", async (t) => {
  const { statusCode, body } = await t.context.got.delete("event/9999?confirmed=true", {
    headers: {
      "x-username": "u1" 
    }
  });
  t.is(statusCode, 404);
  t.false(body.success);
});

test("PUT /event/:eventid/interested toggles interest", async (t) => {
  const { body, statusCode } = await t.context.got.put("event/101/interested", {
    headers: {
      "x-username": "u3"
    }
  });
  t.is(statusCode, 200);
  t.true(body.success);
  t.true(Array.isArray(body.data));
});

test("PUT /event/:eventid/vouch toggles vouch", async (t) => {
  const { body, statusCode } = await t.context.got.put("event/101/vouch", {
    headers: {
      "x-username": "u3"
    }
  });
  t.is(statusCode, 200);
  t.true(body.success);
});

test("GET /event/recommended/:username returns recommended events", async (t) => {
  const { body, statusCode } = await t.context.got("event/recommended/spyros");
  t.is(statusCode, 200);
  t.true(body.success);
  t.true(Array.isArray(body.data));
});

test("POST /event/:eventid/announcement creates announcement", async (t) => {
  const { body, statusCode } = await t.context.got.post("event/101/announcement", {
    json: {
      text: "Important announcement!"
    },
    headers: {
      "x-username": "u1"
    }
  });
  t.is(statusCode, 200);
  t.true(body.success);
});

test("POST /event/:eventid/announcement requires host permission", async (t) => {
  const { body, statusCode } = await t.context.got.post("event/101/announcement", {
    json: {
      text: "Unauthorized announcement"
    },
    headers: {
      "x-username": "u2"
    }
  });
  t.is(statusCode, 403);
  t.false(body.success);
});

test("POST /event/:eventid/announcement returns 400 if announcement text is missing", async (t) => {
  const { statusCode, body } = await t.context.got.post("event/101/announcement", {
    json: {
      text: ""
    },
    headers: {
      "x-username": "u1"
    }
  });
  t.is(statusCode, 400);
  t.false(body.success);
});


// --- COMMENT TESTS ---
test("POST /event/:eventid/comment adds comment", async (t) => {
  const { body, statusCode } = await t.context.got.post("event/101/comment", {
    json: {
      text: "This is a test comment",
      poster: "u2"
    },
    headers: {
      "x-username": "u2"
    }
  });
  t.is(statusCode, 201);
  t.true(body.success);
  t.is(body.data.text, "This is a test comment");
});

// Helper function to create a new event and comment for testing deletion/pinning
const setupCommentTest = async (t) => {
    // Create a new event
    const createEventResponse = await t.context.got.post("event", {
        json: {
            name: "Test Event for Pin/Delete Comment",
            date: "2026-01-01T20:00:00Z",
            host: "u1",
            location: [40.6401, 22.9444]
        },
        headers: {
          "x-username": "u1"
        }
    });
    const eventId = createEventResponse.body.data.id;

    // Add a new comment to the event
    const createCommentResponse = await t.context.got.post(`event/${eventId}/comment`, {
        json: {
            text: "Test Comment for Pin/Delete",
            poster: "u2"
        },
        headers: {
          "x-username": "u2"
        }
    });
    const commentId = createCommentResponse.body.data._id;

    return { eventId, commentId };
}

test("DELETE /event/:eventid/comment/:commentid by comment poster", async (t) => {
    const { eventId, commentId } = await setupCommentTest(t);

    const { statusCode } = await t.context.got.delete(`event/${eventId}/comment/${commentId}`, {
        headers: {
          "x-username": "u2"
        }
    });
    t.is(statusCode, 204);
});

test("DELETE /event/:eventid/comment/:commentid by event host", async (t) => {
    const { eventId, commentId } = await setupCommentTest(t);

    const { statusCode } = await t.context.got.delete(`event/${eventId}/comment/${commentId}`, {
        headers: {
          "x-username": "u1"
        }
    });
    t.is(statusCode, 204);
});

test("DELETE /event/:eventid/comment/:commentid prevents unauthorized deletion", async (t) => {
    const { eventId, commentId } = await setupCommentTest(t);

    const { statusCode, body } = await t.context.got.delete(`event/${eventId}/comment/${commentId}`, {
        headers: {
          "x-username": "u3"  
        }
    });
    t.is(statusCode, 403);
    t.false(body.success);
});

test("PUT /event/:eventid/comment/:commentid/pin toggles pin by host", async (t) => {
    const { eventId, commentId } = await setupCommentTest(t);

    // Pin the comment
    const pinResponse = await t.context.got.put(`event/${eventId}/comment/${commentId}/pin`, {
        headers: {
          "x-username": "u1"
        }
    });
    t.is(pinResponse.statusCode, 200);
    t.true(pinResponse.body.data.isPinned);

    // Unpin the comment
    const unpinResponse = await t.context.got.put(`event/${eventId}/comment/${commentId}/pin`, {
        headers: {
          "x-username": "u1"
        }
    });
    t.is(unpinResponse.statusCode, 200);
    t.false(unpinResponse.body.data.isPinned);
});

test("PUT /event/:eventid/comment/:commentid/pin prevents unauthorized pin", async (t) => {
    const { eventId, commentId } = await setupCommentTest(t);

    const { statusCode, body } = await t.context.got.put(`event/${eventId}/comment/${commentId}/pin`, {
        headers: {
          "x-username": "u2"
        }
    });
    t.is(statusCode, 403);
    t.false(body.success);
});


// --- USER TESTS ---
test("GET /user/:username returns user profile", async (t) => {
  const { body, statusCode } = await t.context.got("user/spyros");
  t.is(statusCode, 200);
  t.true(body.success);
  t.is(body.data.username, "spyros");
});

test("GET /user/:username returns 404 for non-existent user", async (t) => {
  const { body, statusCode } = await t.context.got("user/nonexistent");
  t.is(statusCode, 404);
  t.false(body.success);
});

test("PUT /user/:username/follow toggles follow", async (t) => {
  const { body, statusCode } = await t.context.got.put("user/george/follow", {
    headers: {
      "x-username": "u2"
    }
  });
  t.is(statusCode, 200);
  t.true(body.success);
});

test("PUT /user/:username/follow returns 404 for non-existent target user", async (t) => {
  const { statusCode, body } = await t.context.got.put("user/nonexistent/follow", {
    headers: {
      "x-username": "u2"
    }
  });
  t.is(statusCode, 404);
  t.false(body.success);
});

test("PUT /user/:username/restrict requires admin", async (t) => {
  const { body, statusCode } = await t.context.got.put("user/giannis/restrict", {
    headers: {
      "x-username": "u3"
    }
  });
  t.is(statusCode, 403);
  t.false(body.success);
});

test("PUT /user/:username/ban requires admin", async (t) => {
  const { body, statusCode } = await t.context.got.put("user/giannis/ban", {
    headers: {
      "x-username": "spyros"
    }
  });
  t.is(statusCode, 200);
  t.true(body.success);
});


// --- REPORT TESTS ---
test("POST /report sends report", async (t) => {
  const { body, statusCode } = await t.context.got.post("report", {
    json: {
      sender: "u2",
      reportedUser: "u3",
      text: "Inappropriate behavior"
    },
    headers: {
      "x-username": "u2"
    }
  });
  t.is(statusCode, 201);
  t.true(body.success);
});

test("POST /report requires authentication", async (t) => {
  const { body, statusCode } = await t.context.got.post("report", {
    json: {
      sender: "u2",
      reportedUser: "u3",
      text: "Test report"
    }
  });
  t.is(statusCode, 401);
  t.false(body.success);
});


// --- COMMUNICATION TESTS ---
test("POST /email sends email", async (t) => {
  const { body, statusCode } = await t.context.got.post("email", {
    headers: { 'x-username': 'u1' },
    json: {
      text: "Test email",
      receivers: ["user1@example.com"]
    }
  });
  t.is(statusCode, 201);
  t.true(body.success);
});

test("POST /notification sends notification", async (t) => {
  const { body, statusCode } = await t.context.got.post("notification", {
    headers: { 'x-username': 'u1' },
    json: {
      text: "Test notification",
      eventId: 101
    }
  });
  t.is(statusCode, 201);
  t.true(body.success);
});

test("POST /email returns 400 if text is missing", async (t) => {
  const { body, statusCode } = await t.context.got.post("email", {
    headers: { 'x-username': 'u1' },
    json: {
      receivers: ["user1@example.com"]
    }
  });
  t.is(statusCode, 400);
  t.false(body.success);
  t.is(body.message, 'Email text is required');
});

test("POST /notification returns 400 if text is missing", async (t) => {
  const { body, statusCode } = await t.context.got.post("notification", {
    headers: { 'x-username': 'u1' },
    json: {
      eventId: 101
    }
  });
  t.is(statusCode, 400);
  t.false(body.success);
  t.is(body.message, 'Notification text is required');
});
