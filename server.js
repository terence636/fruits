require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const fruits = require("./models/fruits.js");
const Fruit = require("./models/mfruits");
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));


// CONFIG - MONGODB
mongoose.connect("mongodb://localhost:27017/basiccrud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.get("/fruits/seed", (req, res) => {
  Fruit.create(
    [
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ],
    (err, data) => {
      res.redirect("/fruits");
    }
  );
});

app.get("/", (req, res) => {
  console.log("Hi");
  res.send("Fruits Express");
});

// put this above your show.ejs file
// or else show page will be called
app.get("/fruits/new", (req, res) => {
  res.render("new.ejs", {});
});

app.get("/fruits/:index", (req, res) => {
  Fruit.findById(req.params.index,(error,fruit)=>{
    res.render("show.ejs", {
      fruit: fruit,
      pos: req.params.index,
    });
  })

});

app.get("/fruits/:index/edit",(req,res)=>{
  Fruit.findById(req.params.index,(error,fruit)=>{
      // res.send("editing")
    res.render("edit.ejs",{
      fruit: fruit, //fruits[req.params.id],
      pos: req.params.index,
  })
  })
})

app.get("/fruits/", (req, res) => {
  Fruit.find({},(error, fruits)=>{
    res.render("index.ejs", {
      allFruits: fruits,
    })
  });
});

app.put("/fruits/:id", (req, res) => {
  // res.send("PUT")
  // :index is the index of our fruits array that we want to change
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  const fruit = { ...req.body, readyToEat: req.body.readyToEat}
  console.log(fruit)
  Fruit.findByIdAndUpdate({id:req.params.id},{fruit:fruit},{new:true},(error,fruit)=>{
    // fruits[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
    res.redirect("/fruits");
  })
  //redirect to the index page
});

app.delete('/fruits/:index', (req, res) => {
  Fruit.findByIdAndRemove(req.params.index,()=>{
    // fruits.splice(req.params.index, 1); //remove the item from the array
    res.redirect('/fruits');  
  })
  //redirect back to index route
 });

app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Fruit.create(req.body,(error,cretedFruit)=>{
    res.redirect("/fruits");
  })
  // fruits.push(req.body);
  // res.send(req.body);
  // res.send(fruits)
  // res.redirect("/fruits");
});

app.listen(3001, () => {
  console.log("Server listening at", 3000);
}); // port listen too
