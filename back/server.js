const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config(); // for env vars

//create express server
const app = express();
const port = process.env.PORT || 5000; //port for server

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", true);
mongoose.connect(uri);

const connect = mongoose.connection;
connect.once("open", () => {console.log("Successfully Established MongoDB connection")});

/******************** */
//For API routes
const workoutRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
app.use("/exercises", workoutRouter);
app.use("/users", usersRouter);
/*************************** */

app.listen(port, () =>{
    console.log(`running on port ${port}`);
})

