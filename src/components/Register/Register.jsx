import React, { useState} from 'react';
import './Register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Initial from './Initial'
import PID from './PID'
import Email from './Email'
import Phone from './Phone'
import Success from './Success'
const Register = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [page, setPage]=useState(0)
    const [formData, setFormData]= useState({})
    const FormTitles=['Sign Up','Choose a Verification Method','Email Verification','Phone Verification','Registered Successfully!']
    const pageDisplay=()=>{
        switch(page){
            case 1: return <PID page={page} setPage={setPage} formData={formData} setFormData={setFormData} />
            case 2: return <Email page={page} setPage={setPage} formData={formData} setFormData={setFormData} />
            case 3: return <Phone page={page} setPage={setPage} formData={formData} setFormData={setFormData} />
            case 4: return <Success />
            default: return <Initial page={page} setPage={setPage} formData={formData} setFormData={setFormData}/>
        }
    }
    return (
        <div className="register">
            <div className="sign-up">
                <div className="side-img">
                    <img src={`${PF}register.svg`} alt="" className='image1' />
                    <p>Already signed up?&nbsp;
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </div>
                <div className="form-div">
                    <h2>{FormTitles[page]}</h2>
                    <form className="form" id="form">
                        { pageDisplay() }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
