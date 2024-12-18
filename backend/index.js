const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.PAYMENT_SECRET);
const cors = require("cors");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// Middleware

app.use(
  cors({
    origin: "http://localhost:5173", // URL frontend của bạn
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
// SET TOKEN .
const verifyJWT = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ error: true, message: "Forbidden user or token has expired" });
    }
    req.decoded = decoded;
    next();
  });
};

// MONGO DB ROUTES

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const database = client.db("yoga-master");
    const userCollection = database.collection("users");
    const classesCollection = database.collection("classes");
    const cartCollection = database.collection("cart");
    const enrolledCollection = database.collection("enrolled");
    const paymentCollection = database.collection("payments");
    const appliedCollection = database.collection("applied");
    client.connect();

    // Verify admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user.role === "admin") {
        next();
      } else {
        return res
          .status(401)
          .send({ error: true, message: "Unauthorize access" });
      }
    };

    const verifyInstructor = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user.role === "instructor" || user.role === "admin") {
        next();
      } else {
        return res
          .status(401)
          .send({ error: true, message: "Unauthorize access" });
      }
    };

    app.post("/new-user", async (req, res) => {
      const newUser = req.body;
      const saltRounds = 10;
      if (newUser.password) {
        const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
        newUser.password = hashedPassword;
      }
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    app.post("/api/set-token", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    });

    // GET ALL USERS
    app.get("/users", async (req, res) => {
      const users = await userCollection.find({}).toArray();
      res.send(users);
    });
    // GET USER BY ID
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });
    // GET USER BY EMAIL
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });
    // Delete a user

    app.delete("/delete-user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    // UPDATE USER
    app.put("/update-user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role, // Corrected field
          address: updatedUser.address,
          phone: updatedUser.phone,
          about: updatedUser.about,
          photoUrl: updatedUser.photoUrl,
          skills: updatedUser.skills ? updatedUser.skills : null,
        },
      };

      try {
        const result = await userCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        if (result.modifiedCount > 0) {
          res
            .status(200)
            .send({ message: "User information updated successfully!" });
        } else {
          res
            .status(400)
            .send({ message: "Failed to update user information." });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({
          message: "An error occurred while updating user information.",
        });
      }
    });

    // ! CLASSES ROUTES
    app.post("/new-class", async (req, res) => {
      const newClass = req.body;
      newClass.availableSeats = parseInt(newClass.availableSeats);
      const result = await classesCollection.insertOne(newClass);
      res.send(result);
    });

    // GET ALL CLASSES ADDED BY INSTRUCTOR
    app.get("/classes/:email", async (req, res) => {
      const email = req.params.email;
      const query = { instructorEmail: email };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    });

    // GET ALL CLASSES
    app.get("/classes", async (req, res) => {
      const query = { status: "approved" };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/classes-manage", async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });

    // Change status of a class
    app.put("/change-status/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const reason = req.body.reason;
      const filter = { _id: new ObjectId(id) };
      console.log("🚀 ~ file: index.js:180 ~ app.put ~ reason:", reason);
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
    });
    // * GET APPROVED CLASSES
    app.get("/approved-classes", async (req, res) => {
      const query = { status: "approved" };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    });

    // GET ALL INSTRUCTORS
    app.get("/instructors", async (req, res) => {
      const query = { role: "instructor" };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    // Update a class
    app.put("/update-class/:id", async (req, res) => {
      const id = req.params.id;
      const updatedClass = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedClass.name,
          description: updatedClass.description,
          price: updatedClass.price,
          availableSeats: parseInt(updatedClass.availableSeats),
          videoLink: updatedClass.videoLink,
          status: "pending",
        },
      };
      const result = await classesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // Get single class by id for details page
    app.get("/class/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await classesCollection.findOne(query);
      res.send(result);
    });
    // ! CART ROUTES

    // ADD TO CART
    app.post("/add-to-cart", async (req, res) => {
      const newCartItem = req.body;
      const result = await cartCollection.insertOne(newCartItem);
      res.send(result);
    });
    // Get cart item id for checking if a class is already in cart
    app.get("/cart-item/:id", async (req, res) => {
      const id = req.params.id;
      const email = req.query.email;
      const query = { classId: id, userEmail: email };
      const result = await cartCollection.findOne(query);
      res.send(result); // Sử dụng res.json thay vì res.send
    });

    app.get("/cart/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const projection = { classId: 1 };
      const carts = await cartCollection
        .find(query, { projection: projection })
        .toArray();
      const classIds = carts.map((cart) => new ObjectId(cart.classId));
      const query2 = { _id: { $in: classIds } };
      const result = await classesCollection.find(query2).toArray();
      res.send(result);
    });

    // Delete a item form cart
    app.delete("/delete-cart-item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { classId: id };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });
    // PAYMENT ROUTES
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price) * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    // POST PAYMENT INFO
    app.post("/payment-info", async (req, res) => {
      try {
        const paymentInfo = req.body;
        const { classesId, userEmail, transactionId } = paymentInfo;
        const singleClassId = req.query.classId;

        // Tạo query cho classes
        const classesQuery = singleClassId
          ? { _id: new ObjectId(singleClassId) }
          : { _id: { $in: classesId.map((id) => new ObjectId(id)) } };

        // Lấy danh sách lớp học
        const classes = await classesCollection.find(classesQuery).toArray();

        if (!classes || classes.length === 0) {
          return res.status(404).send({ error: "Classes not found." });
        }

        // Duyệt từng lớp để cập nhật riêng lẻ
        for (const singleClass of classes) {
          const updatedDoc = {
            $set: {
              totalEnrolled: (singleClass.totalEnrolled || 0) + 1,
              availableSeats: (singleClass.availableSeats || 0) - 1,
            },
          };

          await classesCollection.updateOne(
            { _id: singleClass._id },
            updatedDoc
          );
        }

        // Thêm dữ liệu mới vào enrolledCollection
        const enrolledData = {
          userEmail,
          classesId: classesId.map((id) => new ObjectId(id)),
          transactionId,
        };
        const enrolledResult = await enrolledCollection.insertOne(enrolledData);

        // Xóa giỏ hàng dựa trên query
        const cartQuery = singleClassId
          ? { classId: singleClassId, email: userEmail }
          : { classId: { $in: classesId } };
        const deletedResult = await cartCollection.deleteMany(cartQuery);

        // Thêm dữ liệu thanh toán
        const paymentResult = await paymentCollection.insertOne(paymentInfo);

        // Trả về kết quả
        res.send({
          success: true,
          paymentResult,
          deletedResult,
          enrolledResult,
        });
      } catch (error) {
        console.error("Error in /payment-info:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    app.get("/payment-history/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const result = await paymentCollection
        .find(query)
        .sort({ date: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/payment-history-length/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const total = await paymentCollection.countDocuments(query);
      res.send({ total });
    });

    // ! ENROLLED ROUTES

    app.get("/popular_classes", async (req, res) => {
      const result = await classesCollection
        .find()
        .sort({ totalEnrolled: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    app.get("/popular-instructors", async (req, res) => {
      const pipeline = [
        {
          $group: {
            _id: "$instructorEmail",
            totalEnrolled: { $sum: "$totalEnrolled" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "email",
            as: "instructor",
          },
        },
        {
          $match: {
            "instructor.role": "instructor",
          },
        },
        {
          $project: {
            _id: 0,
            instructor: {
              $arrayElemAt: ["$instructor", 0],
            },
            totalEnrolled: 1,
          },
        },
        {
          $sort: {
            totalEnrolled: -1,
          },
        },
        {
          $limit: 6,
        },
      ];
      const result = await classesCollection.aggregate(pipeline).toArray();
      res.send(result);
    });

    // Admins stats
    app.get("/admin-stats", async (req, res) => {
      // Get approved classes and pending classes and instructors
      const approvedClasses = (
        await classesCollection.find({ status: "approved" }).toArray()
      ).length;
      const pendingClasses = (
        await classesCollection.find({ status: "pending" }).toArray()
      ).length;
      const instructors = (
        await userCollection.find({ role: "instructor" }).toArray()
      ).length;
      const totalClasses = (await classesCollection.find().toArray()).length;
      const totalEnrolled = (await enrolledCollection.find().toArray()).length;
      // const totalRevenue = await paymentCollection.find().toArray();
      // const totalRevenueAmount = totalRevenue.reduce((total, current) => total + parseInt(current.price), 0);
      const result = {
        approvedClasses,
        pendingClasses,
        instructors,
        totalClasses,
        totalEnrolled,
        // totalRevenueAmount
      };
      res.send(result);
    });

    // !GET ALL INSTrUCTOR

    app.get("/instructors", async (req, res) => {
      const result = await userCollection
        .find({ role: "instructor" })
        .toArray();
      res.send(result);
    });

    app.get("/enrolled-classes/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const pipeline = [
        {
          $match: query,
        },
        {
          $lookup: {
            from: "classes",
            localField: "classesId",
            foreignField: "_id",
            as: "classes",
          },
        },
        {
          $unwind: "$classes",
        },
        {
          $lookup: {
            from: "users",
            localField: "classes.instructorEmail",
            foreignField: "email",
            as: "instructor",
          },
        },
        {
          $project: {
            _id: 0,
            classes: 1,
            instructor: {
              $arrayElemAt: ["$instructor", 0],
            },
          },
        },
      ];
      const result = await enrolledCollection.aggregate(pipeline).toArray();
      // const result = await enrolledCollection.find(query).toArray();
      res.send(result);
    });

    // Applied route
    app.post("/as-instructor", async (req, res) => {
      const data = req.body;
      const result = await appliedCollection.insertOne(data);
      res.send(result);
    });
    app.get("/application", async (req, res) => {
      const result = await appliedCollection.find().toArray();
      res.send(result);
    });
    app.get("/applied-instructors/:email", async (req, res) => {
      const email = req.params.email;
      const result = await appliedCollection.findOne({ email });
      res.send(result);
    });
    app.put("/update-by-application", async (req, res) => {
      try {
        const { email, skill } = req.body;

        if (!email || !skill) {
          return res
            .status(400)
            .send({ message: "Email and skill are required" });
        }

        // Fetch the user based on the provided email
        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        // Update the user's role and add the skill
        const result = await userCollection.updateOne(
          { email },
          {
            $set: {
              role: "instructor",
              skill: skill,
            },
          }
        );

        if (result.modifiedCount > 0) {
          res.send({ message: "User updated successfully" });
        } else {
          res.status(500).send({ message: "Failed to update user" });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Yoga Master Server is running!");
});

// Listen
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
