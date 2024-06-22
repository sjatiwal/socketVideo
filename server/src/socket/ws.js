const Socket = require("socket.io");
const { v4 } = require("uuid");

const rooms = {};
const handleConnection = (socket) => {
  const createRoom = () => {
    const roomId = v4();
    rooms[roomId] = {};
    socket.emit("room-created", { roomId });
    console.log("user created the room");
  };

  const joinRoom = ({ roomId, peerId }) =>
    // { roomId, peerId, userName }
    {
      console.log("JOINED", { roomId });
      if (!rooms[roomId]) rooms[roomId] = {};
      // if (!chats[roomId]) chats[roomId] = [];
      // socket.emit("get-messages", chats[roomId]);
      // console.log("user joined the room", roomId, peerId, userName);
      rooms[roomId][peerId] = {
        peerId,
        //userName
      };
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", {
        peerId,
        //userName
      });
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });

      socket.on("disconnect", () => {
        console.log("user left the room", peerId);
        leaveRoom({ roomId, peerId });
      });
    };

  const leaveRoom = ({ peerId, roomId }) => {
    if (rooms[roomId] && rooms[roomId][peerId]) {
      delete rooms[roomId][peerId];
      socket.to(roomId).emit("user-disconnected", peerId);

      // If the room is empty after the peer leaves, optionally delete the room
      if (Object.keys(rooms[roomId]).length === 0) {
        delete rooms[roomId];
      }
    }
  };

  const startSharing = ({ peerId, roomId }) => {
    console.log({ roomId, peerId });
    socket.to(roomId).emit("user-started-sharing", peerId);
  };

  const stopSharing = (roomId) => {
    socket.to(roomId).emit("user-stopped-sharing");
  };

  const addMessage = (roomId, message) => {
    console.log({ message });
    if (chats[roomId]) {
      chats[roomId].push(message);
    } else {
      chats[roomId] = [message];
    }
    socket.to(roomId).emit("add-message", message);
  };
  const changeName = ({ peerId, userName, roomId }) => {
    if (rooms[roomId] && rooms[roomId][peerId]) {
      rooms[roomId][peerId].userName = userName;
      socket.to(roomId).emit("name-changed", { peerId, userName });
    }
  };
  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
  socket.on("start-sharing", startSharing);
  socket.on("stop-sharing", stopSharing);
  socket.on("send-message", addMessage);
  socket.on("change-name", changeName);
};
module.exports = { handleConnection };
