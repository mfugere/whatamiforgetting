Template.registerHelper("message", function () {
    var msgRef = Session.get("message");
    return {
        show: msgRef.message !== "none",
        level: "alert-" + msgRef.level,
        description: msgRef.message
    };
});