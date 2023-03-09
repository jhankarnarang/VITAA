import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import TagIcon from '@mui/icons-material/Tag';
import ClassIcon from '@mui/icons-material/Class';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BadgeIcon from '@mui/icons-material/Badge'
const UserCard=({userId,pid,firstName,lastName,course,branch,role,joinYear,endYear,profilePicture})=>{
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className="applicant-card">
            <div className="applicant-profile-image">
                <img src={profilePicture ? `${profilePicture}` : 'http://localhost:3000/assets/images/alt-no-avatar.svg'} alt="" />
            </div>
            <div className="applicant-details">
                <div className="applicant-name">
                    <h3>{firstName} {lastName}</h3>
                </div>
                <p className='applicant-data'>
                    <ul>
                        <li><TagIcon/> PID: {pid}</li>
                        <li><SchoolIcon /> Course: {course}</li>
                        <li><ClassIcon /> Branch: {branch}</li>
                        <li><BadgeIcon /> Role: {role===1?'Student':'Alumni'}</li>
                        <li><TimelineIcon /> {endYear?`Duration: ${new Date(joinYear).getFullYear()}-${new Date(endYear).getFullYear()}`:`Joined: ${new Date(joinYear).getFullYear()}`}</li>
                    </ul>
                </p>
            </div>
            <Link to={`/admin-dash/users/${userId}`} className="appn-link">
                <button className="view-button btn btn-primary-light">
                    <RemoveRedEyeIcon className='icon' />
                    View User
                </button>
            </Link>
        </div>
    )
}
export default UserCard