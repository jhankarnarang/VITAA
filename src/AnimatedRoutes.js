import React from 'react'
import {
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Events from './pages/Events/Events';
import EventDetails from './pages/EventDetails/EventDetails';
import Jobs from './pages/Jobs/Jobs';
import AlumniDirectory from './pages/AlumniDirectory/AlumniDirectory';
import JobDetails from './pages/JobDetails/JobDetails';
import AdminDash from './pages/AdminDash/AdminDash';
import UserManager from './pages/UserManager/UserManager';
import UserDetails from './pages/UserDetails/UserDetails'
import Stories from './pages/Stories/Stories';
import StoryDetails from './pages/StoryDetails/StoryDetails';
import Register from './components/Register/Register';
import SkeletonLoading from './components/SkeletonLoading/SkeletonLoading';
import Login from './components/Login/Login';

import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ProjectShowcase from './pages/ProjectShowcase/ProjectShowcase';
import Settings from './pages/Settings/Settings';
import AddEvent from './components/AddEvent/AddEvent';
import AddStory from './components/AddStory/AddStory';

import ErrorPage from './pages/ErrorPage/ErrorPage';
import Spinner from './components/Spinner/Spinner';

const AnimatedRoutes = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            {/* <Route path="/" element={user ? <Home /> : <Login />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={user ? <Profile /> : <Login />} />
            <Route path="/events" element={user ? <Events /> : <Login />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/stories" element={user ? <Stories /> : <Login />} />
            <Route path="/storyDetails/:storyId" element={<StoryDetails />} />
            <Route path="/projects" element={<ProjectShowcase />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="jobs/:jobId" element={<JobDetails />} />
            <Route path="/alumnis" element={user ? <AlumniDirectory /> : <Spinner />} />
            <Route path="/admin-dash" element={user ? (user.userType === 3 ? <AdminDash /> : <Home />) : <Login />} />
            <Route path="/admin-dash/users" element={user ? (user.userType === 3 ? <UserManager /> : <Home />) : <Login />} />
            <Route path="/admin-dash/users/:userId" element={user ? (user.userType === 3 ? <UserDetails /> : <Home />) : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/skeleton" element={<SkeletonLoading />} />
            <Route path='/addEvent' element={user ? (user.userType != 1 ? <AddEvent /> : <Home />) : <Login />} />
            <Route path='/addStory' element={<AddStory />} />

            <Route path='*' element={<ErrorPage />} />
            <Route path='/pageNotFound' element={<ErrorPage />} />
        </Routes>
    )
}

export default AnimatedRoutes