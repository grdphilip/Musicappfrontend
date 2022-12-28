import { borderRadius } from "@mui/system";
import { Typography, Box, Button, Icon, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";



const AnwsersComponent = () => {
  const [showAnwsers, setShowAnwsers] = useState(false);

  const showAnwsersDialogue = () => {
    console.log(showAnwsers)
    setShowAnwsers(true);
  };


  return (
    <Box sx={{ mt: 3 }} display={"flex"} justifyContent={"center"}>
      <Box sx={{ width: "90%", height: 400, borderRadius: 3, boxShadow: 10 }}>
        <Box sx={{ height: "85%" }}>
          <Typography
            sx={{ mt: 2, color: "#55D3CC", fontFamily: "Montserrat" }}
          >
            Anwsers
          </Typography>
        </Box>
        <Button sx={{ color: "#55D3CC" }} onClick={() => setShowAnwsers(false)}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default AnwsersComponent;
