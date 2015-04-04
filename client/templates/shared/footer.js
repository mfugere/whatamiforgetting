Template.footer.events({
    "click .usage": function() {
        var usage = "<ul>" +
            "<li>Current memories may be upvoted, skipped, or flagged for administrative review. " +
            "Use the buttons/links to perform these actions.</li>" +
            "<li>New memories may be submitted, but please look through the existing collection of " +
            "memories before adding one. This will help to prevent duplicates.</li>" +
            "<li>The most helpful memories are not too specific or too general.</li>" +
            "<li>Word your memory as a command, as though you're writing a to-do list " +
            "(e.g. \"Pick up Bart\", not \"To pick up Bart\"/\"I need to pick up Bart\"/etc.).</li>" +
            "<li>Please refrain from using obscene/offensive language when submitting a memory. " +
            "We would like to maintain a safe-for-work environment.</li>" +
            "</ul>";
        bootbox.dialog({
            title: "Site Usage",
            message: usage,
            buttons: {
                main: {
                    label: "Close",
                    className: "btn-danger"
                }
            }
        });
    }
});