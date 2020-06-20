const { authJwt } = require("../middleware");
const tutorials = require("../controllers/tutorial.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Tutorial
    app.post("/api/tutorials",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        tutorials.create);

    // Retrieve all Tutorials
    app.get("/api/tutorials",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        tutorials.findAll);

    // Retrieve all published Tutorials
    app.get("/api/tutorials/published",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    app.get("/api/tutorials/:id",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        tutorials.findOne);

    // Update a Tutorial with id 
    app.put("/api/tutorials/:id",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        tutorials.update);

    // Delete a Tutorial with id
    app.delete("/api/tutorials/:id",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        tutorials.delete);

    // Create a new Tutorial
    app.delete("/api/tutorials/",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        tutorials.deleteAll);
};