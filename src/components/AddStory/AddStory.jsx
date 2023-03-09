import React, { useState, useRef, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

import "./AddStory.css"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';


const AddStory = ({ setOpen }) => {
    const title = useRef();
    const description = useRef();
    const scheduleDate = useRef();
    const address = useRef();
    const [errorMsg, setErrorMsg] = useState("");
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext)
    let navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        const newStory = {
            userId: user._id,
            title: title.current.value,
            desc: description.current.value,
            eventImage: '',
        }
        if (previewSource) {
            setLoading(true);
            const res = await uploadImage(previewSource, newStory)
            // const data = new FormData();
            // const fileName = file.name;
            // data.append('file', file);
            // data.append('name', fileName);
            newStory.storyImage = await res.data.url;
        }
        try {
            const response = await axios.post('http://localhost:5000/stories/new', newStory);
            setLoading(false);
            // setOpen(false);
            console.log(response);
            // window.location.reload();
            navigate('/stories')

        } catch (error) {
            setLoading(false)
            // error.response.data  && console.log(error.response.data);
            setErrorMsg("error");
        }
    }

    const uploadImage = async (base64EncodedImage, newStory) => {
        console.log(base64EncodedImage);
        try {
            const res = await axios.post('http://localhost:5000/upload', {data: base64EncodedImage});
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='add-event-container'>
            <form action="" onSubmit={handleSubmit} className='addEvent'>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' ref={title} placeholder="add story title" required />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" ref={description} placeholder="markdown is supported" required></textarea>
                </div>
                <div className='file-container'>
                    <label htmlFor="file" className='file'>
                        <AddAPhotoIcon className='icon' />
                        <span>Image</span>
                        <input type="file"
                            value={fileInputState}
                            id="file" name="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} />
                    </label>
                </div>
                {previewSource && (
                    <div className="shareImageContainer">
                        <img src={previewSource} alt="" className="shareImage" />
                        <button className="shareCancelImage" onClick={() => setPreviewSource('')}>
                            <CloseIcon />
                        </button>
                    </div>
                )}
                <button type='submit' className='btn btn-primary post-btn'>{
                    loading ? 'Posting...' : 'Post'
                }</button>
            </form>
        </div>
    )
}

export default AddStory