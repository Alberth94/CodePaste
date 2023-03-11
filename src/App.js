import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import SignUp from "./User/SignUp";
import Login from "./User/Login";
import AddPaste from "./Pastes/AddPaste";
import AllPastes from "./Pastes/AllPastes";
import Home from "./Home/Home";
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