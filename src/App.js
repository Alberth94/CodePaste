import React, { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import SignUp from "./Components/NavBar/User/SignUp";
import Login from "./Components/NavBar/User/Login";
import AddPaste from "./Components/NavBar/Pastes/AddPaste";
import AllPastes from "./Components/NavBar/Pastes/AllPastes";
import Home from "./Components/NavBar/Home";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [userOn, setUserOn] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <NavBar userOn={userOn} setUserOn={setUserOn} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="allpastes" element={<AllPastes userOn={userOn} />}></Route>
          <Route path="addpaste" element={<AddPaste userOn={userOn} />}></Route>
          <Route path="/login" element={<Login setUserOn={setUserOn} />} />
          <Route path="/signup" element={<SignUp setUserOn={setUserOn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;