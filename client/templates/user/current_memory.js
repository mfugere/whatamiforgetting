Template.currentMemory.helpers({
    memory: function() {
        var data = Session.get("memory");
        var read = Session.get("read");
        if (data) {
            // Update the "read" Array.
            if (read.indexOf(data._id) === -1) {
                read.push(data._id);
                Session.set("read", read);
            }
            // Clear out the "read" Array if everything has been read.
            if (read && read.length >= Memories.find().count()) {
                Session.set("read", []);
                Session.set("no-unread", true);
                Meteor.setTimeout(function() { Session.set("no-unread", false); }, 5000);
            }
        }
        return data;
    },
    noUnread: function() {
        return Session.get("no-unread"); // TODO: make this more generic and send a variable in Session.set().
    }
});

Template.currentMemory.events({
    "click .boost": function() {
        Meteor.call("upvoteMemory", Session.get("memory")._id, function(error) {
            if (error) {
                console.log(error);
            }
        });
        Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") }}));
    },
    "click .next": function() {
        Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") }}));
    },
    "click .flag": function() {
        Meteor.call("flagMemory", Session.get("memory")._id, function(error) {
            if (error) {
                console.log(error);
            }
        });
        Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") }}));
    }
});