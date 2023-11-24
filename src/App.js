import React, {useEffect} from "react";
import {createBrowserRouter, Router, Routes, Route, RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/auth/Home";
import Header from "./pages/components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if(user){
          const idTokenResult = await user.getIdTokenResult()
          console.log("user",user);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: user.email,
              token: idTokenResult.token
            }
        })
      }
    })
    return () => unsubscribe()
  },[])
  
  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register/complete" element={<RegisterComplete />}/>
      </Routes>
    </>
  );
}

export default App;
