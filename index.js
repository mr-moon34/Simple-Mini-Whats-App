const express = require ("express");
const app = express();
const mongoose = require('mongoose');
const path = require ("Path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const Chat = require("./models/chat.js");

//Views Folder
app.set("view engine" , "ejs" );
app.set("views" , path.join(__dirname , "views"));

//Url encoded Data or json Data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//public folder
app.use(express.static(path.join(__dirname , "public")));

//Rest Full Api Protocol Put Delete
app.use(methodOverride("_method"));


//Mongoose Connection
main()
    .then( () => {
        console.log("Connection Successfull");
    })
    .catch((err) => console.log( "Database connection error:", err));

    async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//index Route
app.get("/chats" , async (req , res) => {
    const chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs" , {chats});
});

//New Route
app.get("/chats/new" , (req , res) => {
    res.render("new.ejs");
});

//Create Route
app.post("/chats" , (req , res) => {
    let {from , to , msg} = req.body;
    let id = uuidv4();
    let newChat = new Chat({
        id : id ,
        from:from ,
        to:to ,
        msg:msg , 
        created_at : new Date(),
});
newChat.save().then((res) => {
    console.log("chat was saved");
})
.catch((err) => {console.log(err);});
res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit" , async (req , res) => {
    let id = req.params.id;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" , {chat});
});

//Update Route
app.put("/chats/:id" , async (req , res) => {
    let id = req.params.id;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id , {msg : newMsg} , {runValidators:true}, {new : true});
    console.log(updatedChat);
    res.redirect("/chats");
});

//Delete Route
app.delete("/chats/:id" , async (req , res) => {
    let id = req.params.id;  //.id Compulsory
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
});

//Check Server
app.get("/" , (req , res) => {
    res.send("Root is working");
});

//Port 9090
const port = 9090;
app.listen( port, () => {
    console.log(`listing port on ${port}`);
});



