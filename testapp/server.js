const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = 5050;
const MONGO_URL = "mongodb://admin:qwerty@localhost:27017/?authSource=admin";

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Important for reading POST JSON bodies
app.use(express.static("public"));

// GET all users
app.get("/getUsers", async (req, res) => {
    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db("apnacollege-db");
        const data = await db.collection("users").find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Failed to fetch users");
    } finally {
        await client.close();
    }
});

// POST new user
app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    console.log("Incoming user:", userObj);

    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db("apnacollege-db");
        await db.collection("users").insertOne(userObj);
        console.log("User inserted in DB");

        res.send("User added successfully");
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).send("Failed to add user");
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
