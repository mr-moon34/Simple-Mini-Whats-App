const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const { v4: uuidv4 } = require('uuid');

// Mongoose Connection
main()
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => console.log("Database connection error:", err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        id: uuidv4(),
        from: "moon",
        to: "hamza",
        msg: "Hello How are You?",
        created_at: new Date(),
    },
    {
        id: uuidv4(),
        from: "ali",
        to: "ayesha",
        msg: "Dhoky baz?",
        created_at: new Date(),
    },
    {
        id: uuidv4(),
        from: "musheer",
        to: "moon",
        msg: "moon bike kab dy rahy ho ",
        created_at: new Date(),
    },
    {
        id: uuidv4(),
        from: "ahad",
        to: "sheeraz",
        msg: "Kahan ho ?",
        created_at: new Date(),
    },
    {
        id: uuidv4(),
        from: "sir",
        to: "huzaifa",
        msg: "kab dy rahay ho treat?",
        created_at: new Date(),
    }
];

// Insert Data
Chat.insertMany(allChats)
    .then(() => {
        console.log("Data inserted successfully");
       
    })
    .catch((err) => {
        console.error("Error inserting data:", err.message); // Log error message
        console.error("Error details:", err); // Full error details
        
    });
