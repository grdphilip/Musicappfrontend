import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, Box } from "@mui/material/";
import { SocketContext } from "../context/socket";
import { useRecoilValue } from "recoil";
import NavBar from "./NavBar";
import { room as roomAtom, host as hostAtom } from "../recoil/atoms";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const LobbyPage = () => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const room = useRecoilValue(roomAtom);
  const host = useRecoilValue(hostAtom);

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <Box >
      <NavBar leftIcon={<CloseOutlinedIcon sx={{color: "#55D3CC" }} />}></NavBar>
      <Box display={"flex"} justifyContent={"center"}>
        <div className= "center">

      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: 20, color: "#55D3CC" }}
      >
        Pre game lobby
      </Typography>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: 20, color: "#55D3CC" }}
      >
        {messageReceived}
      </Typography>
      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: 20, color: "#55D3CC" }}
      >
        {host}
      </Typography>
      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: 20, color: "#55D3CC" }}
      >
        {room}
      </Typography>
      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: 20, color: "#55D3CC" }}
      >
        Users connected:
      </Typography>
      </div>
      </Box>
    </Box>
  );
};
export default LobbyPage;
