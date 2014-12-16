if (Meteor.isClient) {
    Meteor.startup(function() {
        Session.set("read", []);
    });
    Meteor.subscribe("memories");
    Meteor.call("randomMemory", Session.get("read"), function (error, response) {
        if (error) {
            console.log(error);
        } else {
            Session.set("memory", response);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}