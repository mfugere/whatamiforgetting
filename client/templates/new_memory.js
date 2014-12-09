Template.newMemory.events({
    "submit .new-memory": function(event) {
        Memories.insert({
            text: event.target.text.value,
            added: new Date().toDateString(),
            upvotes: 0,
            flagged: false
        });
        event.target.text.value = "";

        return false;
    }
});