import React from "react";
import {useState} from "react"
import axios from "axios";
import {Link} from "react-router-dom"
import "../styles/login.css"

function SignUp(){
    const [newUser, setNewUser] = useState({
        username: "",
        password: ""
    })

    const [exists, setExists] = useState("")

    function onChangeUsername(e){
        setNewUser({
            ...newUser,
            username: e.target.value
        })
    }

    function onChangePassword(e){
        setNewUser({
            ...newUser,
            password: e.target.value
        })
    }

    function signUp(){
        const params = {
            service: "User",
            method: "PUT",
            payload: newUser
        }
        axios.put(process.env.REACT_APP_APIGW_URI, params)
        .then(res => {
            console.log(res.data.body); 
            if(res.data.body === null){
                setExists("User exists")
            }
            else window.location.assign("http://localhost:3000/");
        })
        .catch(err => 
            console.log(err)
        )
    }

    return (
        <div className="background">
            <div className="login">
                <h1 className="components">Job Tracker</h1>
                <h4>Sign up to continue</h4>
                <div className="components"><input onChange={onChangeUsername} type="text"></input><br></br></div>
                <div className="components bottom"><input onChange={onChangePassword} type="text"></input><br></br></div>
                <div className="button-format">
                    <button onClick={signUp}>Sign up
                    <div className="arrow-wrapper"><div className="arrow"></div>
                    </div>
                </button>
                </div>
                <div className="link"><Link to="/" className="link">Back</Link></div>
                <div className="components bottom">{exists}</div>
            </div>
        </div>
    )
}

export default SignUp;