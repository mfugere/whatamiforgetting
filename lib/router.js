Router.configure({
    layoutTemplate: "layout"
});

Router.route("/",
    {
        name: "userView",
        subscriptions: function () {
            this.subscribe("memoriesByDate", function () {
                Session.set("memory", Memories.findOne());
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