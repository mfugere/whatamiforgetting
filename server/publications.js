Meteor.publish("memories", function() {
    return Memories.find({ flagged: false }, { sort: { upvotes: -1 }});
});