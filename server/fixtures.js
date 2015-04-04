if (Memories.find().count() === 0) {
    Memories.insert({
        text: "Pick up something at the supermarket",
        added: new Date(),
        upvotes: 0,
        flagged: false,
        tags: []
    });
    Memories.insert({
        text: "Read framework documentation",
        added: new Date(),
        upvotes: 0,
        flagged: false,
        tags: []
    });
}

if (Meteor.users.find().count() === 0) {
    Accounts.createUser({ username: "admin", password: "password", profile: { logins: 0 }});
}