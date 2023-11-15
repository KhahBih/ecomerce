import React, { useState } from "react";
import {auth} from '../../firebase';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { sendSignInLinkToEmail } from 'firebase/auth';
// import "react-toastify/dist/react-toastify.css"

const Register = () =>{
    const [email, setEmail] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const config = {
            url: 'http://localhost:3000/register/complete',
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
        setEmail("")
    }

    const registerForm = () => 
    <form onSubmit={handleSubmit}>
        <input autoFocus type="email" value={email} className='form-control' onChange={e => {setEmail(e.target.value)}}></input>
        <button style={{margin: '10px 0 0 0'}} type="submit" class="btn btn-outline-secondary">Register</button>
    </form>
    // console.log(email);
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
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
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register;