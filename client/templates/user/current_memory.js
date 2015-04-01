Template.currentMemory.helpers({
    memory: function () {
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
                Session.set("message", {
                    message: "I don't have anymore memories for you! Keep browsing if you'd like to review everything.",
                    level: "info"
                });
            }
        }
        return data;
    }
});

Template.currentMemory.events({
    "click .boost": function () {
        Meteor.call("upvoteMemory", Session.get("memory")._id, function (error) {
            if (error) {
                console.error(error);
                Session.set("error", error);
            }
        });
        Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") }}));
    },
    "click .next": function () {
        if (Session.get("shuffle")) {
            var r = Math.floor(Math.random() * (Memories.find().count() - Session.get("read").length));
            Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") }}, { skip: r, limit: 1 }));
        } else {
            Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") }}));
        }
    },
    "click .flag": function () {
        Meteor.call("flagMemory", Session.get("memory")._id, function (error) {
            if (error) {
                console.error(error);
                Session.set("error", error);
            } else {
                Session.set("message", { message: "Thank you, this message has been flagged for review.", level: "success" });
            }
        });
        Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") }}));
    },
    "change input[name='orders']": function(event) {
        Session.set("read", []);
        Session.set("shuffle", false);
        Meteor.subscribe("memoriesBy" + event.target.value, function () {
            Session.set("memory", Memories.findOne());
        });
    },
    "click .shuffle": function() {
        Session.set("read", []);
        Session.set("shuffle", true);
        var r = Math.floor(Math.random() * Memories.find().count());
        Session.set("memory", Memories.findOne({}, { skip: r, limit: 1 }));
    }
});