Template.currentMemory.helpers({
    memory: function() {
        var data = Session.get("memory");
        var read = Session.get("read");
        // Update the "read" Array.
        if (data && read.indexOf(data._id) === -1) {
            read.push(data._id);
            Session.set("read", read);
        }
        return data;
    },
    noUnread: function() {
        return Session.get("no-unread");
    }
});

Template.currentMemory.events({
    "click .boost": function() {
        Memories.update(Session.get("memory")._id, { $inc: { upvotes: 1 }});
        Meteor.call("randomMemory", Session.get("read"), function(error, response) {
            if (error) {
                if (error.error === "no-unread") {
                    Session.set("read", []);
                    Session.set("no-unread", true);
                    Meteor.setTimeout(function() { Session.set("no-unread", false); }, 5000);
                } else {
                    console.error(error);
                }
            } else {
                Session.set("memory", response);
            }
        });
    },
    "click .next": function() {
        Meteor.call("randomMemory", Session.get("read"), function(error, response) {
            if (error) {
                if (error.error === "no-unread") {
                    Session.set("read", []);
                    Session.set("no-unread", true);
                    Meteor.setTimeout(function() { Session.set("no-unread", false); }, 5000);
                } else {
                    console.error(error);
                }
            } else {
                Session.set("memory", response);
            }
        });
    },
    "click .flag": function() {
        Memories.update(Session.get("memory")._id, { $set: { flagged: true }});
        Meteor.call("randomMemory", Session.get("read"), function(error, response) {
            if (error) {
                if (error.error === "no-unread") {
                    Session.set("read", []);
                    Session.set("no-unread", true);
                    Meteor.setTimeout(function() { Session.set("no-unread", false); }, 5000);
                } else {
                    console.error(error);
                }
            } else {
                Session.set("memory", response);
            }
        });
    }
});