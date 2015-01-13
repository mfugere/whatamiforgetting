Template.adminView.helpers({
    memories: function() {
        return Memories.find().fetch();
    },
    isAdmin: function() {
        return Meteor.user() && Meteor.user().username === "admin";
    },
    showReset: function() {
        return Meteor.user().profile.logins === 1 || Session.get("showReset");
    }
});

Template.adminView.events({
    "submit .admin_login": function(event) {
        event.preventDefault();
        Meteor.loginWithPassword(event.target.user.value, event.target.password.value, function(error) {
            if (error) {
                Session.set("error", error);
            } else {
                Meteor.call("incLogins", Meteor.user()._id, function(error) {
                    if (error) {
                        Session.set("error", error);
                    }
                });
                Session.set("message", { message: "Welcome home, son!", level: "success" });
            }
        });
    },
    "submit .password_reset": function(event) {
        event.preventDefault();
        Accounts.changePassword(event.target.old_password.value, event.target.new_password.value, function(error) {
            if (error) {
                Session.set("error", error);
            } else {
                Session.set("message", { message: "Password changed successfully. Please log in again.", level: "success" });
                Meteor.logout();
            }
        });
    },
    "click .show_reset": function() {
        Session.set("showReset", true);
    }
});