if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("read", []);
        Session.set("error", new Meteor.Error("none", ""));
        Session.set("message", { message: "none", level: "" });
        Tracker.autorun(function () {
            if (Session.get("error").error !== "none") {
                Meteor.setTimeout(function () {
                    Session.set("error", new Meteor.Error("none", ""));
                }, 5000);
            }
            if (Session.get("message").message !== "none") {
                Meteor.setTimeout(function () {
                    Session.set("message", { message: "none", level: "" });
                }, 5000);
            }
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}