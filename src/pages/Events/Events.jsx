import React, { useState, useEffect, useContext } from 'react'
import './Events.css'
// import { events } from '../../dummyData';
import Event from '../../components/Event/Event';
import Categories from '../../components/Categories/Categories';
import axios from 'axios';
// import Spinner from '../../components/Spinner/Spinner';
import SkeletonLoading from '../../components/SkeletonLoading/SkeletonLoading';
import AddEvent from '../../components/AddEvent/AddEvent';
import { Box, Button, Modal } from '@mui/material';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Events = () => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useContext(AuthContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 1,
    };

    useEffect(() => {

        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/events/all');
            const data = await response.data;
            // const response = await axios.get('http://127.0.0.1:5000/events/all');
            // const  data = await response.data;
            console.log(data);
            setEvents(data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (eventId) => {
        // console.log(eventId);
        console.log(user._id)
        try {
            await axios.delete(`http://localhost:5000/events/${eventId}`, { data: { userId: user._id, userType: user.userType } })
            await fetchEvents();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <>
            {/* <PageTitle /> */}
            <div className='events'>

                <div className="event-categories-container">
                    <Categories />
                </div>
                <div className="events-container">
                    {
                        user.userType === 2 || user.userType === 3
                            ? (
                                <div className="post-event">
                                    <Link to="/addEvent">
                                        <button className='btn btn-primary add-event-btn'>+ Add Event</button>
                                    </Link>
                                </div>
                            )
                            : ''
                }
                    {loading

                        ? events.map(event => (
                            <Event
                                key={event._id}
                                eventId={event._id}
                                title={event.title}
                                desc={event.desc}
                                eventImage={event.eventImage}
                                postDate={event.createdAt}
                                scheduleDate={event.scheduleDate}
                                userId={event.userId}
                                venue={event.address}
                                handleDelete={handleDelete} />
                        ))
                        : (
                            <>
                                <SkeletonLoading />
                                <SkeletonLoading />
                                <SkeletonLoading />
                            </>
                        )}
                </div>
            </div>
        </>
    )
}

export default Events
