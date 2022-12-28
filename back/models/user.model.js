const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true, //will trim whitespace at end
        minlength: 3, //at leaest 3 chars
    },
}, {timestamps: true,} );

const user = mongoose.model("User", userSchema);

module.exports = user;