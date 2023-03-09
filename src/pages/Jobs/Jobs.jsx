import {React, useState, useEffect} from 'react'
import Categories from '../../components/Categories/Categories';
import Job from '../../components/Job/Job';
import './Jobs.css';
// import { jobs } from '../../dummyData';
import axios from 'axios';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/jobs/all');
            const data = await response.data;
            // const response = await axios.get('http://127.0.0.1:5000/events/all');
            // const  data = await response.data;
            console.log(data);
            setJobs(data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='jobs'>
            <div className="job-categories-container">
                <Categories jobs />
            </div>
            <div className="jobs-container">
                {jobs.map(job => (
                    <Job 
                    key={job._id}
                    id={job._id}
                    jobProfile={job.offeredRole} 
                    company={job.companyName} 
                    userId={job.userId}
                    location={job.location}
                    deadline={job.deadline}
                    salary={job.salary}
                    linkClicks={job.linkClicks} />
                ))}
            </div>
        </div>
    )
}

export default Jobs
