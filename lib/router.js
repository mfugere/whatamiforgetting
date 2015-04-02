Router.configure({
    layoutTemplate: "layout"
});

Router.route("/",
    {
        name: "userView",
        subscriptions: function () {
            this.subscribe("memoriesBy", "added", function () {
                var tags = [];
                Memories.find({}, { fields: { tags: 1 }}).forEach(function(memory) {
                    for (var i in memory.tags) {
                        if (this.indexOf(memory.tags[i]) === -1) {
                            this.push(memory.tags[i]);
                        }
                    }
                }, tags);
                Session.set("tags", tags);
                if (Session.get("filters").length === 0) {
                    Session.set("memory", Memories.findOne());
                    Session.set("limit", Memories.find().count());
                } else {
                    Session.set("memory", Memories.findOne({ tags: { $in: Session.get("filters") }}));
                    Session.set("limit", Memories.find({ tags: { $in: filters }}).count());
                }
            });
        }
    });
Router.route("/admin",
    {
        name: "adminView",
        subscriptions: function() {
            this.subscribe("flagged");
        }
    });