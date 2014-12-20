Template.adminView.helpers({
    memories: function() {
        return Memories.find().fetch();
    }
});