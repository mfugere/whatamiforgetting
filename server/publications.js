Meteor.publish("memoriesByDate", function() {
    return Memories.find({ flagged: false }, { sort: { added: -1 }});
});

Meteor.publish("memoriesByUpvotes", function() {
    return Memories.find({ flagged: false }, { sort: { upvotes: -1 }});
});

Meteor.publish("flagged", function() {
    return Memories.find({ flagged: true });
});