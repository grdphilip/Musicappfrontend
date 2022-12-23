import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Typography, Zoom } from "@mui/material";
import Homepage from "./pages/Homepage";
import CreateQuizPage from "./pages/CreateQuizPage";
import LobbyPage from "./pages/LobbyPage";
import JoinRoom from "./pages/JoinRoom";
import Game from "./pages/Game";
import { SocketContext, socket } from "./context/socket";
import {RecoilRoot} from 'recoil';


const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <div className="App">
      <RecoilRoot>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<CreateQuizPage />} />
            <Route path="/lobby" element={<LobbyPage />} />
            <Route path="/join" element={<JoinRoom/>}/>
            <Route path="/game" element={<Game/>}/>
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
      </RecoilRoot>
    </div>
  );
}

export default App;
