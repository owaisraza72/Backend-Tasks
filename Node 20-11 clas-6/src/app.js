const express = require("express");
const app = express();
const {
  AdminAuthMiddleware,
  UserAuthMiddleware,
} = require("./middleware/middlleware");

// app.get("/", (req, res, next) => {
//   console.log("Hello from middleware 1");
//   next();
// });
// app.get("/", (req, res) => {
//   res.send("Hello from middleware 2");
// });



// app.use('/user', 

// (req,res, next)=>{
//     console.log("This is User route ");
//     next()

//     console.log("START RESPONSE  !");

//     // res.send('User Route');
// },
// (req, res, next)=>{
//     console.log('This is User route 1');
//     next()
//     res.send('Response from User Route 1');
// },
// (req, res, next)=>{
//     console.log('This is User route 2');
//     next()
// }
// )


app.use("/user", UserAuthMiddleware);
app.use("/admin", AdminAuthMiddleware);
// ================================Admin Routes=================================
// ======================AllData=============================
app.use("/admin/getAllData", (req, res) => {
  res.send("Get all data route");
});
// ======================deleteAllData ========================

app.use("/admin/deleteAllData", (req, res) => {
  res.send("Delete all data route he");
});
// =====================updateData =============================
app.use("/admin/updateData", (req, res) => {
  res.send("update data route");
});

// ================================User Routes=================================
app.use("/user/Profile", (req, res) => {
  res.send("Get profile route");
});

app.use("/getProducts", UserAuthMiddleware, (req, res) => {
  res.send("Get products route");
});


app.use('/buyProduct', UserAuthMiddleware, (req, res)=>{
    res.send('Buy Product Route');
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
