if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("read", []);
        Session.set("error", new Meteor.Error("none", ""));
        Tracker.autorun(function () {
            if (Session.get("error").error !== "none") {
                Meteor.setTimeout(function () {
                    Session.set("error", new Meteor.Error("none", ""));
                }, 5000);
            }
        });

        Template.registerHelper("error", function () {
            var errorRef = Session.get("error");
            var errorMetadata = errorRef.error.split("-");
            return {
                show: errorRef.error !== "none",
                level: "alert-" + errorMetadata[0],
                name: errorRef.error,
                description: errorRef.reason
            };
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}