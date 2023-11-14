import React, { useState } from "react";
import {auth} from '../../firebase';
import {toast, ToastContainer} from 'react-toastify'
// import "react-toastify/dist/react-toastify.css"

const Register = () =>{
    const [email, setEmail] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault()
        const config = {
            url: '',
            handleCodeInApp: true
        }
    }

    const registerForm = () => 
    <form onSubmit={handleSubmit}>
        <input autoFocus type="email" value={email} className='form-control' onChange={e => {setEmail(e.target.value)}}></input>
        <button style={{margin: '10px 0 0 0'}} type="button" class="btn btn-outline-secondary">Register</button>
    </form>
    // console.log(email);
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