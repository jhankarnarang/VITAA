import axios from "axios";
import jwt from "jwt-decode"

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        //Login request:
        const res = await axios.post(`http://localhost:5000/auth/login`, userCredentials);
        const data = await res.data;
        //Store the access token and refresh token sent by the server in localStorage(warning: vulnerable to XSS):
        localStorage.setItem('accessToken',res.data.accessToken)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        
        //Decode the payload and obtain the details of the user:
        const user = jwt(res.data.accessToken)
        //Store the user in a reducer:
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
        console.log(error.response)
        let message='Failed to communicate with the server!'
        if(error.response)
            message=error.response.data
        dispatch({ type: "LOGIN_FALIURE", payload: message });
    }
}

export const logoutCall = async (dispatch) => {
    //Get the refreshToken from localStorage if it exists:
    const refreshToken = localStorage.getItem('refreshToken')

    //If the value of refreshToken is not null/empty, send a request to the server to clear the token from the database:
    if(refreshToken){
        //It doesn't matter whether this request failed or succeeded,since we will logout the user from the client side regardless.
        try{
            await axios.post('http://localhost:5000/auth/logout',{refreshToken:refreshToken})
        }catch(error){
            console.log(error)
        }
    }

    //Remove the access and refresh tokens from localStorage(if they exist):
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    //Clear details about the user:
    dispatch({ type: "LOGOUT" })
}