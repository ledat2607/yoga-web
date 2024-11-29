const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database,
  userCollection,
  classesCollection,
  cartCollection,
  paymentCollection,
  enrolledCollection,
  appliesCollection;

async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Database connection successful");

    // Initialize collections
    database = client.db("yoga-master");
    userCollection = database.collection("users");
    classesCollection = database.collection("classes");
    cartCollection = database.collection("cart");
    paymentCollection = database.collection("payment");
    enrolledCollection = database.collection("enrolled");
    appliesCollection = database.collection("applies");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit with failure
  }
}

connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
//new class
app.post("/new-class", async (req, res) => {
  try {
    const newClass = req.body;
    newClass.availableSeats = parseInt(newClass.availableSeats);
    const result = await classesCollection.insertOne(newClass);
    res.send({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Failed to add new class", error);
    res.status(500).send("Internal Server Error");
  }
});
//all classes
app.get("/classes", async (req, res) => {
  try {
    const query = { status: "approved" };
    const result = await classesCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error("Failed to add new class", error);
    res.status(500).send("Internal Server Error");
  }
});

//get class by instructor email
app.get("/class/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await classesCollection
      .find({ instructorEmail: email })
      .toArray();
    res.send(result);
  } catch (error) {
    console.error("Failed to add new class", error);
    res.status(500).send("Internal Server Error");
  }
});

//manage-class
app.get("/classese-manage", async (req, res) => {
  try {
    const query = { status: "approved" };
    const result = await classesCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error("Failed to add new class", error);
    res.status(500).send("Internal Server Error");
  }
});
//update-class
app.put("/change-status/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const reason = req.body.reason;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        status: status,
        reason: reason,
      },
    };
    const result = await classesCollection.updateOne(
      filter,
      updateDoc,
      options
    );
    res.send(result);
  } catch (error) {
    console.error("Failed to add new class", error);
    res.status(500).send("Internal Server Error");
  }
});
//get approved-class
app.get("/approved-class", async (req, res) => {
  try {
    const query = { status: "approved" };
    const result = await classesCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error("Failed to add new class", error);
    res.status(500).send("Internal Server Error");
  }
});
//get single class
app.get("/class-by-id/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await classesCollection.findOne(query);
  res.send(result);
});


//update class details
app.put("/update-class/:id", async(req,res)=>{
    const id = req.params.id;
    const updateClass = req.body;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const result = await classesCollection
})
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Optional: Gracefully close the MongoDB connection on server shutdown
process.on("SIGINT", async () => {
  console.log("Closing database connection");
  await client.close();
  process.exit(0);
});
