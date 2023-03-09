/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';

import axios from 'axios'
import jwt from 'jwt-decode'

import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Spinner/Spinner';

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import {useContext, useState, useEffect,} from 'react'

import AnimatedRoutes from './AnimatedRoutes';
import ScrollToTop from './utils/ScrollToTop';
import { AuthContext } from './context/AuthContext';
import { logoutCall } from './apiCalls';

function App() {
  const {user, isFetching, error, dispatch} = useContext(AuthContext);

  useEffect(()=>{
    //It will take sometime request a new accessToken when the user refreshes the page, and in that time, the page render completes,but the user object is null
    //So temporarily use the user object from the old accessToken, just to prevent that brief moment where the user obj is null:
    try{
      if(localStorage.getItem('accessToken')){
        const decoded_payload = jwt(localStorage.getItem('accessToken'))
        dispatch({ type: "LOGIN_SUCCESS", payload: decoded_payload });
      }
    }catch(error){
      //It doesnt matter if something goes wrong in the above try block because we'll be re-requesting a new accessToken anyway
      //But that brief logged out moment will occuur.
      console.log(error)
    }

  },[])

  useEffect(async ()=>{
    //Periodically request a new accessToken every time the current one nears its expiry
    const newAccessToken = async()=>{
      if(localStorage.getItem('refreshToken')){
        try{
          const response = await axios.post('http://localhost:5000/auth/newToken',{refreshToken:localStorage.getItem('refreshToken')})
          localStorage.setItem('accessToken',response.data.accessToken)

          //We also need to update the user object,in case the server changed the payload:
          const decoded_payload = jwt(localStorage.getItem('accessToken'))
          //If decoding succeeds, store the decoded user object in a reducer:
          dispatch({ type: "LOGIN_SUCCESS", payload: decoded_payload });

        }catch(error){
          console.log(error)
          logoutCall(dispatch)
        }
      }
    }
    //Run it with no delay for the first time the page loads:
    newAccessToken()
    //Run it every 14 mins after that:
    setInterval(newAccessToken,840000)
    //We need to call clearInterval to stop periodically re-requesting accessTokens when the app unloads/reloads,so we pass it as a cleanup function:
    return ()=>{clearInterval(newAccessToken)}
  },[])
/*
  return(
    <Routes>
      <Route path="/" element={<Layout />}>

      </Route>
    </Routes>

  )*/

  if(isFetching){
    return (
      <Router>
      <Navbar />
      <Spinner />
      </Router>
      
    )
  }
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
