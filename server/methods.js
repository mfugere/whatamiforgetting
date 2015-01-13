Meteor.methods({
    addMemory: function (text) {
        if (Memories.findOne({ text: text })) {
            throw new Meteor.Error(400, "A memory already exists with this exact text!");
        } else {
            Memories.insert({
                text: text,
                added: new Date().toDateString(),
                upvotes: 0,
                flagged: false
            }, function (error, id) {
                if (error) {
                    throw error;
                } else {
                    return id;
                }
            });
        }
    },
    upvoteMemory: function (id) {
        Memories.update(id, { $inc: { upvotes: 1 }}, {}, function (error, affected) {
            if (error) {
                throw error;
            } else {
                return affected;
            }
        });
    },
    flagMemory: function (id) {
        Memories.update(id, { $set: { flagged: true }}, {}, function (error, affected) {
            if (error) {
                throw error;
            } else {
                return affected;
            }
        });
    },
    unflagMemory: function (id) {
        Memories.update(id, { $set: { flagged: false }}, {}, function (error, affected) {
            if (error) {
                throw error;
            } else {
                return affected;
            }
        });
    },
    deleteMemory: function (id) {
        Memories.remove(id, function (error) {
            if (error) {
                throw error;
            } else {
                return 0;
            }
        });
    },
    incLogins: function (id) {
        Meteor.users.update(id, { $inc: { "profile.logins": 1 }}, {}, function (error, affected) {
            if (error) {
                throw error;
            } else {
                return affected;
            }
        });
    }
});