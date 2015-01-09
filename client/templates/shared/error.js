Template.registerHelper("error", function () {
    var errorRef = Session.get("error");
    var level;
    switch(errorRef.error) {
        case (400):
            level = "alert-warning";
            break;
        case (500):
            level = "alert-danger";
            break;
        default:
            level= "alert-info";
            break;
    }
    return {
        show: errorRef.error !== "none",
        level: level,
        name: errorRef.error,
        description: errorRef.reason
    };
});