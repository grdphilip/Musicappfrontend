import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Typography } from "@mui/material";
import Homepage from "./pages/Homepage";
import CreateQuizPage from "./pages/CreateQuizPage";
import LobbyPage from "./pages/LobbyPage";


const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/create" element={<CreateQuizPage />}/>
          <Route path="/lobby" element={<LobbyPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
