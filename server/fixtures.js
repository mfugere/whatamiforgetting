if (Memories.find().count() === 0) {
    Memories.insert({
        text: "Pick up something at the supermarket",
        added: "20141208",
        upvotes: 3,
        flagged: false
    });
    Memories.insert({
        text: "Read framework documentation",
        added: "20141209",
        upvotes: 0,
        flagged: false
    });
    Memories.insert({
        text: "Take my vitamins",
        added: "20141205",
        upvotes: 1,
        flagged: false
    });
    Memories.insert({
        text: "Have sex with your mom",
        added: "20141203",
        upvotes: 0,
        flagged: true
    });
}