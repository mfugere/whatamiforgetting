if (Memories.find().count() === 0) {
    Memories.insert({
        text: "Pick up something at the supermarket",
        added: "Mon Dec 8 2014",
        upvotes: 3,
        flagged: false
    });
    Memories.insert({
        text: "Read framework documentation",
        added: "Tue Dec 9 2014",
        upvotes: 0,
        flagged: false
    });
    Memories.insert({
        text: "Take my vitamins",
        added: "Fri Dec 5 2014",
        upvotes: 1,
        flagged: false
    });
    Memories.insert({
        text: "Have sex with your mom",
        added: "Wed Dec 3 2014",
        upvotes: 0,
        flagged: true
    });
}

if (Meteor.users.find().count() === 0) {
    Accounts.createUser({ username: "admin", password: "password", profile: { logins: 0 }});
}