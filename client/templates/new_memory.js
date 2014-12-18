Template.newMemory.events({
    "submit .new-memory": function(event) {
        event.preventDefault();
        Meteor.call("addMemory", event.target.text.value, function(error) {
            if (error) {
                console.log(error);
            } else {
                event.target.text.value = "";
            }
        });
    }
});