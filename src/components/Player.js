import React, { useState, useRef, useContext, useEffect } from "react";
import { Typography, Box, Button, Icon, Grid } from "@mui/material";
import quiz from "../assets/musicfiles/Intron.mp3";
import { SocketContext } from "../context/socket";
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue } from "recoil";
import { room as roomAtom } from "../recoil/atoms";
import Slider from "@mui/material/Slider";

const Player = () => {
  const socket = useContext(SocketContext);
  const [playing, setPlaying] = useState(false);
  const myRef = useRef();
  const room = useRecoilValue(roomAtom);
  const [position, setPosition] = useState(quiz);

  const onPlaying = () => {
    const duration = myRef.current.duration;
    const ct = myRef.current.currentTime;

    setPosition({
      ...quiz,
      progress: (ct / duration) * 1000,
      length: duration,
    });

    console.log(duration, ct);
    console.log(position.progress, position.length);
  };

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  /* Handles starting audio and transmitting to others in the room */ 
  const startAudio = () => {
    console.log("Sent");
    socket.emit("play_audio", { room });
    startQuizAudio();
  };

  const startQuizAudio = () => {
    console.log("Starting audio");
    myRef.current.play();
    setPlaying(true);
  };

    /* Handles pausing audio and transmitting to others in the room */ 
  const pauseAudio = () => {
    console.log("Sent");
    socket.emit("pause_audio", { room });
    pauseQuizAudio();
  };

  const pauseQuizAudio = () => {
    myRef.current.pause();
    console.log("Paused audio");
    setPlaying(false);
  };

    /* Handles replaying and forwarding audio and transmitting to others in the room */ 
  const rewindAudio = () => {
    myRef.current.currentTime = myRef.current.currentTime - 10;
    setPosition({progress: position.progress -10})
  }

  const forwardAudio = () => {
    myRef.current.currentTime = myRef.current.currentTime + 10;
    setPosition({progress: position.progress -10})
  }


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
      <Typography
        sx={{
          pt: 3,
          pb: 2,
          color: "#55D3CC",
          fontWeight: 300,
          fontSize: 24,
          fontFamily: "Montserrat",
        }}
      >
        {" "}
        Audio #1
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Slider
          size="small"
          min={0}
          max={position.length}
          aria-label="time-indicator"
          valueLabelDisplay="auto"
          sx={{ width: "80%", color: "#55D3CC" }}
          step={1}
          value={position.progress}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: -2,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            ml:3,
            opacity: 0.38,
            fontWeight: 500,
            letterSpacing: 0.2,
            color: "#55D3CC",
          }}
        >
          {formatDuration(position.progress)}
        </Typography>
        <Typography
          sx={{
            mr:3,
            fontSize: "0.75rem",
            opacity: 0.38,
            fontWeight: 500,
            letterSpacing: 0.2,
            color: "#55D3CC",
          }}
        >
          {formatDuration(position.length)}
        </Typography>
      </Box>
      <IconButton
        onClick={rewindAudio}
        sx={{ color: "#55D3CC" }}
      >
        <Replay10Icon sx={{ fontSize: 30 }} />
      </IconButton>

      <audio ref={myRef} src={quiz} onTimeUpdate={onPlaying} />
      {playing ? (
        <IconButton onClick={pauseAudio} sx={{ color: "#55D3CC" }}>
          <PauseCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      ) : (
        <IconButton onClick={startAudio} sx={{ color: "#55D3CC" }}>
          <PlayCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      <IconButton onClick={forwardAudio} sx={{ color: "#55D3CC" }}>
        <Forward10Icon sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};

export default Player;
