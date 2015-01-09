Template.newMemory.events({
    "submit .new-memory": function(event) {
        event.preventDefault();
        Meteor.call("addMemory", event.target.text.value, function(error) {
            if (error) {
                Session.set("error", error);
                console.error(error); // TODO: replace with visible error messaging.
            } else {
                event.target.text.value = "";
            }
        });
    }
});