import React, { useState } from "react";
import {auth} from '../../firebase';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import "react-toastify/dist/react-toastify.css"

const Register = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success(`Your registration is complete`)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const completeRegisterForm = () => 
    <form onSubmit={handleSubmit}>
        <input autoFocus type="email" value={email} className='form-control' onChange={e => {setEmail(e.target.value)}} disabled></input>
        <input type="password" value={password} className='form-control' onChange={e => {setPassword(e.target.value)}}></input>
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

export default Register;