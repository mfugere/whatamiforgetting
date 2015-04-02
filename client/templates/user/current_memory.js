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
            if (read && read.length >= Session.get("limit")) {
                Session.set("read", []);
                Session.set("message", {
                    message: "I don't have anymore memories for you! Keep browsing if you'd like to review everything.",
                    level: "info"
                });
            }
        }
        return data;
    },
    tags: function() {
        return Session.get("tags");
    },
    filtered: function(tag) {
        return (Session.get("filters").indexOf(tag) === -1) ? "" : "filter-on";
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
        var options = {};
        if (Session.get("shuffle")) {
            var r = Math.floor(Math.random() * (Session.get("limit") - Session.get("read").length));
            var options = { skip: r, limit: 1 };
        }
        if (Session.get("filters").length !== 0) {
            Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") },
                tags: { $in: Session.get("filters") }}, options));
        } else {
            Session.set("memory", Memories.findOne({ _id: { $nin: Session.get("read") }}, options));
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
        Meteor.subscribe("memoriesBy", event.target.value, function () {
            if (Session.get("filters").length !== 0) {
                Session.set("memory", Memories.findOne({ tags: { $in: Session.get("filters") }}));
            } else {
                Session.set("memory", Memories.findOne());
            }
        });
    },
    "click .shuffle": function() {
        Session.set("read", []);
        Session.set("shuffle", true);
        var r = Math.floor(Math.random() * Session.get("limit"));
        if (Session.get("filters").length !== 0) {
            Session.set("memory", Memories.findOne({ tags: { $in: Session.get("filters") }}, { skip: r, limit: 1 }));
        } else {
            Session.set("memory", Memories.findOne({}, { skip: r, limit: 1 }));
        }
    },
    "click .remove-tag": function(event) {
        var tagName = event.target.previousElementSibling.textContent;
        var id = Session.get("memory")._id;
        Meteor.call("pullTag", id, tagName, function (error) {
            if (error) {
                console.error(error);
                Session.set("error", error);
            } else {
                if (Memories.find({ tags: tagName }).fetch().length === 0) {
                    var tags = Session.get("tags");
                    tags.splice(tags.indexOf(tagName), 1);
                    Session.set("tags", tags);
                    var filters = Session.get("filters");
                    filters.splice(filters.indexOf(tagName), 1);
                    if (filters.length === 0) Session.set("limit", Memories.find().count());
                    Session.set("filters", filters);
                }
                Session.set("memory", Memories.findOne({ _id: id }));
            }
        });
    },
    "submit .new-tag": function(event) {
        event.preventDefault();
        var tagName = event.target["tag"].value.trim().toLowerCase();
        var id = Session.get("memory")._id;
        Meteor.call("pushTag", id, tagName, function (error) {
            if (error) {
                console.error(error);
                Session.set("error", error);
            } else {
                event.target["tag"].value = "";
                var tags = Session.get("tags");
                if (tags.indexOf(tagName) === -1) {
                    tags.push(tagName);
                    Session.set("tags", tags);
                }
                Session.set("memory", Memories.findOne({ _id: id }));
            }
        });
    },
    "click .tag": function(event) {
        var e = event.target;
        if (!e.classList.contains("remove-tag")) {
            Session.set("read", []);
            var tagName = (e.classList.contains("tag")) ? e.firstElementChild.textContent : e.textContent;
            var filters = Session.get("filters");
            if (filters.indexOf(tagName) === -1) {
                filters.push(tagName);
            } else {
                filters.splice(filters.indexOf(tagName), 1);
            }
            if (filters.length === 0) {
                Session.set("limit", Memories.find().count());
            } else {
                Session.set("limit", Memories.find({ tags: { $in: filters }}).count());
            }
            Session.set("filters", filters);
        }
    }
});