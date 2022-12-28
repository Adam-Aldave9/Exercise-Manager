//for API endpoint routes so server can do CRUD ops
const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//for get reqs
router.route("/").get((req, res) => { //call by /exercises/
    Exercise.find() //mongoose method
    .then(exercises => res.json(exercises)) //if resolve, get exercises and return exercises in json format
    .catch(err => res.status(400).json("Error: " + err));
});

//for post requests
router.route("/add").post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save() //save new Exercise to database
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error" + err));
});

//get specific exercise by id
router.route("/:id").get((req, res) => { //callby /exercises/{object id}
    Exercise.findById(req.params.id) //mongoose method
    .then(exercise => res.json(exercise)) //if resolve, get exercise and return exercise in json format
    .catch(err => res.status(400).json("Error: " + err));
});

//delete by specific exercise id
router.route("/:id").delete((req, res) => { //call by /exercises/{object id from database}
    Exercise.findByIdAndDelete(req.params.id) //mongoose method
    .then(() => res.json("Exercise Deleted")) //if resolve, exercise deleted
    .catch(err => res.status(400).json("Error: " + err));
});

//update  by exercise id
router.route("/update/:id").post((req, res) => { //call by /exercises/update/{object id from database}
    Exercise.findById(req.params.id) //mongoose method
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }) 
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;