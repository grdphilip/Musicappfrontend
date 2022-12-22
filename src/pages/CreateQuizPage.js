import React, { useState, useEffect, useContext  } from "react";
import {Typography,Box,Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import RingLoader from "react-spinners/RingLoader";
import { Navigate, useNavigate} from "react-router-dom";
import {SocketContext} from '../context/socket';


const CreateQuizPage = () => {

  const socket = useContext(SocketContext)
  const navigate = useNavigate("");

  const returnHome = () => {
    navigate("../");
  };

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
  const [host, setHost] = useState("");
  const [key, setKey] = useState("");
  const [quiz, setQuiz] = useState("");

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleHostChange = (e) => {
    setHost(e.target.value);
  };

  const handleQuizChange = (e) => {
    setQuiz(quizzes[0].value);
  };

  const createRoom = async () => {
    


    /*
    const res = await fetch(process.env.REACT_APP_BASE_URL + '/rooms', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: host,
        key: key,
        genre: quiz,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
      */ 
      navigate('../lobby')
  };

  



  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);


  return (
    <div className="center">
      {loading ? (
        <RingLoader color="#55D3CC" loading={loading}></RingLoader>
      ) : (
        <Box sx={{ mb: 40, width: "100%", height: "100%" }}>
          <Typography
            sx={{
              pt: 30,
              fontFamily: "Montserrat",
              fontSize: 35,
              color: "#55D3CC",
            }}
          >
            Kom igång här!
          </Typography>
          <OutlinedInput
            sx={{
              mt: 3,
              backgroundColor: "white",
              width: 300,
              borderRadius: 2,
            }}
            placeholder="Lägg till hostens namn"
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
            placeholder="Ange rummets nyckel"
            value={key}
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
            onClick={returnHome}
            sx={{ mt: 5, mr: 2, color: "#A74C9E", border: 2 }}
          >
            Tillbaka
          </Button>
          <Button
            variant="outlined"
            onClick={createRoom}
            sx={{ mt: 5, border: 2, color: "#55D3CC" }}
          >
            Gå vidare
          </Button>
        </Box>
      )}
    </div>
  );
};

export default CreateQuizPage;
