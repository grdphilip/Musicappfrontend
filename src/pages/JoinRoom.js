import { Typography, OutlinedInput, Button } from "@mui/material";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import {useRecoilState} from 'recoil';
import {room as roomAtom} from "../recoil/atoms"

const JoinRoom = () => {
  const [room, setRoom] = useRecoilState(roomAtom)
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  // Messages States

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      console.log(room)
      navigate('../lobby')
    }
  };

  return (
    <div className="center">
      <input placeholder="Room Number..." />
      <OutlinedInput
        sx={{
          mt: 3,
          backgroundColor: "white",
          width: 300,
          borderRadius: 2,
        }}
        placeholder="Rum att joina"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />

      <Button
        variant="outlined"
        onClick={() => navigate("../")}
        sx={{ mt: 5, mr: 2, color: "#A74C9E", border: 2 }}
      >
        Tillbaka
      </Button>
      <Button
        variant="outlined"
        onClick={joinRoom}
        sx={{ mt: 5, border: 2, color: "#55D3CC" }}
      >
        Gå vidare
      </Button>
    </div>
  );
};

export default JoinRoom;
