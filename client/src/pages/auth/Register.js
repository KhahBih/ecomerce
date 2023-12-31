import React, { useState } from "react";
import {auth} from '../../firebase';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { sendSignInLinkToEmail } from 'firebase/auth';

const Register = () =>{
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const config = {
            url: `http://localhost:3000/register/complete`,
            handleCodeInApp: true
        }
        // await auth.sendSignInLinkToEmail(email, config) - Outdate
        await sendSignInLinkToEmail(auth, email, config)
            .then(() => {
                toast.success(`Email is ${email}. Click the link to complete the registration`)
            })
            .catch((error) => {
                console.error(error);
            });
        // Save email in local storage
        window.localStorage.setItem('emailForRegistration', email)
        window.localStorage.setItem('userNameForRegistration', userName)
    }

    const registerForm = () => 
    <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="Email plz :>>" type="email" value={email} className='form-control' onChange={e => {setEmail(e.target.value)}}></input>
        <input placeholder="Tên tk" value={userName} className='form-control' onChange={e => {setUserName(e.target.value)}}></input>
        <button style={{margin: '10px 0 0 0'}} type="submit" class="btn btn-outline-secondary">Register</button>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register;