import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material/";
import { SocketContext } from "../context/socket";
import { useRecoilValue } from "recoil";
import NavBar from "./NavBar";
import { room as roomAtom, host as hostAtom } from "../recoil/atoms";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ListContestants from "../components/ListContestans";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";

export const LobbyPage = () => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const room = useRecoilValue(roomAtom);
  const navigate = useNavigate()

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const updateRoom = () => {
    socket.emit("update_users", { room });
  };

  const startGame = () => {
    socket.emit("start_game", {room})
    navigate(ç)
  }

  useEffect(() => {
    socket.on("game_started", (data) => {
      navigate(data)
      //navigate(data)
    });
  }, [socket]);

  return (
    <Box>
      <NavBar
        leftIcon={<CloseOutlinedIcon onClick={() => console.log("hello")} sx={{ color: "#55D3CC" }} />}
      ></NavBar>
      <Box display={"flex"} justifyContent={"center"}>
        <div className="center">
          <Box>
            <Typography
              sx={{ fontFamily: "Montserrat", fontSize: 18, color: "white" }}
            >
              Start the game when everyone has joined
            </Typography>

            <Typography
              sx={{
                mt: 2,
                fontFamily: "Montserrat",
                fontSize: 18,
                color: "#55D3CC",
              }}
            >
              Users connected:
            </Typography>
            <ListContestants></ListContestants>
            <Button
              variant="outlined"
              onClick={updateRoom}
              sx={{
                mt: 2,
                width: 150,
                height: 50,
                border: 2,
                borderRadius: 3,
                color: "white",
              }}
            >
              Update
              <IconButton
                aria-label="comment"
                sx={{color: "white" }}
              >
                <RefreshIcon />
              </IconButton>
            </Button>

            <Button
              variant="outlined"
              onClick={startGame}
              sx={{
                mt: 2,
                width: 150,
                height: 50,
                border: 2,
                borderRadius: 3,
                color: "#55D3CC",
              }}
            >
              Start game
            </Button>
          </Box>
        </div>
      </Box>
    </Box>
  );
};
export default LobbyPage;
