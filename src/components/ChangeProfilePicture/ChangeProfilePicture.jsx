import React, { useContext, useState } from 'react'
import './ChangeProfilePicture.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Success from '../Success/Success';


const ChangeProfilePicture = ({setOpen}) => {
    const {user} = useContext(AuthContext);
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess]  =useState(false);

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
        const newProfilePicture = {
            userId: user._id,
        }
        if (previewSource) {
            setLoading(true);
            const res = await uploadImage(previewSource)
            newProfilePicture.profilePicture = await res.data.url;
        }
        try {
            const res = await axios.put(`http://localhost:5000/users/${user._id}`, newProfilePicture);
            setLoading(false);
            // setOpen(false);
            console.log(res);
            setSuccess(true);
            
            // window.location.reload();
            localStorage.setItem('user_profilePicture', res.data.profilePicture);
            user.profilePicture = res.data.profilePicture;
            // navigate("/events");

        } catch (error) {
            // error.response.data  && console.log(error.response.data);
            setErrorMsg("error");
        }
    }
    const uploadImage = async (base64EncodedImage, newEvent) => {
        console.log(base64EncodedImage);
        try {
            const res = await axios.post('http://localhost:5000/upload', {data: base64EncodedImage});
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    if(success){
        return(
            <Success setOpen={setOpen} />
        )
    }
    return (
        <div>
            Update Profile Picture
            <form action="" onSubmit={handleSubmit}>
                <div className='file-container'>
                    <label htmlFor="file" className='file'>
                        {/* <AddAPhotoIcon className='icon' /> */}
                        <span > + Upload Image</span>
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
                <div className='btn-container'>
                    <button className='btn btn-primary'>{
                        loading ? 'Saving..' : 'Save'
                    }</button>
                </div>
            </form>
        </div>
    )
}

export default ChangeProfilePicture