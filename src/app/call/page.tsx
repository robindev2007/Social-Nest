"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { DataConnection, Peer } from "peerjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CallPage = () => {
  const [peerId, setPeerId] = useState("");
  const [friendId, setFriendId] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const peerInstance = useRef<Peer>();
  const connection = useRef<DataConnection>();

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      setPeerId(id);
    });

    peer.on("connection", (conn) => {
      handleConnection(conn);
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, []);

  const handleConnection = (conn: DataConnection) => {
    connection.current = conn;

    conn.on("data", (data) => {
      console.log("Received data: ", data);
      setMessages((prevMessages) => [...prevMessages, data as string]);
    });

    conn.on("open", () => {
      console.log("Connection opened with ID: " + conn.peer);
      conn.send("Hi, I'm connected!");
    });

    conn.on("close", () => {
      console.log("Connection closed with ID: " + conn.peer);
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!connection.current || !message.trim()) return;

    connection.current.send(message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessage("");
  };

  const connectToPeer = () => {
    if (!peerInstance.current || !friendId.trim()) return;

    const conn = peerInstance.current.connect(friendId);
    handleConnection(conn);
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
        <Button onClick={connectToPeer}>Connect</Button>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CallPage;
