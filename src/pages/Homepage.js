import React from "react";
import { Grid, Button, Typography, Box } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import ScaleLoader from "react-spinners/ScaleLoader"


const Homepage = () => {
  const navigate = useNavigate();

  /*
  const handleCreateRoom = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      }),
    };

    const res = await fetch(
      //"http://127.0.0.1:8000/api/create-room",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("./room");
  };

  const handleJoinRoom = () => {
    navigate("/join");
  };
  */

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
        variant="outlined"
      
        sx={{ mt: 7, width: 250, height: 60, border: 3, borderRadius: 3, color:"#A74C9E" }}
      >
       Play Quiz
      </Button>
      <Button
        variant="outlined"

        sx={{ mt: 1.5, width: 250, height: 60, border: 3, borderRadius: 3 , color: "#55D3CC",}}
      >
        Create your own quiz
      </Button>
      <Box sx={{mt:12}}>
      <ScaleLoader color="#55D3CC" speedMultiplier="0.5"/>
      </Box>
    </div>
  );
};

export default Homepage;