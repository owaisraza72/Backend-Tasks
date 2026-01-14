const express = require("express");
const app = express();
app.use(express.json());

const todo = [
  {
    id: new Date().getTime(),
    text: "product 1",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.send(todo);
});

app.post("/todo", (req, res) => {
  const newTodo = req.body;
  todo.push(newTodo);
  res.send({ message: "successfully added product", product: todo });

  todo.push();
});

app.listen("3000", () => {
  console.log("server on port 3000");
});
