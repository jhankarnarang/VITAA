import axios from 'axios'
import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { Link } from 'react-router-dom' 
const PID=({page,setPage,formData,setFormData})=>{
    const [retryFetch,setretryFetch] = useState(false)//Value of this prop has no real significance. We just change the value everytime we need to re-run the fetchMethods effect
    const [errorMsg,setErrorMsg] = useState("")
    const [email,setEmail] = useState("")
    const [mobile,setMobile] = useState("")

    //fetches verification methods available for the user
    const fetchMethods=useEffect(async()=>{
        try{
            setErrorMsg("")
            setEmail("")
            setMobile("")
            const methods= []
            const response = await axios.post('http://127.0.0.1:5000/auth/fetchMethods',{pid:'1192045'})
            if(response.data.email){
                setEmail(response.data.email)
            }
            if(response.data.mobile){
                setMobile(response.data.mobile)
            }
        }catch(error){
            console.log(error)
            if(error.response){
                console.log(error.response.data)
                const err_text=error.response.data.error
                setErrorMsg(()=>{return <>${err_text}. <Link to='#' onClick={()=>setretryFetch(!retryFetch)}>Retry?</Link></>})
            }
            else setErrorMsg(()=>{return <>Failed to connect to the server. <Link to='#' onClick={()=>setretryFetch(!retryFetch)}>Retry?</Link></>})
        }
    },[retryFetch])

    return(
        <>
            <div className="verification-selection">
                <label>Choose a way to verify your identity:</label>
                {email?<div className="verification-option" onClick={()=>setPage(2)}>
                    <p>
                        Send an Email to:
                        <div id="uniqueID">{email}</div>
                    </p>
                </div>:''}
                {mobile?<div className="verification-option" onClick={()=>setPage(3)}>
                    <p>
                        Send a SMS to:
                        <div id="uniqueID">+91 {mobile}</div>
                    </p>
                </div>:''}
            </div>
            <label htmlFor="form" id="error">{errorMsg}</label>
        </>
    )
}
export default PID