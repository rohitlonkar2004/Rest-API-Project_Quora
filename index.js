
const express = require("express");

let app = express();

// port 
let port = 8080;


// method over-ride require 


let  methodOverride = require('method-override');
app.use(methodOverride('_method'));


// uuid pacakge   for creating the unique id 


const{v4:uuidv4} = require("uuid");





// for database languange know 

app.use( express.urlencoded( { extended : true}));



// path  views file ke liye 

const path = require("path");

app.set("view engine" ,"ejs" );

app.set("views", path.join(__dirname , "views"));





// path public file ke liye 


app.use( express.static( path.join(__dirname , "public")) );




// create the array for info 


let arr = [ 
    { 
     
    id : uuidv4(),
    username: "TechWiz_99",
    content: "What is the best programming language to learn in 2024?"
   },
   { 
    id : uuidv4(),
    username: "ChefInTraining",
    content: "How do I save a salty cake batter?"
   },
   { 
    id : uuidv4(),
    username: "VibeCoder",
    content: "Mockups are easy; scaling is the hard part!"
   },
];





// First API 

app.get("/posts", (req,res) => {
    //  res.send("hii , it start");

    res.render("index.ejs" , {posts:arr});
});



// Second API 

app.get("/posts/new", (req,res) => {

    res.render("view.ejs");
});


// Second API add to new post 

app.post("/posts" , (req,res) => {
   // console.log( req.body );

    // new id for new post 

    let id = uuidv4();
     
   // push the new add content in Array  
   let {  username , content} = req.body;

   arr.push({id, username,content});


   //redirect  connect the multiple pages 

     res.redirect("/posts");
});





// id creation for unquie 

app.get("/posts/:id" , (req,res) => {
     let {id} = req.params;
     let post = arr.find((p) => id === p.id);
     res.render("show.ejs", {post});
});



// patch  

app.patch( "/posts/:id" , (req,res) => {
     let {id} = req.params;
     let newContent  = req.body.content;
     let post = arr.find((p) => id === p.id);
     post.content = newContent;
     res.redirect("/posts");
});


app.get("/posts/:id/edit" , (req,res) => {

    let {id} = req.params;
    let post = arr.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})




// delete

app.delete("/posts/:id" ,(req,res) => {
    let {id} = req.params;
    arr  = arr.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen( port , (req , res) => {
     console.log( "request");
});

