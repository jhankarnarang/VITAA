import React, {useState, useEffect} from 'react'
import './EventDetails.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { events } from '../../dummyData';
import { useParams } from 'react-router';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router';

const EventDetails = () => {
    const {eventId} = useParams();
    const [event, setEvent] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    let navigate = useNavigate();

    const [userId, setuserId] = useState('');
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
      const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/events?eventId=${eventId}`);
                const data = await response.data;
                console.log(data);
                setEvent(data);
                setuserId(event.userId)
            } catch (error) {
                navigate('/pageNotFound')
                console.log(error)
            }
      }
      fetchEvent();
      fetchuserDetails();
    }, []);

    const fetchuserDetails = async () => {
        try {
            // console.log(userId)
            const res = await axios.get(`http://localhost:5000/users?userId=${userId}`)
            const data = res.data;
            console.log(data)
            setUserDetails(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="event-details">
            <div className="event-detail-top">
                <div className="event-detail-top-text">
                    <h2 className='event-title'>{event.title}</h2>
                    <div className="event-detail-top-values">
                        <div>
                            <EventIcon className='icon' />
                            <span> Saturday, Feb 08, 2020 </span>
                        </div>
                        <div>
                            <PersonIcon className='icon' />
                            <span>Dishant Tare</span>
                        </div>
                        <div>
                            <VisibilityIcon className='icon' />
                            <span>788</span>
                        </div>
                    </div>
                </div>

            </div>


            <div className="event-detail-bottom">
                <div className="event-detail-bottom-left">
                    <div className="event-detail-image-container">
                        <img src={`${event.eventImage}`} alt="" className='event-detail-image' />
                    </div>
                    <div className="event-detail-text-container">
                        <div className="scheduled-date">
                            <h4> Date and Time </h4>
                            <span> Start: Sat,Feb 23,2021 </span>
                        </div>
                        <div className="event-status">
                            <span className="event-status-value">Past Event</span>
                        </div>
                        <div className="share">
                            <span>SHARE:</span>
                            <button className='share-btn'><TwitterIcon className='icon' /></button>
                            <button className='share-btn'><WhatsAppIcon className='icon' /></button>
                        </div>
                        <div className="event-register">
                            <button className="btn btn-green register-btn ">REGISTER</button>
                        </div>
                    </div>
                </div>
                
                <div className="event-detail-bottom-right">
                    <div className="event-detail-right-address">
                        <span className="event-detail-address">
                            <LocationOnIcon className='icon' />
                            <h4>ADDRESS</h4>
                        </span>
                        <span className="event-address-value">
                            St, John College of Engineering and Management, Palghar - Manor Rd, near Shakti Udyog, Industrial Area, Vevoor,
                            Palghar, Maharashtra 401404
                        </span>
                    </div>

                    <div className="event-detail-right-description">
                        <span className="event-description">
                            <DescriptionIcon className='icon' />
                            <h4>DESCRIPTION</h4>
                        </span>
                        <p className="event-description-value">
                        <MDEditor.Markdown source={event.desc} />
                        </p>
                    </div>

                    <div className="event-detail-right-comments">
                        <span className="event-comments">
                            <span className="icon">
                                <i className="fas fa-comments"></i>
                            </span>COMMENTS</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetails
