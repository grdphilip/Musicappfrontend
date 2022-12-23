import React, { useState, useEffect, useContext } from "react";
import { Typography, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import RingLoader from "react-spinners/RingLoader";
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { useRecoilState } from "recoil";
import { room as roomAtom, host as hostAtom } from "../recoil/atoms";

const CreateQuizPage = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate("");
  const [room, setRoom] = useRecoilState(roomAtom);
  const [host, setHost] = useRecoilState(hostAtom);

  const quizzes = [
    {
      value: "OGQuiz",
      label: "OG",
    },
    {
      value: "NyttQuiz",
      label: "Nytt",
    },
  ];

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState("");

  const handleKeyChange = (e) => {
    setRoom(e.target.value);
  };

  const handleHostChange = (e) => {
    setHost(e.target.value);
  };

  const handleQuizChange = (e) => {
    setQuiz(e.target.value);
  };

  const createRoom = async () => {
    socket.emit("join_room", room);

    const res = await fetch(process.env.REACT_APP_BASE_URL + "/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: host,
        key: room,
        genre: quiz,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("../lobby");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <RingLoader color="#55D3CC" loading={loading}></RingLoader>
        </Box>
      ) : (
        <Box sx={{ width: "100%", height: "100%" }}>
          <Typography
            sx={{
              pt: 30,
              fontFamily: "Montserrat",
              fontSize: 30,
              color: "#55D3CC",
            }}
          >
            Create room here
          </Typography>
          <OutlinedInput
            sx={{
              mt: 3,
              backgroundColor: "white",
              width: 300,
              borderRadius: 2,
            }}
            placeholder="Host name"
            value={host}
            onChange={handleHostChange}
          />

          <OutlinedInput
            sx={{
              mt: 3,
              backgroundColor: "white",
              width: 300,
              borderRadius: 2,
            }}
            placeholder="Room name"
            value={room}
            onChange={handleKeyChange}
          />
          <TextField
            id="outlined-select-currency"
            label="Genre"
            select
            defaultValue="OG"
            variant="filled"
            value={quiz}
            onChange={handleQuizChange}
            sx={{
              backgroundColor: "white",
              width: 300,
              mt: 4,
              borderRadius: 2,
            }}
          >
            {quizzes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="outlined"
            onClick={() => navigate("../")}
            sx={{ mt: 5, mr: 2, color: "#A74C9E", border: 2 }}
          >
            Go back
          </Button>
          <Button
            variant="outlined"
            onClick={createRoom}
            sx={{ mt: 5, border: 2, color: "#55D3CC" }}
          >
            Create game
          </Button>
        </Box>
      )}
    </div>
  );
};

export default CreateQuizPage;
