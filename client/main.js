if (Meteor.isClient) {
    Meteor.startup(function() {
        Session.set("read", []);
        Session.set("no-unread", false);
    });
    Meteor.subscribe("memories", function() {
        Session.set("memory", Memories.findOne());
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}