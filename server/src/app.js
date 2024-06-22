const http = require("http");
const express = require("express");
const cors = require("cors");
const Server = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");

// route
const user = require("./routes/user");

const { handleConnection } = require("./socket/ws");
const app = express();

const serverInstance = http.createServer(app);
const io = Server(serverInstance, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

io.on("connection", (socket) => {
  console.log("a user connected");
  handleConnection(socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/api/v1", user);

module.exports = serverInstance;
