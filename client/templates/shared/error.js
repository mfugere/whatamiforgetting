Template.registerHelper("error", function () {
    var errorRef = Session.get("error");
    var level;
    switch(errorRef.error) {
        case 400:
        case 403:
            level = "alert-warning";
            break;
        case 500:
            level = "alert-danger";
            break;
        default:
            level= "alert-info";
            break;
    }
    return {
        show: errorRef.reason !== "none",
        level: level,
        code: errorRef.error,
        description: errorRef.reason
    };
});