import React from 'react'
import {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'
import AdminDashNavbar from '../../components/AdminDashNavbar/AdminDashNavbar'
import './UserDetails.css'
import UserDetailsComponent from '../../components/UserDetailsComponent/UserDetailsComponent'

import axios from 'axios'
const UserDetails=()=>{
    const {userId}=useParams()
    /*const [application,setApplication]=useState(userApplications[userID-1])*/
    const [userDetails,setUserDetails]=useState()
    const fetchUserDetails =async()=>{
        try{
            const response = await axios.get(`http://localhost:5000/users?userId=${userId}`)
            setUserDetails(response.data)
            console.log(userDetails)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(async()=>{
        await fetchUserDetails()
    },[])
    return(
        <div className="all-user-details">
            
            <AdminDashNavbar />
            {userDetails? <UserDetailsComponent userDetails={userDetails} />
            :
            <div className='user-details'><h1>Loading...</h1></div>}
            
        </div>
    )
}
export default UserDetails