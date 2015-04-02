if (Memories.find().count() === 0) {
    Memories.insert({
        text: "Pick up something at the supermarket",
        added: "Mon Dec 8 2014",
        upvotes: 4,
        flagged: false,
        tags: [ "shopping", "chores" ]
    });
    Memories.insert({
        text: "Read framework documentation",
        added: "Tue Dec 9 2014",
        upvotes: 0,
        flagged: false,
        tags: [ "coding", "reading", "leisure" ]
    });
    Memories.insert({
        text: "Take my vitamins",
        added: "Fri Dec 5 2014",
        upvotes: 2,
        flagged: false,
        tags: [ "health" ]
    });
    Memories.insert({
        text: "Have sex with your mom",
        added: "Wed Dec 3 2014",
        upvotes: 0,
        flagged: true,
        tags: []
    });
    Memories.insert({
        text: "Buy anniversary gift",
        added: "Thu Apr 2 2015",
        upvotes: 1,
        flagged: false,
        tags: [ "chores", "family", "relationships" ]
    });
    Memories.insert({
        text: "Do exercises at home",
        added: "Mon Mar 30 2015",
        upvotes: 0,
        flagged: false,
        tags: [ "health", "exercise", "home" ]
    });
    Memories.insert({
        text: "Take out the garbage",
        added: "Mon Mar 30 2015",
        upvotes: 3,
        flagged: false,
        tags: [ "chores", "home" ]
    });
    Memories.insert({
        text: "Call my grandmother",
        added: "Sat Mar 28 2015",
        upvotes: 1,
        flagged: false,
        tags: [ "family", "communication" ]
    });
}

if (Meteor.users.find().count() === 0) {
    Accounts.createUser({ username: "admin", password: "password", profile: { logins: 0 }});
}