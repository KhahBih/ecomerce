import React from "react";
import {createBrowserRouter, Router, Routes, Route, RouterProvider} from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/auth/Home";


function App() {
  // ROUTER OPTION 
  // var router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Root />,
  //   },
  // ]);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/login" element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
