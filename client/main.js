if (Meteor.isClient) {
    Meteor.subscribe("memories");
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
