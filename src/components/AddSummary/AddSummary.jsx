import React, { useState, useRef, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

import "./AddSummary.css"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import Success from '../Success/Success';


const AddSummary = ({ setOpen }) => {
    const title = useRef();
    const description = useRef();
    const scheduleDate = useRef();
    const address = useRef();
    const [errorMsg, setErrorMsg] = useState("");
    const [previewSource, setPreviewSource] = useState();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess]  =useState(false);


    const { user } = useContext(AuthContext)
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        const summary = {
            userId: user._id,
            desc: description.current.value,
        }
        try {
            setLoading(true)
            const response = await axios.put(`http://localhost:5000/users/${user._id}`, summary);
            setLoading(false);
            setSuccess(true)
            // setOpen(false);
            
            console.log(response);
            // window.location.reload();
            // navigate('/events')

        } catch (error) {
            setLoading(false)
            // error.response.data  && console.log(error.response.data);
            setErrorMsg("error");
        }
    }


    if(success){
        return(
            <Success setOpen={setOpen} />
        )
    }
    return (
        <div className='add-summary-container'>
            <form action="" onSubmit={handleSubmit} className='addEvent'>
                <div>
                    <label htmlFor="description">Summary</label>
                    <textarea name="description" ref={description} placeholder="markdown is supported" required></textarea>
                </div>

                <button type='submit' className='btn btn-primary post-btn'>{
                    loading ? 'Saving...' : 'Save'
                }</button>
            </form>
        </div>
    )
}

export default AddSummary