import React, { useState, useEffect } from 'react'
import './JobDetails.css';
import DescriptionIcon from '@mui/icons-material/Description';
import { jobs } from '../../dummyData';
import { Users } from '../../dummyData';
import { useParams } from 'react-router';

const JobDetails = () => {
    const { jobId } = useParams()

    const [job, setjob] = useState(jobs[jobId - 1]);
    const [user, setUser] = useState(Users[jobs.userId]);

    useEffect(() => {
        const fetchUser = async () => {
            // await setUser(Users[job.userId]);
        }
        fetchUser();
    }, [])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='job-details'>
            <div className="job-detail-top"></div>
            <div className="job-detail-bottom">
                <h2 className='title'>Job Details</h2>
                <div className="basic">
                    <div className="section-title">
                        <DescriptionIcon className='icon' />
                        <h4>Basic</h4>
                    </div>
                    <div className="basic-details">
                        <div className="basic-detail">
                            <span className="basic-detail-key">Company Name</span>
                            <span className="basic-detail-value">{jobs.company}</span>
                        </div>
                        <div className="basic-detail">
                            <span className="basic-detail-key">Designation</span>
                            <span className="basic-detail-value">{jobs.jobProfile}</span>
                        </div>
                        <div className="basic-detail">
                            <span className="basic-detail-key"> Salary</span>
                            <span className="basic-detail-value">CTC : {jobs.salary}</span>
                        </div>
                        <div className="basic-detail">
                            <span className="basic-detail-key"> Location</span>
                            <span className="basic-detail-value">{jobs.location}</span>
                        </div>
                        <div className="basic-detail">
                            <span className="basic-detail-key">Posted On</span>
                            <span className="basic-detail-value">Date: Dec 24, 2021</span>
                        </div>
                        <div className="basic-detail">
                            <span className="basic-detail-key">Application Deadline</span>
                            <span className="basic-detail-value">Apply till: {jobs.deadline}</span>
                        </div>
                    </div>
                </div>

                <div className="description">
                    <div className="section-title">
                        <DescriptionIcon className='icon' />
                        <h4> Description</h4>
                    </div>
                    <div className="description-detail">
                        <span className='description-detail-key'> Designation : </span>
                        <span className='description-detail-value'>{jobs.jobProfile}</span>
                        <br />
                        <span className='description-detail-key'> Function :</span>
                        <span className='description-detail-value'>
                            R&D/ Production/ Quality Assurance/ Supply Chain/ Safety/ IT/ Parts, Accessories and
                            logistics
                        </span>
                        <br />
                        <span className='description-detail-key'>Eligibility Criteria :</span>
                        <span className='description-detail-value'>none</span>
                        <br />
                        <span className='description-detail-key'> Work Experience : </span>
                        <span className='description-detail-value'>12-upto 22 months (as on 31st March 2022) post BE / B.Tech</span>
                        <br />
                        <span className='description-detail-key'>Degree:</span>
                        <span className='description-detail-value'> BE / B.Tech</span>
                        <br />
                        <span className='description-detail-key'>Passing year: </span>
                        <span className='description-detail-value'>2020</span>
                    </div>
                </div>

                <div className="about">
                    <div className="section-title">
                        <DescriptionIcon className='icon' />
                        <h4>About Maruti Suzuki India Ltd.</h4>
                    </div>
                    <div className='about-details'>
                        <span>Maruti Suzuki India Limited is India's leading passenger vehicle manufacturer.</span>
                    </div>
                </div>

                <div className="share-job">
                    <div className="section-title">
                        <DescriptionIcon className='icon' />
                        <h4>Share</h4>
                    </div>
                    <div className="share-details">
                        <span>Let your friends and batchmates know about this</span>
                    </div>
                </div>
                <div className="postedby">
                    <div className="section-title">
                        <DescriptionIcon className='icon' />
                        <h4>Posted By</h4>
                    </div>
                    <div className="postedby-details">
                        <div className="postedby-profile-picture">
                            <img src={`${PF}/images/people/${Users.profilePicture}`} alt="" />
                        </div>
                        <div >
                            <span className="postedby-name">{Users.name}</span>
                            <span className="postedby-designation">Alumni, class of 2019</span>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <div className="section-title">
                        <DescriptionIcon className='icon' />
                        <h4>Contact</h4>
                    </div>
                    <div className="contact-details">
                        <span>Want to get in touch with {Users.name}? Send a Direct Message</span>
                    </div>
                </div>
                <div className="apply">
                    <div className="section-title">
                        <DescriptionIcon className='icon' />
                        <h4>Apply</h4>
                    </div>
                    <div className="apply-details">
                        <p>To Apply: Click here to apply</p>
                        <button className="btn btn-green apply-btn">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
