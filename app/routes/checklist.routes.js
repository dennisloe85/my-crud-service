const checklist = require("../controllers/checklist.controller");

module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    // });

    // Create a new list
    app.post("/api/checklists/list",
        checklist.createList);

    // Create a new entry
    app.post("/api/checklists/entry",
        checklist.createEntry);

    // Retrieve all lists including entries
    app.get("/api/checklists/",
        checklist.findAll);

    // Retrieve a single List with id
    app.get("/api/checklists/list/:id",
        checklist.findListById);

    // Retrieve a single entry with id
    app.get("/api/checklists/entry/:id",
        checklist.findEntryById);
};