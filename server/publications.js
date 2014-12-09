Meteor.publish("memories", function() {
    return Memories.find({ flagged: false });
});