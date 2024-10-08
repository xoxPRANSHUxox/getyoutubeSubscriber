const express = require('express');  //importing express
const mongoose = require('mongoose');  //importing mongoose here
const User = require('./models/userModel')  //providing schema here. 
const data = require('./data')


const app = require('./app'); // Importing routes from app.js

const port = 3000;   //defining a port

// database url is mentioned below which is necessary to connect mongo db database for queries
const DATABASE_URL = "mongodb://PranshuKumar:Pranshu2002@getyoutubesubscriber-shard-00-00.hoh74.mongodb.net:27017,getyoutubesubscriber-shard-00-01.hoh74.mongodb.net:27017,getyoutubesubscriber-shard-00-02.hoh74.mongodb.net:27017/?ssl=true&replicaSet=atlas-fc8vx6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=getyoutubesubscriber";

// setup connection with mongodb database
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

const db = mongoose.connection;
db.on("error", (err) => console.log(err)); // Handling database connection errors
db.once("open", () => console.log("connected to database")); // Logging successful database connection


async function createDatabase() {
    try {
        // Clear the User collection
        await User.deleteMany({});
        console.log("Existing users deleted.");

        // Insert new data
        await User.insertMany(data);
        console.log("New data inserted successfully.");
    } catch (err) {
        console.error("Error during database creation:", err);
    } 
}

// Automatically create the database when the app starts
createDatabase().catch(err => console.log("Failed to create database:", err));