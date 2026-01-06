/**
 * Hardcoded mock data to ensure the system is runnable without a database.
 * Includes 3 entities: Users, Events, Comments.
 */

export const mockUsers = [
    {
        _id: "u1",
        id: "u1",
        username: "spyros",
        name: "Kougias Spyros",
        email: "kspyrido@ece.auth.gr",
        isAdmin: true,
        followers: [],
        following: ["u2"],
        gaveLocationPermission: true
    },
    {
        _id: "u2",
        id: "u2",
        username: "giannis",
        name: "Papadopoulos Giannis",
        email: "giannis@example.com",
        isAdmin: false,
        followers: ["u1"],
        following: [],
        gaveLocationPermission: false
    },
    {
        _id: "u3",
        id: "u3",
        username: "george",
        name: "Hadjilyras Giorgos",
        email: "george@example.com",
        isAdmin: false,
        followers: [],
        following: [],
        gaveLocationPermission: true
    }
];

export const mockComments = [
    {
        _id: "c1",
        id: "c1",
        text: "Can't wait for this!",
        poster: "u2",
        eventId: 101,
        isPinned: false
    },
    {
        _id: "c2",
        id: "c2",
        text: "Is there parking available?",
        poster: "u3",
        eventId: 101,
        isPinned: true
    }
];

