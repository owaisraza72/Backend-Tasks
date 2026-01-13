const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

// Connection URL
const url = "mongodb+srv://owaisraza:mongodb123@cluster.2bm3fhl.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "smitBackend";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected mongoDB server successfully");
  const db = client.db(dbName);

  const collection = db.collection('mongodb');

  
  const result = await collection.insertOne(
    { name: "Owais", age: 24 }
  );
  console.log("Inserted documents =>", result);


  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
