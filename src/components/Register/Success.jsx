import React from 'react'
import {Link} from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified';
const Success =()=>{

    return(
        <>
        <div id='success-icon'>
            <VerifiedIcon />
        </div>
        <p>
            <Link to='/login'> Sign in</Link> to continue
        </p>
        </>
    )
}
export default Success