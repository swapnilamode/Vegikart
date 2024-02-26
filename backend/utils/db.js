const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://onkar:Honor10%40lite@vegikart.9wp3aqh.mongodb.net/VegikartDB")
        .then(console.log("MongoDB Connected"))
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB
