Template.currentMemory.helpers({
    memory: function() {
        var data = Session.get("memory");
        var read = Session.get("read");
        if (data && read.indexOf(data._id) === -1) {
            read.push(data._id);
            Session.set("read", read);
        }
        return data;
    }
});

Template.currentMemory.events({
    "click .boost": function() {
        Memories.update(this._id, { $inc: { upvotes: 1 }});
        Meteor.call("randomMemory", Session.get("read"), function(error, response) {
            if (error) {
                console.error(error);
            } else {
                Session.set("memory", response);
            }
        });
    },
    "click .next": function() {
        Meteor.call("randomMemory", Session.get("read"), function(error, response) {
            if (error) {
                console.error(error);
            } else {
                Session.set("memory", response);
            }
        });
    },
    "click .flag": function() {
        Memories.update(this._id, { $set: { flagged: true }});
        Meteor.call("randomMemory", Session.get("read"), function(error, response) {
            if (error) {
                console.error(error);
            } else {
                Session.set("memory", response);
            }
        });
    }
});