export const mockEvents = [
  {
    "id": 1,
    "name": "Event 1",
    "host": "Host-1",
    "description": "NFR Test event 1 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 1,
    "location": [
      41.6,
      23.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 2,
    "name": "Event 2",
    "host": "Host-2",
    "description": "NFR Test event 2 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 2,
    "location": [
      42.6,
      23.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 3,
    "name": "Event 3",
    "host": "Host-3",
    "description": "NFR Test event 3 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 3,
    "location": [
      43.6,
      24.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 4,
    "name": "Event 4",
    "host": "Host-4",
    "description": "NFR Test event 4 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 4,
    "location": [
      44.6,
      24.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 5,
    "name": "Event 5",
    "host": "Host-5",
    "description": "NFR Test event 5 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 5,
    "location": [
      45.6,
      25.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 6,
    "name": "Event 6",
    "host": "Host-6",
    "description": "NFR Test event 6 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 6,
    "location": [
      46.6,
      25.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 7,
    "name": "Event 7",
    "host": "Host-7",
    "description": "NFR Test event 7 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 7,
    "location": [
      47.6,
      26.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 8,
    "name": "Event 8",
    "host": "Host-8",
    "description": "NFR Test event 8 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 8,
    "location": [
      48.6,
      26.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 9,
    "name": "Event 9",
    "host": "Host-9",
    "description": "NFR Test event 9 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 9,
    "location": [
      49.6,
      27.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 10,
    "name": "Event 10",
    "host": "Host-10",
    "description": "NFR Test event 10 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 10,
    "location": [
      50.6,
      27.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 11,
    "name": "Event 11",
    "host": "Host-11",
    "description": "NFR Test event 11 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 11,
    "location": [
      51.6,
      28.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 12,
    "name": "Event 12",
    "host": "Host-12",
    "description": "NFR Test event 12 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 12,
    "location": [
      52.6,
      28.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 13,
    "name": "Event 13",
    "host": "Host-13",
    "description": "NFR Test event 13 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 13,
    "location": [
      53.6,
      29.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 14,
    "name": "Event 14",
    "host": "Host-14",
    "description": "NFR Test event 14 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 14,
    "location": [
      54.6,
      29.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 15,
    "name": "Event 15",
    "host": "Host-15",
    "description": "NFR Test event 15 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 15,
    "location": [
      55.6,
      30.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 16,
    "name": "Event 16",
    "host": "Host-16",
    "description": "NFR Test event 16 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 16,
    "location": [
      56.6,
      30.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 17,
    "name": "Event 17",
    "host": "Host-17",
    "description": "NFR Test event 17 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 17,
    "location": [
      57.6,
      31.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 18,
    "name": "Event 18",
    "host": "Host-18",
    "description": "NFR Test event 18 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 18,
    "location": [
      58.6,
      31.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 19,
    "name": "Event 19",
    "host": "Host-19",
    "description": "NFR Test event 19 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 19,
    "location": [
      59.6,
      32.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 20,
    "name": "Event 20",
    "host": "Host-20",
    "description": "NFR Test event 20 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 20,
    "location": [
      60.6,
      32.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 21,
    "name": "Event 21",
    "host": "Host-21",
    "description": "NFR Test event 21 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 21,
    "location": [
      61.6,
      33.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 22,
    "name": "Event 22",
    "host": "Host-22",
    "description": "NFR Test event 22 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 22,
    "location": [
      62.6,
      33.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 23,
    "name": "Event 23",
    "host": "Host-23",
    "description": "NFR Test event 23 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 23,
    "location": [
      63.6,
      34.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 24,
    "name": "Event 24",
    "host": "Host-24",
    "description": "NFR Test event 24 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 24,
    "location": [
      64.6,
      34.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 25,
    "name": "Event 25",
    "host": "Host-25",
    "description": "NFR Test event 25 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 25,
    "location": [
      65.6,
      35.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 26,
    "name": "Event 26",
    "host": "Host-26",
    "description": "NFR Test event 26 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 26,
    "location": [
      66.6,
      35.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 27,
    "name": "Event 27",
    "host": "Host-27",
    "description": "NFR Test event 27 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 27,
    "location": [
      67.6,
      36.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 28,
    "name": "Event 28",
    "host": "Host-28",
    "description": "NFR Test event 28 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 28,
    "location": [
      68.6,
      36.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 29,
    "name": "Event 29",
    "host": "Host-29",
    "description": "NFR Test event 29 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 29,
    "location": [
      69.6,
      37.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 30,
    "name": "Event 30",
    "host": "Host-30",
    "description": "NFR Test event 30 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 30,
    "location": [
      70.6,
      37.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 31,
    "name": "Event 31",
    "host": "Host-31",
    "description": "NFR Test event 31 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 31,
    "location": [
      71.6,
      38.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 32,
    "name": "Event 32",
    "host": "Host-32",
    "description": "NFR Test event 32 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 32,
    "location": [
      72.6,
      38.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 33,
    "name": "Event 33",
    "host": "Host-33",
    "description": "NFR Test event 33 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 33,
    "location": [
      73.6,
      39.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 34,
    "name": "Event 34",
    "host": "Host-34",
    "description": "NFR Test event 34 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 34,
    "location": [
      74.6,
      39.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 35,
    "name": "Event 35",
    "host": "Host-35",
    "description": "NFR Test event 35 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 35,
    "location": [
      75.6,
      40.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 36,
    "name": "Event 36",
    "host": "Host-36",
    "description": "NFR Test event 36 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 36,
    "location": [
      76.6,
      40.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 37,
    "name": "Event 37",
    "host": "Host-37",
    "description": "NFR Test event 37 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 37,
    "location": [
      77.6,
      41.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 38,
    "name": "Event 38",
    "host": "Host-38",
    "description": "NFR Test event 38 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 38,
    "location": [
      78.6,
      41.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 39,
    "name": "Event 39",
    "host": "Host-39",
    "description": "NFR Test event 39 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 39,
    "location": [
      79.6,
      42.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 40,
    "name": "Event 40",
    "host": "Host-40",
    "description": "NFR Test event 40 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 40,
    "location": [
      80.6,
      42.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 41,
    "name": "Event 41",
    "host": "Host-41",
    "description": "NFR Test event 41 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 41,
    "location": [
      81.6,
      43.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 42,
    "name": "Event 42",
    "host": "Host-42",
    "description": "NFR Test event 42 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 42,
    "location": [
      82.6,
      43.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 43,
    "name": "Event 43",
    "host": "Host-43",
    "description": "NFR Test event 43 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 43,
    "location": [
      83.6,
      44.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 44,
    "name": "Event 44",
    "host": "Host-44",
    "description": "NFR Test event 44 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 44,
    "location": [
      84.6,
      44.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 45,
    "name": "Event 45",
    "host": "Host-45",
    "description": "NFR Test event 45 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 45,
    "location": [
      85.6,
      45.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 46,
    "name": "Event 46",
    "host": "Host-46",
    "description": "NFR Test event 46 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 46,
    "location": [
      86.6,
      45.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 47,
    "name": "Event 47",
    "host": "Host-47",
    "description": "NFR Test event 47 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 47,
    "location": [
      87.6,
      46.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 48,
    "name": "Event 48",
    "host": "Host-48",
    "description": "NFR Test event 48 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 48,
    "location": [
      88.6,
      46.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 49,
    "name": "Event 49",
    "host": "Host-49",
    "description": "NFR Test event 49 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 49,
    "location": [
      89.6,
      47.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 50,
    "name": "Event 50",
    "host": "Host-50",
    "description": "NFR Test event 50 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 50,
    "location": [
      90.6,
      47.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 51,
    "name": "Event 51",
    "host": "Host-51",
    "description": "NFR Test event 51 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 51,
    "location": [
      91.6,
      48.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 52,
    "name": "Event 52",
    "host": "Host-52",
    "description": "NFR Test event 52 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 52,
    "location": [
      92.6,
      48.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 53,
    "name": "Event 53",
    "host": "Host-53",
    "description": "NFR Test event 53 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 53,
    "location": [
      93.6,
      49.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 54,
    "name": "Event 54",
    "host": "Host-54",
    "description": "NFR Test event 54 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 54,
    "location": [
      94.6,
      49.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 55,
    "name": "Event 55",
    "host": "Host-55",
    "description": "NFR Test event 55 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 55,
    "location": [
      95.6,
      50.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 56,
    "name": "Event 56",
    "host": "Host-56",
    "description": "NFR Test event 56 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 56,
    "location": [
      96.6,
      50.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 57,
    "name": "Event 57",
    "host": "Host-57",
    "description": "NFR Test event 57 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 57,
    "location": [
      97.6,
      51.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 58,
    "name": "Event 58",
    "host": "Host-58",
    "description": "NFR Test event 58 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 58,
    "location": [
      98.6,
      51.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 59,
    "name": "Event 59",
    "host": "Host-59",
    "description": "NFR Test event 59 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 59,
    "location": [
      99.6,
      52.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 60,
    "name": "Event 60",
    "host": "Host-60",
    "description": "NFR Test event 60 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 60,
    "location": [
      100.6,
      52.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 61,
    "name": "Event 61",
    "host": "Host-61",
    "description": "NFR Test event 61 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 61,
    "location": [
      101.6,
      53.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 62,
    "name": "Event 62",
    "host": "Host-62",
    "description": "NFR Test event 62 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 62,
    "location": [
      102.6,
      53.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 63,
    "name": "Event 63",
    "host": "Host-63",
    "description": "NFR Test event 63 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 63,
    "location": [
      103.6,
      54.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 64,
    "name": "Event 64",
    "host": "Host-64",
    "description": "NFR Test event 64 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 64,
    "location": [
      104.6,
      54.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 65,
    "name": "Event 65",
    "host": "Host-65",
    "description": "NFR Test event 65 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 65,
    "location": [
      105.6,
      55.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 66,
    "name": "Event 66",
    "host": "Host-66",
    "description": "NFR Test event 66 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 66,
    "location": [
      106.6,
      55.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 67,
    "name": "Event 67",
    "host": "Host-67",
    "description": "NFR Test event 67 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 67,
    "location": [
      107.6,
      56.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 68,
    "name": "Event 68",
    "host": "Host-68",
    "description": "NFR Test event 68 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 68,
    "location": [
      108.6,
      56.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 69,
    "name": "Event 69",
    "host": "Host-69",
    "description": "NFR Test event 69 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 69,
    "location": [
      109.6,
      57.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 70,
    "name": "Event 70",
    "host": "Host-70",
    "description": "NFR Test event 70 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 70,
    "location": [
      110.6,
      57.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 71,
    "name": "Event 71",
    "host": "Host-71",
    "description": "NFR Test event 71 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 71,
    "location": [
      111.6,
      58.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 72,
    "name": "Event 72",
    "host": "Host-72",
    "description": "NFR Test event 72 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 72,
    "location": [
      112.6,
      58.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 73,
    "name": "Event 73",
    "host": "Host-73",
    "description": "NFR Test event 73 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 73,
    "location": [
      113.6,
      59.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 74,
    "name": "Event 74",
    "host": "Host-74",
    "description": "NFR Test event 74 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 74,
    "location": [
      114.6,
      59.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 75,
    "name": "Event 75",
    "host": "Host-75",
    "description": "NFR Test event 75 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 75,
    "location": [
      115.6,
      60.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 76,
    "name": "Event 76",
    "host": "Host-76",
    "description": "NFR Test event 76 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 76,
    "location": [
      116.6,
      60.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 77,
    "name": "Event 77",
    "host": "Host-77",
    "description": "NFR Test event 77 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 77,
    "location": [
      117.6,
      61.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 78,
    "name": "Event 78",
    "host": "Host-78",
    "description": "NFR Test event 78 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 78,
    "location": [
      118.6,
      61.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 79,
    "name": "Event 79",
    "host": "Host-79",
    "description": "NFR Test event 79 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 79,
    "location": [
      119.6,
      62.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 80,
    "name": "Event 80",
    "host": "Host-80",
    "description": "NFR Test event 80 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 80,
    "location": [
      120.6,
      62.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 81,
    "name": "Event 81",
    "host": "Host-81",
    "description": "NFR Test event 81 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 81,
    "location": [
      121.6,
      63.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 82,
    "name": "Event 82",
    "host": "Host-82",
    "description": "NFR Test event 82 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 82,
    "location": [
      122.6,
      63.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 83,
    "name": "Event 83",
    "host": "Host-83",
    "description": "NFR Test event 83 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 83,
    "location": [
      123.6,
      64.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 84,
    "name": "Event 84",
    "host": "Host-84",
    "description": "NFR Test event 84 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 84,
    "location": [
      124.6,
      64.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 85,
    "name": "Event 85",
    "host": "Host-85",
    "description": "NFR Test event 85 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 85,
    "location": [
      125.6,
      65.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 86,
    "name": "Event 86",
    "host": "Host-86",
    "description": "NFR Test event 86 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 86,
    "location": [
      126.6,
      65.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 87,
    "name": "Event 87",
    "host": "Host-87",
    "description": "NFR Test event 87 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 87,
    "location": [
      127.6,
      66.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 88,
    "name": "Event 88",
    "host": "Host-88",
    "description": "NFR Test event 88 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 88,
    "location": [
      128.6,
      66.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 89,
    "name": "Event 89",
    "host": "Host-89",
    "description": "NFR Test event 89 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 89,
    "location": [
      129.6,
      67.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 90,
    "name": "Event 90",
    "host": "Host-90",
    "description": "NFR Test event 90 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 90,
    "location": [
      130.6,
      67.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 91,
    "name": "Event 91",
    "host": "Host-91",
    "description": "NFR Test event 91 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 91,
    "location": [
      131.6,
      68.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 92,
    "name": "Event 92",
    "host": "Host-92",
    "description": "NFR Test event 92 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 92,
    "location": [
      132.6,
      68.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 93,
    "name": "Event 93",
    "host": "Host-93",
    "description": "NFR Test event 93 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 93,
    "location": [
      133.6,
      69.4
    ],
    "category": [
      "Workshop"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 94,
    "name": "Event 94",
    "host": "Host-94",
    "description": "NFR Test event 94 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 94,
    "location": [
      134.6,
      69.9
    ],
    "category": [
      "Food Event"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 95,
    "name": "Event 95",
    "host": "Host-95",
    "description": "NFR Test event 95 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 95,
    "location": [
      135.6,
      70.4
    ],
    "category": [
      "Other"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 96,
    "name": "Event 96",
    "host": "Host-96",
    "description": "NFR Test event 96 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 96,
    "location": [
      136.6,
      70.9
    ],
    "category": [
      "Party"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 97,
    "name": "Event 97",
    "host": "Host-97",
    "description": "NFR Test event 97 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 97,
    "location": [
      137.6,
      71.4
    ],
    "category": [
      "Concert"
    ],
    "ageGroup": [
      "Teens"
    ]
  },
  {
    "id": 98,
    "name": "Event 98",
    "host": "Host-98",
    "description": "NFR Test event 98 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 98,
    "location": [
      138.6,
      71.9
    ],
    "category": [
      "Bazaar"
    ],
    "ageGroup": [
      "Adults"
    ]
  },
  {
    "id": 99,
    "name": "Event 99",
    "host": "Host-99",
    "description": "NFR Test event 99 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 99,
    "location": [
      139.6,
      72.4
    ],
    "category": [
      "Movie Night"
    ],
    "ageGroup": [
      "Everyone"
    ]
  },
  {
    "id": 100,
    "name": "Event 100",
    "host": "Host-100",
    "description": "NFR Test event 100 for 100 event limit.",
    "date": "2026-01-06T11:54:44.656Z",
    "price": 100,
    "location": [
      140.6,
      72.9
    ],
    "category": [
      "Competition"
    ],
    "ageGroup": [
      "Teens"
    ]
  }
];
