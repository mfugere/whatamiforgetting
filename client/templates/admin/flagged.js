Template.flagged.events({
    "click .unflag": function() {
        Meteor.call("unflagMemory", this._id, function(error) {
            if (error) {
                console.error(error);
                Session.set("error", error);
            } else {
                Session.set("message", { message: "This message is no longer flagged.", level: "success" });
            }
        });
    },
    "click .delete": function() {
        Meteor.call("deleteMemory", this._id, function(error) {
            if (error) {
                console.error(error);
                Session.set("error", error);
            } else {
                Session.set("message", { message: "Message deleted successfully.", level: "success" });
            }
        });
    }
});