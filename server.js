const express = require("express"); 
const app = express(); // express instance has been created and will be access by app variable
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const path = require('path');

//Mongo DB
const connectdb = require('./server/database/connection');
connectdb();

//set view engine
app.set("view engine", "ejs");
const connection = require("./config/db");

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//load route
app.use('/',require('./server/routes/router'))

/*
//Create books
app.post("/create", async (req,res)=>{
  const book = new booksDB({
    name:req.body.name,
    author:req.body.author
  });

  try {
    const savedBooks = await book.save();
    res.redirect("/data", {books:savedBooks});
    console.log(savedBooks);
  } catch (error) {
    res.status(400).send(error);
  }
})

//Get all books
app.get('/data', (req, res) => {
  //RETRIEVING ALL BOOKS
  books.find().exec((err,data)=>{
    if (err) {
      res.json({message: err.message});
    } else {
      res.render("read.ejs", {books:data});
    }
  });
  
});
*/



app.listen(process.env.PORT, function (err) {
  if (err) console.log(err);
  console.log(`listening to port ${process.env.PORT}`);
});