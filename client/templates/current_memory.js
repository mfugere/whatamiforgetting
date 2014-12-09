Template.currentMemory.helpers({
    currentMemory: function() {
        var randomEntry = Math.floor(Math.random() * Memories.find().count());
        return Memories.find().fetch()[randomEntry];
    }
});

Template.currentMemory.events({
    "click .flag": function() {
        Memories.update(this._id, { $set: { flagged: true }});
    }
});