import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material/";
import { SocketContext } from "../context/socket";
import { useRecoilValue } from "recoil";
import NavBar from "./NavBar";
import { room as roomAtom, host as hostAtom } from "../recoil/atoms";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ListContestants from "../components/ListContestans";
import RefreshIcon from '@mui/icons-material/Refresh';

export const LobbyPage = () => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const room = useRecoilValue(roomAtom);
  const host = useRecoilValue(hostAtom);

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const updateRoom = () => {
    socket.emit("update_users", { room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      console.log(messageReceived);
    });
  }, [socket]);

  return (
    <Box>
      <NavBar
        leftIcon={<CloseOutlinedIcon sx={{ color: "#55D3CC" }} />}
      ></NavBar>
      <Box display={"flex"} justifyContent={"center"}>
        <div className="center">
          <Box>
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
              sx={{ fontFamily: "Montserrat", fontSize: 18, color: "#55D3CC" }}
            >
              {messageReceived}
            </Typography>
            <Typography
              sx={{ fontFamily: "Montserrat", fontSize: 18, color: "#55D3CC" }}
            >
              Start the game when everyone has joined
            </Typography>

            <Typography
              sx={{ fontFamily: "Montserrat", fontSize: 18, color: "#55D3CC" }}
            >
              Users connected:
            </Typography>
            <IconButton
                aria-label="comment"
                onClick={updateRoom}
                sx={{ mr: 2, color: "#55D3CC" }}
              >
                <RefreshIcon/>
              </IconButton>
            <ListContestants></ListContestants>
            
            <Button
              variant="outlined"
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
