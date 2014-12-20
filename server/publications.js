Meteor.publish("memories", function() {
    return Memories.find({ flagged: false }, { sort: { upvotes: -1 }});
});

Meteor.publish("flagged", function() {
    return Memories.find({ flagged: true });
});