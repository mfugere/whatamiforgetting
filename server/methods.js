Meteor.methods({
    randomMemory: function(read) {
        if (read === null) {
            read = [];
        }
        var randomIndex = Math.floor(Math.random() * Memories.find({ flagged: false, _id: { $nin: read }}).count());
        var randomValue = Memories.find({ flagged: false, _id: { $nin: read }}).fetch()[randomIndex];
        if (randomValue === undefined && read.length > 0) {
            throw new Meteor.Error("no-unread", "No unread values were found.");
        } else {
            return randomValue;
        }
    },
    addMemory: function(text) {
        Memories.insert({
            text: text,
            added: new Date().toDateString(),
            upvotes: 0,
            flagged: false
        });
    }
});