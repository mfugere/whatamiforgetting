if (Meteor.isClient) {
    Meteor.startup(function() {
        Session.set("read", []);
    });
    Meteor.call("randomMemory", Session.get("read"), function (error, response) {
        if (error) {
            console.error(error); // TODO: replace with "errorMessage" Session variable so it can be displayed.
        } else {
            Session.set("memory", response);
            Session.get("no-unread", false);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}