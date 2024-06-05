"use client";
import React, { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CallPage = () => {
  const [peerId, setPeerId] = useState("");
  const [friendId, setFriendId] = useState("");

  const peerInstance = useRef<Peer>();
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      setPeerId(id);
    });

    peer.on("call", (call) => {
      // Answer the call automatically with the local stream
      if (localStreamRef.current) {
        call.answer(localStreamRef.current);
        handleCall(call);
      }
    });

    peerInstance.current = peer;

    // Get the local video stream
    navigator.mediaDevices
      .getUserMedia({ video: true,audio:true })
      .then((stream) => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Failed to get local stream", err);
      });

    return () => {
      peer.destroy();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCall = (call: any) => {
    call.on("stream", (remoteStream: MediaStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    call.on("close", () => {
      console.log("Call ended");
    });

    call.on("error", (err: any) => {
      console.error("Call error: ", err);
    });
  };

  const initiateCall = () => {
    if (!peerInstance.current || !friendId.trim() || !localStreamRef.current)
      return;

    const call = peerInstance.current.call(friendId, localStreamRef.current);
    handleCall(call);
  };

  return (
    <div>
      <p>Your peer ID: {peerId}</p>
      <div>
        <Input
          placeholder="Friend's peer ID"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
        />
        <Button onClick={initiateCall}>Call</Button>
      </div>
      <div>
        <h3>Local Video</h3>
        <video ref={localVideoRef} autoPlay muted style={{ width: "300px" }} />
      </div>
      <div>
        <h3>Remote Video</h3>
        <video ref={remoteVideoRef} autoPlay style={{ width: "300px" }} />
      </div>
    </div>
  );
};

export default CallPage;
