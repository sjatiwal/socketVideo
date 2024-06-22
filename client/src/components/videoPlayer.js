import React, { useRef, useEffect } from "react";

function VideoPlayer({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream instanceof MediaStream) {
      videoRef.current.srcObject = stream;
    } else {
      console.warn("Invalid stream object:", stream);
    }
  }, [stream]);

  return (
    <video ref={videoRef} autoPlay muted={true} className="w-[100%] h-[100%]" />
  );
}

export default VideoPlayer;
