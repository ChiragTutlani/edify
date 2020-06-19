require("dotenv").config();
const express = require("express");
const connectDB = require("./util/database");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
connectDB(process.env.MONGO_URI);
const app = express();
const cookierParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookierParser());
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comment", commentRoutes);

app.get("/", (req, res) => {
  res.send("GET /");
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
