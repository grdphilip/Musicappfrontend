import React, { useState, useRef, useContext } from "react";
import { Typography, Box, Button, Icon, Grid } from "@mui/material";
import Slider from "../components/slider/Slider";
import quiz from "../assets/musicfiles/Intron.mp3";
import { SocketContext } from "../context/socket";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import IconButton from "@mui/material/IconButton";
import Player from "../components/Player";
import OutlinedInput from "@mui/material/OutlinedInput";

const Game = () => {
    const [playerGuess, setPlayerGuess] = useState("");


  return (
    <Box>
      <Player />
      <OutlinedInput
        sx={{
          mt: 2,
          backgroundColor: "white",
          width: 300,
          borderRadius: 2,
        }}
        placeholder="Anwser"
        onChange={(event) => {
          setPlayerGuess(event.target.value);
        }}
      />
    </Box>
  );
};

export default Game;
