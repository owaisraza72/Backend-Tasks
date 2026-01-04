// const { first, a, b } = require("./count");

// let calculate = require("./calculate");

// // console.log(a + b);

// let a = 5;
//     let b = 8;
// console.log(calculate.add)
// console.log(calculate.add(a,b));

// function second() {
//   return console.log("frontend code");
// }

// console.log(multiply())
// console.log(divide())
// second();
// first();

// (
//     function(){
//         console.log("This is IIFF functions");

//     }
// )()

// this is IIFE functions or backend mein jb bhi hum kio module / file create krte h to wo default IIFE hota h
//  or IIFE mein parameter pass hota h jo module or require hota h jo hum apni module mein require or module.exports krte hen


const express = require("express");
const data = require("./data.json");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  // res.send("Server is running at 3000 port ");

  res.send(data);
});

app.listen(8000, () => {
  console.log("CORRECTLY API CREATED RUN");
});
