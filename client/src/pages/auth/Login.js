import React, { useState, useEffect } from "react";
import {auth, googleAuthProvider} from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { sendSignInLinkToEmail, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user} = useSelector((state) => ({...state}))
    const provider = new GoogleAuthProvider();
    let dispatch = useDispatch()

    useEffect(() => {
        if(user && user.token){
            window.history.pushState({}, undefined, "/")
            window.location.reload()
        } 
    }, [user])


    const handleSubmit = async (e)=>{
        e.preventDefault()
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: user.accessToken,
                    userName: user.displayName
                }
            })
            window.location.reload()
        })
        .catch((error) => {
            console.log(error)
            if (error.code === "auth/invalid-login-credentials") {
                toast.error("Sai tên tài khoản hoặc mật khẩu");
            }
        });
        window.history.pushState({}, undefined, "/")
    }

    const googleLogin = async (e) => {
        const auth = getAuth()
        const result = signInWithPopup(auth, provider)
        .then(async (result) => {
            // console.log(result);
            const {user} = result;
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: user.accessToken
                }
            })
            window.location.reload()
        })
        .catch((error)=> {

        })
        window.history.pushState({}, undefined, "/")
    }  

    const loginForm = () => 
    <form>
        <input autoFocus type="email" value={email} className='form-control' onChange={e => {setEmail(e.target.value)}} placeholder="Nhập email" style={{margin: '10px 0'}}></input>
        <input type="password" value={password} className='form-control' onChange={e => {setPassword(e.target.value)}} placeholder="Nhập mật khẩu"style={{margin: '10px 0'}}></input>
        <Button
        onClick={handleSubmit}
        type="primary"
        className='mb-3' 
        block 
        shape='round'
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}>Đăng nhập bằng Email</Button>

        <Button
        onClick={googleLogin}
        type="primary"
        danger
        className='mb-3' 
        block 
        shape='round'
        icon={<GoogleOutlined />}
        size="large">Đăng nhập bằng Gmail</Button>

        <Link to="/forgot/password" className="float-end text-danger">Quên mật khẩu</Link>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

export default Login;