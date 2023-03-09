import React,{useState} from 'react'
import { useRef } from 'react';
import axios from 'axios';
const Initial=({ page, setPage, formData, setFormData })=>{
    const [errorMsg, setErrorMsg] = useState("");
    const [verifyPID, setVerifyPID] = useState(false);
    const phone_email  = useRef();
    const pid = useRef();
    const username = useRef();
    const password = useRef();
    const repeat_password = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        const findUser={}
        var nextPage = 0 //Depending upon what user enters(PID/Mobile no /Email) we need to advance to the appropriate page
        //Validate the fields:
        const uname_regexp = /^[a-z0-9_-]{3,25}$/ig
        const passwd_regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~#?.+!@$%^&*-]).{8,}$/
        const email_regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //const phone_regexp = /^[\+][0-9]{3}?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        //The advanced version of phone_regexp which also accepts country codes has been temporarily disabled
        const phone_regexp = /^[0-9]{10}$/
        const pid_regexp= /^[0-9]{7}$/
        if(username.current.value){
            if(!uname_regexp.test(username.current.value)){
                setErrorMsg("Username should only have alphabets,numbers, underscores and hyphens and should be 3-25 characters long")
                return
            }
        }
        else{
            setErrorMsg("Username is empty!")
            return
        }
        if(password.current.value){
            if(passwd_regexp.test(password.current.value)){
                if(password.current.value!=repeat_password.current.value){
                    setErrorMsg("Passwords do not match")
                    return
                }
            }else{
                setErrorMsg("Password should be at least 8 characters long,with upper and lowercase alphabets,numbers and special characters")
                return
            }   
        }else{
            setErrorMsg("Password is empty!")
            return
        }
        //validation of identifying fields:
        if(verifyPID){
            if(pid_regexp.test(pid.current.value)){
                findUser.pid = pid.current.value
                nextPage = 1
            }
            else{
                setErrorMsg("Invalid PID")
                return
            }
        }
        else if(email_regexp.test(phone_email.current.value.toLowerCase())){
            findUser.email = phone_email.current.value
            nextPage = 2
        }
        else if(phone_regexp.test(phone_email.current.value)){
            findUser.mobile = phone_email.current.value
            nextPage = 3
        }
        else{
            setErrorMsg("Invalid Phone/Email")
            return
        }
        //Add the remaining fields to the object:
        findUser.username = username.current.value
        findUser.password = password.current.value
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/find', findUser);
            //TODO: REMOVE DEBUG OUTPUT
            console.log(response);
            setFormData(findUser)
            setPage(nextPage)
            
        } catch (error) {
            if (error.response){
                console.log(error.response.data);
                const err_text=error.response.data.error
                setErrorMsg(err_text);
            }
            else setErrorMsg('Failed to connect to the server')
        }
    }

    return (
            <>
                        {verifyPID ?
                        <div className="PID">
                        <label htmlFor="PID">PID</label>
                        <input name="PID" id="PID" ref={pid} placeholder="eg. 1192066"/>
                        </div>
                        :
                        <div className="phone_email">
                            <label htmlFor="phone_email">Email or Phone</label>
                            <input type="text" name="phone_email" id="phone_email" ref={phone_email} placeholder="Email or Phone" />
                        </div>}
                        <div className="divider">
                            <label> Can't remember the phone/email you provided to your insitute?</label>
                            Enter PID instead
                            <input type="checkbox" name="verifyPID" id="verifyPIDCheckBox" onChange={()=>{setVerifyPID(!verifyPID)}}/>
                        </div>
                        <div className='username'>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" ref={username} placeholder="eg. dishant21" />
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" ref={password} placeholder="Use a strong password" />
                        </div>
                        <div className='password'>
                            <label htmlFor="email">Confirm Password</label>
                            <input type="password" name="password2" id="password2" ref={repeat_password} placeholder="Confirm Password"/>
                        </div>
                        <label htmlFor="form" id="error">{errorMsg}</label>
                        <div className="button-container" onClick={handleSubmit}>
                                <button type="submit" className="btn btn-primary" id="submit">Next</button>
                        </div>
                        </>
    );
};    

export default Initial