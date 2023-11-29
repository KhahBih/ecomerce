import React, { useState } from "react";
import {auth} from '../../firebase';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import "react-toastify/dist/react-toastify.css"

const RegisterComplete = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()

        let acc = await createUserWithEmailAndPassword(auth, a,password, username )
            .then(() => {
                toast.success(`Your registration is complete`)
                window.localStorage.removeItem('emailForRegistration', email)
                updateProfile(acc.user,{
                    displayName: username
                })
                window.location.reload()
            })
            .catch((error) => {
                console.error(error);
            });
        window.history.pushState({}, undefined, "/")
    }
    let a = window.localStorage.getItem('emailForRegistration', email)
    let username = window.localStorage.getItem('userNameForRegistration', userName)

    const completeRegisterForm = () => 
    <form onSubmit={handleSubmit}>
        <input autoFocus type="email" value={a} className='form-control' onChange={e => {setEmail(e.target.value)}} disabled title="" placeholder=""></input>
        <input type="password" value={password} className='form-control' onChange={e => {setPassword(e.target.value)}} title="" placeholder="Nhập mật khẩu"></input>
        <input value={userName} className='form-control' onChange={e => {setUserName(e.target.value)}} title="" placeholder="Nhập tên tài khoản"></input>
        <button style={{margin: '10px 0 0 0'}} type="submit" class="btn btn-outline-secondary">Register</button>
    </form>
    // console.log(email);
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {completeRegisterForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;