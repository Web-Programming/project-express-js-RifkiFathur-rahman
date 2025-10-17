const mongoose = require("mongoose");
//buat skema 
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: [true, "isi username dengan benar!!!"],
        unique: true,
        trim: true,
    },

    email: {
        type : String,
        required : true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "harap isi alamat email yang valid",
        ],
    },

    password: {
        type : String,
        required: true,
        minlength : [6, "password minimal 6 karakter" ],
        select: false,
    },

    addres: {
        type: String,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    createAt: {
        type: Date,
        default: Date.now
    }
});

//Buat model dari Schema
const Product = mongoose.model('User', userSchema);

module.exports = Product;