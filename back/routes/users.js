//for API endpoint routes so server can do CRUD ops
const router = require("express").Router();
let User = require("../models/user.model");

//for get requests
router.route("/").get((req, res) => { //if /users/
    User.find() //mongoose method
    .then(users => res.json(users)) //if resolve, get users and return users in json format
    .catch(err => res.status(400).json("Error: " + err));
});

//for post requests
router.route("/add").post((req, res) => {
    const username = req.body.username; //value of "username" key from input json
    const newUser = new User({username}); //create new user

    newUser.save() //save new user to database
    .then(() => res.json("user added!"))
    .catch(err => res.status(400).json("Error" + err));
});

module.exports = router; //export router