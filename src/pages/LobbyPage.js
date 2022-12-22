import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material/";

export const LobbyPage = () => {
  const [key, setKey] = useState("");

  const getRoomKey = async () => {
    const res = await fetch("http://localhost:3000/rooms/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    setKey(data[21].key);

    return data;
  };

  return (
    <div className="center">
      <Typography
        sx={{
          pt: 30,
          fontFamily: "Montserrat",
          fontSize: 18,
          color: "#55D3CC",
        }}
      >
       Koden till rummet är: {key}
      </Typography>
    </div>
  );
};
export default LobbyPage;
