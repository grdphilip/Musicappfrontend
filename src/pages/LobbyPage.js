import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, Box } from "@mui/material/";
import { SocketContext } from "../context/socket";
import { useRecoilValue } from "recoil";
import { room as roomAtom } from "../recoil/atoms";

export const LobbyPage = () => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const room = useRecoilValue(roomAtom);

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="center">
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <Typography
        sx={{
          pt: 30,
          fontFamily: "Montserrat",
          fontSize: 60,
          color: "#55D3CC",
        }}
      >
        {messageReceived}
      </Typography>
    </div>
  );
};
export default LobbyPage;
