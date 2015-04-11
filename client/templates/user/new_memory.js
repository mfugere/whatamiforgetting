Template.newMemory.events({
    "submit .new-memory": function(event) {
        event.preventDefault();
        Meteor.call("addMemory", event.target.text.value, function(error, result) {
            if (error) {
                Session.set("error", error);
                console.error(error);
            } else {
                event.target.text.value = "";
                Session.set("message", { message: "Memory added successfully!", level: "success" });
            }
        });
    }
});