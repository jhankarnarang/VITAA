import React from 'react';
import {useState,useRef} from 'react'
import './UserManager.css';
import AdminDashNavbar from '../../components/AdminDashNavbar/AdminDashNavbar';
import UserCard from '../../components/UserCard/UserCard';
import { userApplications } from '../../dummyData.js'
import axios from 'axios'
import { courses } from '../../dummyData'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
const UserManager=()=>{
    const [selectedCourse, setSelectedCourse] = useState();
    const [selectedBranch, setSelectedBranch] = useState('');
    const [branches, setBranches] = useState();
    const [selectedYear, setSelectedYear] = useState('');
    const [statusMessage, setStatusMessage] = useState('Start searching to see results');
    const [userType, setUserType] = useState('');
    const searchPID = useRef();
    const [searchResults,setSearchResults] = useState([])
    const updateCourse = (e) => {
        setSelectedCourse(courses[e.target.value - 1]);
        setBranches(courses[e.target.value - 1].branches);
    }
    const updateUserType = (e)=>{
        setUserType(e.target.value)
    }
    const updateYear = (e)=>{
        setSelectedYear(e.target.value)
    }
    const updateBranch = (e)=>{
        setSelectedBranch(e.target.value)
    }
    //! THIS FUNCTION IS BADLY WRITTEN. REPLACE WITH A BETTER year list GENERATOR LATER.
    const getYearList = () => {
        const year = new Date().getFullYear();
        return (
          Array.from( new Array(15), (v,i) =>
            <option key={i} value={year-i}>{year-i}</option>
          )
        );
      }
    const fetchUsers = async (e)=>{
        e.preventDefault()
        const pid_regexp = /^[0-9]{7}$/
        const filters = {}
        if(pid_regexp.test(searchPID.current.value))
            filters['pid'] = searchPID.current.value
        else{
            if(userType.length>0)
                filters['userType'] = parseInt(userType)
            if(selectedYear)
                filters['courseJoinYear'] = selectedYear
            if(selectedCourse){
                filters['course'] = selectedCourse.courseName
            if(selectedBranch){
                filters['branch'] = selectedBranch
            }
            }
        }
        try{
            console.log(filters)
            if(Object.keys(filters).length===0){
                setSearchResults([])
                setStatusMessage("Please select a filter or enter a PID")
                return
            }
            const response = await axios.post('http://localhost:5000/users/all',{filters:filters})
            setSearchResults(response.data)
        }catch(error){
            console.log(error)
            setSearchResults([])
            if(error.response)
                setStatusMessage(error.response.data.error)
            else setStatusMessage("Failed to communicate with server")
        }
    }
    return(
        <div className="user-manager">
            <AdminDashNavbar />
            <div className="content-container">
            <form className='filter-users'>
                    <h3 className='filter-heading'>Filter Users</h3>
                    <div className='filter-options'>
                        <select className="filter-option" onChange={updateCourse} >
                            <option value="none" selected disabled hidden>Select Course</option>
                            {courses.map(course => (
                                <option key={course.courseId} value={course.courseId}>{course.courseName}</option>
                            ))}
                        </select>
                        {branches
                            ? (
                                <select className="filter-option" onChange={updateBranch}>
                                    <option value="none" selected disabled hidden>Select Branch</option>
                                    {branches.map(branch => (
                                        <option key={branch} value={branch}>{branch}</option>
                                    ))}
                                </select>
                            ) : ''}
                        <select className='filter-option' onChange={updateUserType}>
                            <option value="none" selected default disabled hidden> User Type</option>
                            <option key="1" value="1">Student</option>
                            <option key="2" value="2">Alumni</option>
                        </select>
                        <select className='filter-option' onChange={updateYear}>
                            <option value="none" selected disabled hidden>Joining Year</option>
                            {getYearList()}
                        </select>
                        <div className="separator">OR</div>
                        <input type='text' ref={searchPID} placeholder='Search by PID' />
                        
                    </div>
                    <button className='btn btn-secondary' type='submit' onClick={fetchUsers}>
                        <FilterAltIcon />
                        Filter
                    </button>
                
            </form>
            <div className="user-cards">
            {searchResults.length>0?searchResults.map((matchedUser)=>(
                <UserCard 
                    key={matchedUser._id}
                    userId={matchedUser._id}
                    pid={matchedUser.pid}
                    firstName={matchedUser.firstName}
                    lastName={matchedUser.lastName}
                    course={matchedUser.course}
                    branch={matchedUser.branch}
                    profilePicture={matchedUser.profilePicture}
                    role={matchedUser.userType}
                    joinYear={matchedUser.courseJoinYear}
                    endYear={matchedUser.courseEndYear}
                />
            )) : <div>{statusMessage}</div>}
            </div>
            </div>
        </div>
    )
}

export default UserManager