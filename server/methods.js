Meteor.methods({
    addMemory: function(text) {
        if (Memories.findOne({ text: text })) {
            throw new Meteor.Error("memory-exists", "A memory already exists with this exact text!");
        } else {
            Memories.insert({
                text: text,
                added: new Date().toDateString(),
                upvotes: 0,
                flagged: false
            });
        }
    },
    upvoteMemory: function(id) {
        Memories.update(id, { $inc: { upvotes: 1 }});
    },
    flagMemory: function(id) {
        Memories.update(id, { $set: { flagged: true }});
    },
    unflagMemory: function(id) {
        Memories.update(id, { $set: { flagged: false }});
    },
    deleteMemory: function(id) {
        Memories.remove(id);
    }
});