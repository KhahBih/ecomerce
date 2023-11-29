import React, { useState, useEffect } from "react";
import {auth, googleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { sendSignInLinkToEmail, signInWithEmailAndPassword, getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail} from 'firebase/auth';
import { Button } from "antd";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        if(user && user.token){
            window.history.pushState({}, undefined, "/")
            window.location.reload()
        } 
    }, [user])

    const config = {
        url: `http://localhost:3000/login`,
        handleCodeInApp: true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const auth = getAuth()
            await sendPasswordResetEmail(auth, email, config)
            .then(() => {
                setEmail('')
                toast.success('Check ur email 4 password reset link')
            })
            .catch((error) => {
                if(email === "" && error.code === "auth/missing-email"){
                    toast.error("Hãy nhập email")
                }
                if(email && error.code === "auth/missing-email"){
                    toast.error("Email không tồn tại")
                }
            })
    }

    return(
        <div className="container col-md-6 offset-md-3 p-5">
            <h4>Forgot password</h4>
            <form>
                <input autoFocus type="email" value={email} className='form-control' onChange={e => {setEmail(e.target.value)}} 
                placeholder="Nhập email" style={{margin: '10px 0'}}></input>
                <Button className="btn btn-raised" type="primary" block size="large"  onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    )
}
export default ForgotPassword;