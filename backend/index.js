// const express = require("express")
// const mongoose = require('mongoose')
// const cors = require("cors")

// const userRoutes = require('./userRoutes/userRoutes')
// const playlistRoutes = require('./playlistRoutes/playlistRoutes')


// const app = express()
// app.use(express.json())
// app.use(cors())

// mongoose.set("strictQuery", true);
// mongoose.connect("mongodb+srv://arpitbaheti:santoshBaheti02@appu.u6vqlco.mongodb.net/VibesVault")

// const db = mongoose.connection;
// db.on("open", ()=>{
//   console.log("database connected");
// });
// db.on("error", ()=>{
//   console.log("error in connectiong to database");
// });

// app.use("/users", userRoutes);
// app.use("/playlists", playlistRoutes);

// app.use("/",(req,res) => {
//   res.send("server is running");
// })

// const port=5000;

// app.listen(port, () => {
//   console.log("server is running")
// })


const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

const userRoutes = require('./userRoutes/userRoutes');
const playlistRoutes = require('./playlistRoutes/playlistRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true);

// Uncomment these lines for MongoDB connection debugging
const mongoURI = process.env.MONGO_URI || "mongodb+srv://arpitbaheti:santoshBaheti02@appu.u6vqlco.mongodb.net/VibesVault";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("open", () => {
  console.log("Database connected");
});

db.on("error", (error) => {
  console.error("Error in connecting to database:", error);
});

app.use("/users", userRoutes);
app.use("/playlists", playlistRoutes);

app.use("/", (req, res) => {
  res.send("Server is running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
