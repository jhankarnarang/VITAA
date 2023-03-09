import React, { useState, useEffect } from 'react'
import './Home.css'
import { carouselData, events } from '../../dummyData';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import "swiper/swiper-bundle.min.css";
import { Autoplay, Scrollbar, Pagination, Parallax, Navigation } from 'swiper';
import axios from 'axios';

const Home = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [slides, setSlides] = useState(3);
    const [space, setSpace] = useState(50)
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/events/all');
                const data = await response.data;
                // const response = await axios.get('http://127.0.0.1:5000/events/all');
                // const  data = await response.data;
                // console.log(data);
                setEvents(data);
                // setLoading(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEvents();
    }, []);

    window.onload = () => {
        if (window.innerWidth < 400) {
            setSlides(1.3);
            setSpace(20);
        }
        else if (window.innerWidth < 765) {
            setSlides(2);
            setSpace(30);
        }
        else {
            setSlides(3)
            setSpace(30);
        }
    }
    return (
        <div className='home'>
            {/* Carousel */}
            <div className='intro'>
                <div className='intro-text'>
                    <h2>Welcome to VIT Alumni Association</h2>
                    <Link to="/login">
                    <button className='btn btn-primary explore-btn'>Start Exploring</button>
                    </Link>
                    
                </div>
                <div className='intro-image'>
                    <img src="/assets/images/connect.svg" alt="" />
                </div>
            </div>
            <Swiper
                modules={[Autoplay, Scrollbar, Pagination, Parallax, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="carousel"
            >
                {/* {carouselData.map((item) => (
                    <SwiperSlide key={item.id} className="slide">
                        <img src={`${PF}posts/${item.image}`} alt="" className="image" />
                    </SwiperSlide>
                ))} */}

        <SwiperSlide className="slide"><img src="https://vaave.s3.amazonaws.com/assets/site_content/151534243/banners/82859d28be89f7d058ade4f685de9c84.jpg" alt="img1" className = "image"></img></SwiperSlide>
      <SwiperSlide className="slide"><img src="https://vaave.s3.amazonaws.com/assets/site_content/151534243/banners/f5026e46a0b7ca0f2098095819a4f5f3.jpg" alt="img1" className = "image"></img></SwiperSlide>
      <SwiperSlide className='slide'><img src = "https://vaave.s3.amazonaws.com/assets/site_content/151534243/banners/f33ad96fb7d618945043e21cadb72962.jpg" alt="img1" className = "image"></img></SwiperSlide>
  
                
            </Swiper>


            {/* About */}
            <div className='about'>
                <div className="about-left">
                    <img src="https://vaave.s3.amazonaws.com/assets/site_content/151534243/logo-cms.png" alt="" />
                </div>
                <div className='about-right'>
                    St. John College of Engineering and Management (SJCEM) is Established in 2008. It is located in Palghar. It provides facilities for professional education in the rural and tribal area of Palghar District near Mumbai by offering four year Degree Courses in Civil Engineering, Computer Engineering, Electronics and Telecommunications Engineering, IT Engineering and Mechanical Engineering and three year Diploma courses in Civil Engineering, Electronics and Telecommunications Engineering and Mechanical Engineering. SJCEM also offers two year Post Graduate Degree Course – Masters of Management Studies.
                </div>
            </div>

            {/* Events */}
            <div className="events-section">
                <div className="events-section-top">
                    <h2>Latest Events</h2>
                    <Link to="/events">
                        <button className='btn btn-primary-light'>View More</button>
                    </Link>
                </div>
                <Swiper
                    modules={[Scrollbar, Pagination, Navigation]}
                    spaceBetween={space}
                    slidesPerView={slides}
                    // scrollbar={{ draggable: true }}
                    pagination={{ clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="latest-events"
                >
                    {events.filter((event) => {
                        return event.eventImage !== ''
                    }).map((event, index) => (
                        <SwiperSlide key={event._id} className="latest-event">
                            <img src={`${event.eventImage}`} alt="" className="image" />
                            <span className='event-date'>{event.scheduleDate.slice(0, 10)}</span>
                            <h4 className='latest-event-title'>{event.title}</h4>
                            <Link to={`events/${event._id}`}>Read More</Link>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>

            <div className="engagement">

            </div>
        </div>
    )
}

export default Home
