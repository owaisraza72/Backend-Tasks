//  Asynchonous IO
// node js non blocking IO hay bydefault handle multi req
// v8 k ander bht saray therad hain js srif single thread ko use krti hay or baki language multi therad use krti hain thread means v8 k ander ek container hy jaha js ka code run ho rha hy
// callstack ek time per ek hi stack ko handle karta
// node js using libUV thats why it is asynachorusn
// npm init
// npm init -y
// npm i express
// npm i -g nodemon
// "start": "nodemon theory.js"
// npm i lodash
// npm i moment
// npm i axios

const express = require("express");
const data = require("./data.json");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(data);
});

app.put("/random", (req,res) => {
  const body = req.body;
  data.push(body);
  res.send(data)
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
