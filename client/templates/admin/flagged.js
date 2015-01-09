Template.flagged.events({
    "click .unflag": function() {
        Meteor.call("unflagMemory", this._id, function(error) {
            if (error) {
                console.error(error);
            }
        });
    },
    "click .delete": function() {
        Meteor.call("deleteMemory", this._id, function(error) {
            if (error) {
                console.error(error);
            }
        });
    }
});