import React, { useContext, useState, useEffect } from 'react'
import './Story.css';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Users } from '../../dummyData';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { format } from 'timeago.js';

const Story = ({ id, title, desc, storyImage, createdAt, userId }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const defaultSrc = 'https://res.cloudinary.com/dyyw5veqq/image/upload/v1649517324/AlumniPortal/post1_qvb5wq.jpg';
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users?userId=${userId}`);
                const data = await response.data;
                // console.log(data);
                setUserDetails(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="story">
            <div className="story-top">
                <div className="story-top-left">
                    <Link to={`/profile/${userId}`}>
                        <img src={`${userDetails.profilePicture}`} alt="" className='event-profile-image' />
                    </Link>
                    <span className='story-username'>{userDetails.firstName} {userDetails.lastName}<span className='user-type'>| Alumni</span></span>
                </div>
                <div className="story-top-right">
                    <span className="post-date">{format(createdAt)}</span>
                </div>
            </div>
            <div className="story-bottom">
                {storyImage
                    ? <div className="story-image-container">
                        {storyImage === '' ?(
                            <img src={`${defaultSrc}`} alt="" className="story-image" />
                        ) : (
                            <img src={`${storyImage}`} alt="" className="story-image" />
                        )}
                    </div>
                    : ''}
                <div className="story-info">
                    <Link to={`/storyDetails/${id}`} className="story-title">
                        {title}
                    </Link>
                    <p className='story-description'>
                        
                        {desc}
                    </p>
                    
                    
                    {/* <button className='btn register-btn'>Register</button> */}
                </div>
            </div>
        </div>
    )
}

export default Story
