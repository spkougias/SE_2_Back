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
        id: 101,
        name: "Summer Disco Night",
        date: new Date("2025-07-15T20:00:00Z"),
        price: 15,
        location: [40.6401, 22.9444], // Thessaloniki coordinates
        description: "The biggest disco party of the summer.",
        ageGroup: "Adults",
        category: "Party",
        host: "u1",
        photos: ["https://example.com/disco.jpg"],
        interestedIn: ["u2", "u3"],
        vouchers: ["u2"],
        comments: ["c1", "c2"]
    },
    {
        id: 102,
        name: "Tech Workshop 2025",
        date: new Date("2025-11-20T10:00:00Z"),
        price: 0,
        location: [40.6293, 22.9602],
        description: "Learn Node.js and Express.",
        ageGroup: "Everyone",
        category: "Workshop",
        host: "u2",
        photos: [],
        interestedIn: ["u1"],
        vouchers: [],
        comments: []
    },
    {
        id: 103,
        name: "Sunday Bazaar",
        date: new Date("2025-11-23T09:00:00Z"),
        price: 5,
        location: [40.6300, 22.9500],
        description: "Vintage clothes and handmade items.",
        ageGroup: "Everyone",
        category: "Bazaar",
        host: "u1",
        photos: [],
        interestedIn: [],
        vouchers: [],
        comments: []
    }
];