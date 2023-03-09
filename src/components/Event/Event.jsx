import React, { useState, useEffect, useContext } from 'react'
import './Event.css';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { format, render, cancel, register } from 'timeago.js';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const Event = ({ eventId, title, desc, eventImage, postDate, scheduleDate, userId, venue, handleDelete }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className="event">
            <div className="event-top">
                <div className="event-top-left">
                    <Link to={`/profile/${userDetails._id}`}>
                        <img src={`${userDetails.profilePicture}`} alt="" className='event-profile-image' />
                    </Link>
                    <Link to={`/profile/${user._id}`}>
                        <span className='event-username'>{userDetails.firstName} {userDetails.lastName}</span>
                        <span className='user-type'>| {userDetails.userType === 2 ? "Alumni" : "Admin"}</span>
                    </Link>
                </div>
                <div className="event-top-right">
                    <span className="post-date">{format(postDate)}</span>
                    <button aria-describedby={id} onClick={handleClick}>
                        <MoreVertIcon />
                    </button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                        className='event-popover'
                    >
                        <ul>
                            <li>
                                {/* <RemoveRedEyeIcon className='icon' /> */}
                                view
                            </li>
                            {
                                user._id === userId || user.userType === 3
                                    ? (
                                        <li  onClick={() => handleDelete(eventId)}>
                                            {/* <DeleteIcon className='icon' /> */}
                                            delete
                                        </li>
                                    )
                                    : ('')
                            }
                        </ul>
                    </Popover>
                </div>
            </div>
            <div className="event-bottom">
                {eventImage
                    ? <div className="event-image-container">
                        <img src={`${eventImage}`} alt="" className="event-image" />
                    </div>
                    : ''}
                <div className="event-info">
                    <Link to={`/events/${eventId}`} className="event-title">
                        {title}
                    </Link>
                    <p className='event-description'>
                        {desc}
                    </p>
                    <span className='event-date'>
                        <EventIcon className='icon' />
                        <span>{scheduleDate.slice(0,10)}</span>
                    </span>
                    <span className="event-location">
                        <LocationOnIcon className='icon' />
                        <span>{venue || 'Indian Institute of Technology Indore, Khandwa Road, Simrol.-453552. , Indore'}</span>
                    </span>
                    {/* <button className='btn register-btn'>Register</button> */}
                </div>
            </div>
        </div>
    )
}

export default Event
