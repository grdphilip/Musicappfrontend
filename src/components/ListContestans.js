import React, { useEffect, useState, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import IconButton from "@mui/material/IconButton";
import { SocketContext } from "../context/socket";
import { room as roomAtom } from "../recoil/atoms";
import { useRecoilValue } from "recoil";


const ListContestants = () => {
  const socket = useContext(SocketContext);
  const room = useRecoilValue(roomAtom);
  const [userInRoom, setUserInRoom] = useState([]);

  useEffect(() => { 
    socket.on("users_in_room", (data) => {
      setUserInRoom(data);
    });
  }, [socket]);

  return (
    <List sx={{ width: "100%", maxWidth: 360, color: "#55D3CC" }}>
      {userInRoom.map(a => a.name).map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton
              aria-label="comment"
              sx={{ mr: 2, color: "#55D3CC" }}
            >
              <VerifiedUserIcon />
            </IconButton>
          }
        >
          <ListItemText sx={{ ml: 2 }} primary={`${value}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default ListContestants;
