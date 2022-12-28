import React, { useState, useRef, useContext, useEffect } from "react";
import { Typography, Box, Button, Icon, Grid } from "@mui/material";
import quiz from "../assets/musicfiles/Intron.mp3";
import { SocketContext } from "../context/socket";
import Player from "../components/Player";
import OutlinedInput from "@mui/material/OutlinedInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { useRecoilState } from "recoil";

const Game = () => {
  const [playerAnwser, setPlayerAnwser] = useRecoilState([]);
  const [tempAnwser, setTempAnwser] = useState("");
  const [showAnwsers, setShowAnwsers] = useState(false);

  const setAnswer = () => {
    playerAnwser.push(tempAnwser);
    console.log(playerAnwser);
  };

  const showAnwsersDialogue = () => {
    if (!showAnwsers) {
        setShowAnwsers(true);
    } else {
        setShowAnwsers(false);
    }
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Player />
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <OutlinedInput
          sx={{
            mt: 5,
            backgroundColor: "white",
            width: 300,
            borderRadius: 2,
          }}
          placeholder="Anwser"
          onChange={(event) => {
            setTempAnwser(event.target.value);
          }}
          value={tempAnwser}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              setAnswer();
              ev.preventDefault();
            }
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={showAnwsersDialogue}
          sx={{ mt: 1, ml: 3, color: "#A74C9E" }}
        >
          Your anwsers
        </Button>
        <Button onClick={setAnswer} sx={{ mt: 1, mr: 3, color: "#55D3CC" }}>
          Lock anwser
        </Button>
      </Box>
      {showAnwsers && (
        <>
          <Box sx={{ mt: 3 }} display={"flex"} justifyContent={"center"}>
            <Box
              sx={{ width: "90%", height: 400, borderRadius: 3, boxShadow: 10 }}
            >
              <Box sx={{ height: "85%" }}>
                <Typography
                  sx={{ mt: 2, color: "#55D3CC", fontFamily: "Montserrat" }}
                >
                  Anwsers
                </Typography>
                <List
                  style={{ maxHeight: "85%", overflow: "auto" }}
                  sx={{ width: "100%", maxWidth: 360, color: "#55D3CC" }}
                >
                  {playerAnwser.map((value) => (
                    <ListItem
                      key={value}
                      disableGutters
                      secondaryAction={
                        <IconButton
                          aria-label="comment"
                          sx={{ mr: 2, color: "#55D3CC" }}
                        >
                          <CheckIcon></CheckIcon>
                        </IconButton>
                      }
                    >
                      <ListItemText sx={{ ml: 2 }} primary={`${value}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Button
                sx={{ color: "#55D3CC" }}
                onClick={() => setShowAnwsers(false)}
              >
                Close
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Game;
