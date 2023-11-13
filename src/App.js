import React from "react";
import {createBrowserRouter, Router, Routes, Route, RouterProvider} from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/auth/Home";
import Header from "./pages/components/nav/Header";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/login" element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
