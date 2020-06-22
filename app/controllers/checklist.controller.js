const db = require("../models");
const List = db.list;
const Entry = db.entry;


exports.createList = (req, res) => {
    // Validate request   
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a List
    const list = {
        name: req.body.name,
    };

    // Save Tutorial in the database
    List.create(list)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the list."
            });
        });
};

exports.createEntry = (req, res) => {

    // Validate request   
    if (!req.body.name
        || !req.body.listId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an Entry
    const entry = {
        name: req.body.name,
        checked: false,
        listId: req.body.listId,
    };

    // Save Entry in the database
    Entry.create(entry)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the list."
            });
        });
};

exports.findListById = (req, res) => {

    const id = req.params.id;

    List.findByPk(id, { include: ["entries"], })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving list with id=" + id
            });
        });
};

exports.findEntryById = (req, res) => {
    const id = req.params.id;

    Entry.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving list with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    List.findAll({
        include: ["entries"],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lists."
            });
        });
};