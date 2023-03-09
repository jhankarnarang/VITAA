import React from 'react'
import {useState,useRef,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Phone=({ page,setPage,formData,setFormData })=>{
    const [retrySend,setretrySend] = useState(false) //Value of this prop has no real significance. We just change the value everytime we need to re-run the sendSMS effect
    const [errorMsg,setErrorMsg] = useState(null)
    const [message,setMessage] = useState("Loading...")
    const [phone, setPhone] = useState("")
    const otp  = useRef()

    const sendSMS=useEffect(async()=>{
        try {
            setErrorMsg("")
            setPhone("")//Sadly updating a state value won't be reflected until we escape this function, so we display the value of phone state outside this effect.
            //since the user either came here directly from step 0 or had to go through step 1,we'll pass data depending upon which route the user took to get till here:
            const response= await axios.post('http://127.0.0.1:5000/auth/sendSMS',formData.mobile?{mobile: formData.mobile}:{pid: formData.pid})
            setPhone(`+91 ${response.data.mobile}`)
            setMessage(`Enter the 6-digit verification code sent to `)
        } catch (error) {
            setMessage(()=>{return(<>Failed to send SMS. <Link to='#' onClick={()=>{setretrySend(!retrySend)}}>Retry?</Link></>)})
            if(error.response){
                setErrorMsg(error.response.error)
            }
            else setErrorMsg('Failed to connect to the server')
        }
        
    },[retrySend])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const otpregexp = /^[0-9]{6}$/
        console.log("Nice")
        if(otpregexp.test(otp.current.value)){
            try{
                //This is the final step, so along with the OTP,send other details(uname,password) for the registration process to complete:
                const userData = {...formData,otp:otp.current.value}
                const response = await axios.post('http://127.0.0.1:5000/auth/verifyOTP',userData)
                //Move on to the success page:
                setPage(4)
            }catch(error){
                if (error.response){
                    console.log(error.response.data)
                    const err_text=error.response.data.error
                    setErrorMsg(err_text)
                }
                else setErrorMsg('Failed to connect to the server')
            }
        }else setErrorMsg('Invalid OTP')
    }

    return(
        <>
            <div className="phone-verification">
                <label htmlFor='phone-verification'>{message}{phone}</label>
                <input type="password" maxLength='6' name="phone-verification" ref={otp} id="phone-verification"/>
            </div>
            <label htmlFor="form" id="error">{errorMsg}</label>
            <Link to='#' onClick={()=>{setretrySend(!retrySend)}}>Retry?</Link>
            <div className="button-container" onClick={handleSubmit}>
                <button type="submit" className="btn btn-primary" id="submit">Verify</button>
            </div>
        </>
    )
}
export default Phone