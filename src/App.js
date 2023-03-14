import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import SignUp from "./User/SignUp";
import Login from "./User/Login";
import Add from "./Paste/Add";
import List from "./Paste/List";
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
          <Route path="list" element={<List userOn={userOn} />}></Route>
          <Route path="add" element={<Add userOn={userOn} />}></Route>
          <Route path="/login" element={<Login setUserOn={setUserOn} />} />
          <Route path="/signup" element={<SignUp setUserOn={setUserOn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;