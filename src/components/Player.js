import React, { useState, useRef, useContext, useEffect } from "react";
import { Typography, Box, Button, Icon, Grid } from "@mui/material";
import Slider from "../components/slider/Slider";
import quiz from "../assets/musicfiles/Intron.mp3";
import { SocketContext } from "../context/socket";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue } from "recoil";
import { room as roomAtom } from "../recoil/atoms";

const Player = () => {
  const socket = useContext(SocketContext);
  const [playing, setPlaying] = useState(false);
  const myRef = useRef();
  const room = useRecoilValue(roomAtom);

  const startAudio = () => {
    console.log("Sent");
    socket.emit("play_audio", { room });
    startQuizAudio();
  };

  const pauseAudio = () => {
    console.log("Sent");
    socket.emit("pause_audio", { room });
    pauseQuizAudio();
  };

  const startQuizAudio = () => {
    console.log("Starting audio");
    myRef.current.play();
    setPlaying(true);
  };

  const pauseQuizAudio = () => {
    myRef.current.pause();
    console.log("Paused audio");
    setPlaying(false);
  };

  useEffect(() => {
    socket.on("audio_paused", (data) => {
      pauseQuizAudio();
    });
  }, [socket]);

  useEffect(() => {
    socket.on("audio_played", (data) => {
      startQuizAudio();
    });
  }, [socket]);

  return (
    <Box
      sx={{
        width: 350,
        background: "#272727",
        height: 200,
        boxShadow: 10,
        borderRadius: 3,
      }}
    >
      <h1>Audio #1</h1>
      <Slider></Slider>
      <IconButton
        onClick={() => console.log("previous")}
        sx={{ mt: 3, color: "#55D3CC" }}
      >
        <SkipPreviousIcon sx={{ fontSize: 30 }} />
      </IconButton>

      <audio ref={myRef} src={quiz} />
      {playing ? (
        <IconButton onClick={pauseAudio} sx={{ mt: 3, color: "#55D3CC" }}>
          <PauseCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      ) : (
        <IconButton onClick={startAudio} sx={{ mt: 3, color: "#55D3CC" }}>
          <PlayCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      <IconButton
        onClick={() => console.log("next")}
        sx={{ mt: 3, color: "#55D3CC" }}
      >
        <SkipNextIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};

export default Player;
