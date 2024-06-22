import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RoomContext } from "@/context/roomcontext";
import VideoPlayer from "@/components/videoPlayer";
import Button from "@/components/button";

function RoomId() {
  const router = useRouter();
  const { roomId } = router.query;

  const { ws, me, stream, peers, shareScreen, screenSharingId, setRoomId } =
    useContext(RoomContext);

  const getUsers = ({ participants }) => {
    console.log(participants);
  };

  useEffect(() => {
    setRoomId(roomId);
  }, [roomId, setRoomId]);

  useEffect(() => {
    ws.emit("join-room", { roomId, peerId: me._id });

    ws.on("get-users", getUsers);
  }, [roomId]);

  console.log("peers", peers);

  const screenSharingVideo =
    screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;

  // const { [screenSharingId]: sharing, ...peersToShow } = peers;

  return (
    <div className="min-h-screen">
      <div>RoomId: {roomId}</div>

      <div className="flex">
        {screenSharingVideo && (
          <div className="w-4/5 pr-4">
            <VideoPlayer stream={screenSharingVideo} />
          </div>
        )}
        <div
          className={`grid gap-4 ${
            screenSharingVideo ? "w-1/5 grid-cols-1" : "grid-cols-4"
          }`}
        >
          {screenSharingId !== me?.id && <VideoPlayer stream={stream} />}

          {Object.values(peers).map((peer) => {
            return <VideoPlayer stream={peer.stream} key={peer?.stream?.id} />;
          })}
        </div>
      </div>

      <div className="absolute bottom-0 flex flex-row w-full justify-center">
        <Button text={"Screen Share"} onClick={shareScreen} />
      </div>
    </div>
  );
}

export default RoomId;
