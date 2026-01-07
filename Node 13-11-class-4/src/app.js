const express = require("express");
const fs = require("fs");
const app = express();

let products = require("./data.json");

app.use(express.json());

// ======================================================== GET ============================================================
app.get("/", (req, res) => {
  res.json(products);
});

// ========================================================= ADD ===========================================================
app.post("/addProduct", (req, res) => {
  const data = req.body;
  products.push(data);

  fs.writeFileSync("./data.json", JSON.stringify(products, null, 2));

  res.send({
    message: "Product added successfully",
    products,
  });
});

// ========================================================= DELETE ===========================================================
app.delete("/deleteProduct", (req, res) => {
  const id = Number(req.body.id);
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Product not found" });
  }

  products.splice(index, 1);

  fs.writeFileSync("./data.json", JSON.stringify(products, null, 2));

  res.send({
    message: `Product with id ${id} deleted successfully`,
    products,
  });
});

// ========================================================= UPDATE ===========================================================
app.put("/updateProduct", (req, res) => {
  const id = Number(req.body.id);
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Product not found" });
  }

  products[index] = { ...products[index], ...req.body };

  fs.writeFileSync("./data.json", JSON.stringify(products, null, 2));

  res.send({
    message: `Product with id ${id} updated successfully`,
    products,
  });
});
// ======================================================== PATCH ===========================================================

app.patch("/patchProduct", (req, res) => {
  const id = Number(req.body.id);
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Product not found" });
  }

  products[index] = { ...products[index], ...req.body };

  fs.writeFileSync("./data.json", JSON.stringify(products, null, 2));

  res.send({
    message: `Product with id ${id} updated successfully`,
    products,
  });
});
// ========================================================= SERVER ====================================================
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

module.exports = app;