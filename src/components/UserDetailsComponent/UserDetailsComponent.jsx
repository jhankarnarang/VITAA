import React, { useContext,useState } from 'react'
import TagIcon from '@mui/icons-material/Tag'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School'
import ClassIcon from '@mui/icons-material/Class'
import EmailIcon from '@mui/icons-material/Email';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BadgeIcon from '@mui/icons-material/Badge'
import CakeIcon from '@mui/icons-material/Cake'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import SummarizeIcon from '@mui/icons-material/Summarize'
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import BlockIcon from '@mui/icons-material/Block';
import HealingIcon from '@mui/icons-material/Healing';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const UserDetailsComponent = ({userDetails})=>{
    const { user } = useContext(AuthContext)
    const [userBanned,setUserBanned] = useState(userDetails.banned)
    let navigate = useNavigate()
    const [errorMsg,setErrorMsg] = useState()
    const toggleBan =async()=>{
        setErrorMsg("")
        let performAction
        if(!userDetails.banned)
            performAction = window.confirm('Do you really want to ban this user? Doing so will prohibit them from logging-in')
        else
            performAction = window.confirm('Do you really want to un-ban this user? Doing so will allow them to login again.');
        if(performAction){
            try{
                const response = await axios.put(`http://localhost:5000/users/${userDetails._id}/toggleBan`,{adminId:user._id})
                setUserBanned(!userBanned)
            }catch(error){
                console.log(error)
                if(error.response) setErrorMsg(error.response.data.error)
                else setErrorMsg("Failed to communicate with server")
            }
        }
    }
    const deleteUser = async()=>{
        setErrorMsg("")
        let performAction = window.confirm("Do you really want to delete this user from the portal? This action CANNOT be undone.")
        if(performAction){
            try{
                const response = axios.delete(`http://localhost:5000/users/${userDetails._id}/delete`,{adminId:user._id})
                navigate('/admin-dash/users')
            }catch(error){
                console.log(error)
                if(error.response) setErrorMsg(error.response.data.error)
                else setErrorMsg("Failed to communicate with server")
            }
        }
    }
    return(
        <div className="user-details">
                <div className="main-content">
                    <div className="left-pane">
                        <div className="academic-card">
                            <div className='card-heading'>
                                <SummarizeIcon /> Academic Summary
                            </div>
                            <div className='card-content'>
                                <div><TagIcon/> PID: EU{ userDetails.pid }</div>
                                <div><SchoolIcon/> Course: { userDetails.course }</div>
                                <div><ClassIcon /> Branch: { userDetails.branch ? userDetails.branch : 'N/A' }</div>
                                <div><TimelineIcon /> {userDetails.courseEndYear?`Duration: ${new Date(userDetails.courseJoinYear).getFullYear()}-${new Date(userDetails.courseEndYear).getFullYear()}`:`Joined: ${new Date(userDetails.courseJoinYear).getFullYear()}`}</div>
                                <div><AccountBalanceIcon /> Institute: St. John College of Engineering and Management</div>
                            </div>
                        </div>
                        <div className="contact-card">
                            <div className='card-heading'>
                                <ContactsIcon /> Contact Information
                            </div>
                            <div className='card-content'>
                                <div><EmailIcon /> { userDetails.email ? userDetails.email : 'N/A' }</div>
                                <div><PhoneIcon/> { userDetails.mobile ? `+91 ${userDetails.mobile}` : 'N/A'}</div>
                                <div><LocationOnIcon/> { userDetails.address ? userDetails.address : 'N/A'}</div>
                            </div>
                           
                        </div>
                        <div className="misc-card">
                            <div className="card-heading">
                                <InfoIcon /> Other Information
                            </div>
                            <div className='card-content'>
                                <div><i><AlternateEmailIcon />{userDetails.username}</i></div>
                                <div><CakeIcon /> {userDetails.birthdate ? userDetails.birthdate : 'N/A'}</div>
                                <div>{userDetails.gender==1?<MaleIcon />:<FemaleIcon />} {userDetails.gender==1?'Male':'Female'}</div>
                                <div><BadgeIcon/> {userDetails.role==1?'Alumni':'Student'}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="profile-pane">
                        <div className="profile-img">
                            <img src={userDetails.profilePicture ? `${userDetails.profilePicture}` : 'http://localhost:3000/assets/images/alt-no-avatar.svg'} />
                        </div>
                        <div className="profile-pane-text">
                            <div className="applicant-name">
                                <h2>{userDetails.firstName} {userDetails.lastName}</h2>
                            </div>
                            <div className="errorMsg">
                                {errorMsg}
                            </div>
                            <div className="action-controls">
                                {userBanned ? <button class="btn btn-green" onClick={toggleBan}><HealingIcon/>Unban</button>
                                    :
                                    <button class="btn btn-danger" onClick={toggleBan}><BlockIcon/>Ban</button>
                                }
                                <button class="btn btn-danger" onClick={deleteUser}><RemoveCircleOutlineIcon />Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default UserDetailsComponent