import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import SingUp from "./NavBar/SingUp";
import Login from "./NavBar/Login";
import AddPost from "./NavBar/AddPost";
import AllPosts from "./NavBar/AllPosts";
import Home from "./NavBar/Home";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [userOn, setUserOn] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <NavBar userOn={userOn} setUserOn={setUserOn} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="allposts" element={<AllPosts userOn={userOn} />}></Route>
          <Route path="addpost" element={<AddPost userOn={userOn} />}></Route>
          <Route path="/login" element={<Login setUserOn={setUserOn} />} />
          <Route path="/singup" element={<SingUp setUserOn={setUserOn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;