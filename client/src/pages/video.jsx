import { RoomContext } from "@/context/roomcontext";
import React, { useContext } from "react";

const Video = () => {
  const { ws } = useContext(RoomContext);

  const createRoom = () => {
    ws.emit("create-room");
  };
  return (
    <>
      <h1>Video Chat</h1>

      <div className="flex flex-row justify-center">
        <button
          onClick={createRoom}
          className="bg-green-400 text-white px-2 py-1 rounded-[10px]"
        >
          Create Room
        </button>
      </div>
    </>
  );
};

export default Video;
