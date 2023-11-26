import React, { useState } from "react";
import {auth, googleAuthProvider} from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { sendSignInLinkToEmail, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const provider = new GoogleAuthProvider();
    let dispatch = useDispatch()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: user.accessToken
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