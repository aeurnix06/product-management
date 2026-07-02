const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let notificationCount = 0;

app.get("/", (req, res) => {
  res.send("Real-Time Notification Server Running");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("notification_count", notificationCount);

  socket.on("send_notification", (message) => {
    notificationCount++;

    io.emit("new_notification", {
      message,
      count: notificationCount,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("clear_notifications", () => {
    notificationCount = 0;
    io.emit("notifications_cleared");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});