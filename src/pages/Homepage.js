import React from "react";
import { Button, Typography, Box } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import ScaleLoader from "react-spinners/ScaleLoader";

const Homepage = () => {
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    /*

    const res = await fetch('http://localhost:3000/rooms/',{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "Anders",
      key: "RandomYo",
      genre: "OG",
    }),
  }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
      */
    navigate("./create");
  };

  const handleJoinRoom = async () => {
    /* 
    const res = await fetch(process.env.REACT_APP_BASE_URL + '/rooms', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await res.json()
    console.log(data)
    return data;
     */
    navigate('./join')
   
  };

  return (
    <div>
      <Typography
        sx={{
          pt: 30,
          fontFamily: "Montserrat",
          fontSize: 60,
          color: "#55D3CC",
        }}
      >
        QuizM
      </Typography>
      <Button
        onClick={handleJoinRoom}
        variant="outlined"
        sx={{
          mt: 7,
          width: 250,
          height: 60,
          border: 3,
          borderRadius: 3,
          color: "#A74C9E",
        }}
      >
        Join Quiz
      </Button>
      <Button
        variant="outlined"
        onClick={handleCreateRoom}
        sx={{
          mt: 1.5,
          width: 250,
          height: 60,
          border: 3,
          borderRadius: 3,
          color: "#55D3CC",
        }}
      >
        Create quiz
      </Button>
      <Button
        variant="outlined"
        sx={{
          mt: 1.5,
          width: 250,
          height: 60,
          border: 3,
          borderRadius: 3,
          color: "#3B8CD3",
        }}
      >
        Leaderboard
      </Button>
      <Box sx={{ mt: 12 }}>
        <ScaleLoader color="#55D3CC" speedMultiplier="0.5" />
      </Box>
    </div>
  );
};

export default Homepage;
