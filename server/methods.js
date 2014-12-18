Meteor.methods({
    addMemory: function(text) {
        Memories.insert({
            text: text,
            added: new Date().toDateString(),
            upvotes: 0,
            flagged: false
        });
    }
});