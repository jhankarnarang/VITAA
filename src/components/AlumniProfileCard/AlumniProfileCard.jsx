import React, { useContext, useState } from 'react'
import './AlumniProfileCard.css';
import EmailIcon from '@mui/icons-material/Email';
import { Tooltip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AlumniProfileCard = ({ id, firstName, lastName, course, branch, desc, profilePicture }) => {
    const { user } = useContext(AuthContext);

    const [following, setFollowing] = useState(user.followings.includes(id));
    const [loading, setLoading] = useState(false);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const defaultSrc = 'https://res.cloudinary.com/dyyw5veqq/image/upload/v1649517324/AlumniPortal/post1_qvb5wq.jpg';


    const handleFollow = async () => {
        try {
            setLoading(true)
            await axios.put(`http://localhost:5000/users/${id}/follow`, { userId: user._id })
            setFollowing(!following)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const handleUnfollow = async () => {
        try {
            setLoading(true)
            await axios.put(`http://localhost:5000/users/${id}/unfollow`, { userId: user._id })
            setFollowing(!following)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="alumni-profile">
            <div className="alumni-profile-image">
                {profilePicture === '' ?(
                            <img src={`${defaultSrc}`} alt="" className="story-image" />
                        ) : (
                            <img src={`${profilePicture}`} alt="" className="story-image" />
                        )}
                <Tooltip title="message-alumni">
                    <button className="msg-button" >
                        <EmailIcon />
                    </button>
                </Tooltip>
            </div>
            <div className="alumni-profile-text">
                <div className="alumni-name">
                    <Link to={`/profile/${id}`}>
                        <span>{firstName} {lastName}</span>
                    </Link>


                    <span className='alumni-course'>{course}, {branch}</span>
                </div>

                <p className='alumni-description'>{desc || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus possimus inventore quidem 
`}</p>
            </div>

            {
                following
                    ? (<button className="add-button btn btn-green" onClick={handleUnfollow} >
                        <DoneIcon className='icon' />
                        <span>{loading ? 'loading' : 'Following'}</span>
                    </button>)
                    : (<button className="add-button btn btn-primary-light" onClick={handleFollow}>
                        {loading ? 'loading' : '+ Add to Network'}
                    </button>)
            }
        </div>
    )
}

export default AlumniProfileCard
