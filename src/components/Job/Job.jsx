import React, { useState, useEffect } from 'react'
import './Job.css';
import { Link } from 'react-router-dom';
// import { Users } from '../../dummyData';
import axios from 'axios';

const Job = ({ id, jobProfile, company, userId, location, deadline, salary, linkClicks }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER_CLIENT;
    // const [user, setUser] = useState(Users[userId]);
    const [applied, setApplied] = useState(false);

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
        <div className="job">
            <div className="job-top">
                <div className="job-top-left">
                    <span className="job-profile">{jobProfile}</span>
                    <span className='pipe'>|</span>
                    <span className="job-company">{company}</span>
                </div>
                <div className="job-top-right">
                    <span className="post-date">
                        22 mins ago
                    </span>
                </div>
            </div>
            <div className="job-center">
                <div className="location">
                    <span className="job-info">Location</span>
                    <span className="job-info-value">{location}</span>
                </div>
                <div className="deadline">
                    <span className="job-info">Deadline</span>
                    <span className="job-info-value">{deadline}</span>
                </div>
                <div className="salary">
                    <span className="job-info">Salary</span>
                    <span className="job-info-value">{salary ? salary : `--`}</span>
                </div>
                <div className="link-clicks">
                    <span className="job-info">Link Clicks</span>
                    <span className="job-info-value">{linkClicks}</span>
                </div>
            </div>
            <div className="job-bottom">
                <div className="job-bottom-left">
                    <img src={`${userDetails.profilePicture}`} alt="" className='job-profile-image' />
                    <span>{userDetails.firstName}{userDetails.lastName}</span>
                </div>
                <div className="job-bottom-right">

                    {
                        applied
                            ? (
                                <button className="btn btn-green" onClick={()=> setApplied(false)}>
                                    Applied
                                </button>
                            )
                            : (
                                <button className="btn btn-primary-light" onClick={()=> setApplied(true)}>
                                    Apply
                                </button>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Job
