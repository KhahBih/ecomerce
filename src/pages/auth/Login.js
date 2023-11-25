import React, { useState } from "react";
import {auth} from '../../firebase';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.table(email, password)
    }

    const loginForm = () => 
    <form onSubmit={handleSubmit}>
        <input autoFocus type="email" value={email} className='form-control' onChange={e => {setEmail(e.target.value)}} placeholder="Nhập email" style={{margin: '10px 0'}}></input>
        <input type="password" value={password} className='form-control' onChange={e => {setPassword(e.target.value)}} placeholder="Nhập mật khẩu"style={{margin: '10px 0'}}></input>
        <Button 
        onClick={handleSubmit} 
        // type="submit" 
        className='mb-3' 
        block 
        shape='round'
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}>Đăng nhập bằng Email</Button>
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