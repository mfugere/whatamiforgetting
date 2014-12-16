Meteor.methods({
    randomMemory: function(read) {
        if (read === null) {
            read = [];
        }
        var randomEntry = Math.floor(Math.random() * Memories.find({ flagged: false, _id: { $nin: read }}).count());
        return Memories.find({ flagged: false, _id: { $nin: read }}).fetch()[randomEntry];
    }
});