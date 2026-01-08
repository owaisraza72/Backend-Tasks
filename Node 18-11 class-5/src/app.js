const express = require("express");
const app = express();

const products = [];

// app.get("/", (req, res) => {
//   res.send("Hello from Express");
// });
// app.get("/products", (req, res) => {
//   res.send(products);
// });

// app.post("/products", (req, res) => {
//   const data = req.body;
//   products.push(data);

//   res.send({ message: "Product added  successfully", products: data });
// });

// app.use("/", (req, res) => {
//   res.send("this is home router");
// });

// app.use("/user", (req, res) => {
//   if (req.method === "GET") {
//     res.send("this is get router");
//   } else if (req.method === "POST") {
//     res.send("this is post router");
//   } else if (req.method === "PUT") {
//     res.send("this is put router");
//   } else if (req.method === "DELETE") {
//     res.send("this is delete router");
//   } else if (req.method === "PATCH") {
//     res.send("this is patch router");
//   }
// });

// app.use("/hello", (req, res) => {
//   res.send("hello world");
// });

// app.use("/hello/123", (req, res) => {
//   res.send("hello world 123");
// });

// app.use("hello/245", (req, res) => {
//   res.send("hello world 245");
// });

// ===========================================================================================================
//client or server k b/w 1 connection banta h jo TCP connection hota h
// client k saath jesa response milta h to tcp connection close ho jata h
// same rout se jesa request aata h to new tcp connection banta h or servrer res deta h to tcp connection close ho jata h

// web socket k case me ek hi connection banta h client or server k b/w or wo connection tab tak rehta h jb tak client or server dono chahte h

// app.use('/products',(req,res, next)=>{
//   console.log('this is 1 products router');
//   res.send('this is 1 products router');
//   next(); // next hum router handler ko call krne k liye use krte h
// }
// ,(req,res, next)=>{
//   console.log('this is 2 products router');
//   res.send('this is 2 products router');
//   next();
// },(req,res, next)=>{
//   console.log('this is 3 products router');
//   res.send('this is 3 products router');
// });

// ===========================================================================================================
const token = 123;

app.use("/products", (req, res, next) => {
  const isAuthorized = token === 123;
  if (!isAuthorized) {
    res.status(403).send("you are not authorized");
  } else {
    console.log("you are authorized person");
    next();
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
