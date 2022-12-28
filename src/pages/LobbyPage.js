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
  const room = useRecoilValue(roomAtom);
  const host = useRecoilValue(hostAtom);
  const navigate = useNavigate();

  const updateRoom = () => {
    socket.emit("update_users", { room });
  };

  const startGame = () => {
    socket.emit("start_game", { room });
    navigate("../game");
  };

  useEffect(() => {
    socket.on("game_started", (data) => {
      navigate(data);
      //navigate(data)
    });
  }, [socket]);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"}>
        <div className="center">
          <Box>
          {host.length !== 0 ? (
            <>
            <Typography
              sx={{ fontFamily: "Montserrat", fontSize: 18, color: "white" }}
            >
              Start the game when everyone has joined
            </Typography>
            </>
          ) : (
            <>

            <Typography
              sx={{ fontFamily: "Montserrat", fontSize: 18, color: "white" }}
            >
             Game is about to start
            </Typography>
            </>
          )}

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
              <IconButton aria-label="comment" sx={{ color: "white" }}>
                <RefreshIcon />
              </IconButton>
            </Button>

            {host.length !== 0 && (
              <>
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
              </>
            )}
          </Box>
        </div>
      </Box>
    </Box>
  );
};
export default LobbyPage;
