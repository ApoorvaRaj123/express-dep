// Create a node project by npm init inside this folder "02_express".
//  After doing all the steps, go to package.json and give type as "module" to use modern JS. so, instead of 
// const express = require('express'); I can write import express from "express";
// Next step is to install express bu npm i express


import express from "express";
// import { request } from "http";

const app = express(); // now app is an object with all the powers of express


const port = 3000;

// app.get('/', (req, res) => {
//     res.send("Hello from me")
// }) 


// app.get('/twitter', (req, res) => {
//     res.send("Hello from me on Twitter or X.")
// }) 


// app.get('/vehicle', (req, res) => {
//     res.send("Hello from my Lamborgini")
// }) 



 // I want my app to respond to a GET request. what is this get request? 

// The get request is for extracting all the coming data from the request of the user, and I can respod to the user by using the "res"
// Every change I make, my server is not aware of it and I will have to restart it everytime. Although I can use "nodemon" for that.




// Now, to run this I can simply type "nom start". But I have to restart the server each time I make any changes or update something.
// For that I can download nodemon through npm. As I saw in package.json that any npm download gets shown in dependencies section, but I want to download
// the nodemon in another way called "developer dependencies". 
// Developer dependencies are not sent to my server, to the production. They are useful for developmemnt process, they might be little heavy, but it's okay
// as it's only gonna be upto development time period

// -----> npm i -D nodemon    (-D is for developer dependencies)

// Now , I will fire my Postman application and check all the routes that I made here in JS inside the postman environment as it is the professional way.



// ------------------- So far I have only sent the data back from server--------------------------------
// Now, I will accept the from the frontend side as well
// There are many ways to do this. THe most common is to use a setting of "app" middlewares("use"). I will use the most basic one called "express.json"
// This means that data that comes in the JSON format from frontend will be accepted. 
// There are settings for taking data in the "form" by using URL encoded forms and some more.


// I want to an application that stores my data in an array.
// I need to be able to create different routes, so that I can add it to the teaData array, I can see how many Tea's are there in my array,
// I should be ablt to update it and I should be able to delete it.

// This will be a CRUD application that I will be building right here, as well as will be testing it as well.

// Network, whenever I take any data, the chances are that I will be using the "POST" route majority of the time. It's not always compulsory, but
// majority of the time when I want to save the data in the database or something, POST is better. I can take the data in get as well, but it's
// not the standard.

app.use(express.json());

let teaData = [];
let nextid = 1;


//add a new Tea
app.post("/teas", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const newTea = {id: nextid++, name, price};
    teaData.push(newTea);
    res.status(201).send(newTea);
})

// get all teas
app.get("/teas", (req, res) => {
    res.status(200).send(teaData); 
})


// get tea by id
app.get("/teas/:id", (req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    
    if(!tea) return res.status(404).send("Tea not found");

    res.status(200).send(tea);
});


// update Tea  -----> for updation of any data app.put() is generally gets used.

app.put("/teas/:id", (req, res) => {
    
    // const teaId = req.params.id;
    const tea = teaData.find(t => t.id === parseInt(req.params.id));

    if(!tea) return res.status(404).send("Tea not found");

    const { name , price } = req.body;

    tea.name = name;
    tea.price = price;
});


//delete tea 


app.delete("/teas/:id", (req, res) => {
    const index = teaData.findIndex(tea => tea.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("Tea not found");
    teaData.splice(index, 1);
    return res.status(204).send("deleted");
})


// Now, I have build a full fledged CRUD application. Now it's time for testing in a professional way.

// The way to do it is : start with a "blank collection" and name it "tea app".
// Inside each tea app I added a request. I got a "GET" request and I named it "add a tea" (based on the comments on the code snippets I wrote).


app.listen(port, () => {
    console.log("Express server listening on port " + port);
})