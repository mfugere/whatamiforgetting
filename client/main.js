if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("read", []);
        Session.set("filters", []);
        Session.set("error", new Meteor.Error(0, "none"));
        Session.set("message", { message: "none", level: "" });
        Session.set("shuffle", false);
        Tracker.autorun(function () {
            if (Session.get("error").error !== "none") {
                Meteor.setTimeout(function () {
                    Session.set("error", new Meteor.Error(0, "none"));
                }, 5000);
            }
            if (Session.get("message").message !== "none") {
                Meteor.setTimeout(function () {
                    Session.set("message", { message: "none", level: "" });
                }, 5000);
            }
            if (Session.get("filters").length === 0 && Memories.find().count() > Session.get("limit")) {
                Session.set("limit", Memories.find().count());
            }
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        Accounts.config({ forbidClientAccountCreation: true });
    });
}