import { createContext, useEffect, useReducer, useState } from "react";
import socketIoClient from "socket.io-client";
import { useRouter } from "next/router";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peerReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerAction";

const WS = "http://localhost:5555";

export const RoomContext = createContext(null);

const ws = new socketIoClient(WS);

export const RoomProvider = ({ children }) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState("");
  const [peers, dispatch] = useReducer(peerReducer, {});
  const [screenSharingId, setScreenSharingId] = useState("");
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const enterRoom = ({ roomId }) => {
    console.log(roomId);

    router.push(`/video/${roomId}`);
  };

  const getUsers = ({ participants }) => {
    console.log({ participants });
  };

  const switchStram = (stream) => {
    setStream(stream);
    setScreenSharingId(me?.id);
    Object.values(me?.connections).forEach((peer) => {
      const videoTrack = stream
        ?.getTracks()
        .find((track) => track.kind === "video");
      peer[0].peerConnection
        .getSenders()[1]
        .replaceTrack(videoTrack)
        .catch((err) => console.log(err));
    });
  };

  const shareScreen = () => {
    if (screenSharingId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchStram);
    } else {
      navigator.mediaDevices.getDisplayMedia({}).then(switchStram);
    }
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("user-disconnected", (peerId) => {
      dispatch(removePeerAction(peerId));
    });
    ws.on("user-shared-screen", (peerId) => setScreenSharingId(peerId));
    ws.on("user-stopped-sharing", () => setScreenSharingId(""));

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => setStream(stream));
    } catch (err) {
      console.log("VIDEOERROR:", err);
    }

    return () => {
      ws.off("room-created");
      ws.off("get-users");
      ws.off("user-disconnected");
      ws.off("user-shared-screen");
      ws.off("user-stopped-sharing");
      ws.off("user-joined");
    };
  }, []);

  useEffect(() => {
    if (screenSharingId) {
      ws.emit("start-sharing", { peerId: screenSharingId, roomId });
    } else {
      ws.emit("stop-sharing");
    }
  }, [screenSharingId]);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    ws.on("user-joined", ({ peerId }) => {
      const call = me.call(peerId, stream);

      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);
  return (
    <RoomContext.Provider
      value={{ ws, me, stream, peers, shareScreen, screenSharingId, setRoomId }}
    >
      {children}
    </RoomContext.Provider>
  );
};
