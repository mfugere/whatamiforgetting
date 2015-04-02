Meteor.publish("memoriesBy", function(type) {
	var specifier = { sort: {}};
	specifier["sort"][type] = -1;
    return Memories.find({ flagged: false }, specifier);
});

Meteor.publish("flagged", function() {
    return Memories.find({ flagged: true });
});