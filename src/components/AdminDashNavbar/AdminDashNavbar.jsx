import React from 'react';
import './AdminDashNavbar.css';
import { NavLink , Link } from 'react-router-dom';
//TODO: ADD NavLinks and TURN THIS INTO A PROPER NAVBAR
const AdminDashNavbar=()=>{
    return(
        <div className='admin-actions'>
            <h3>Administrative Actions</h3>
            <ul className='categories'>
                <Link to='/admin-dash/'>
                        <li className='category'>
                            <span>Moderation Log</span>
                        </li>
                </Link>
                <Link to='/admin-dash/users'>
                        <li className='category'>
                            <span>Manage Users</span>
                            
                        </li>
                </Link>
                {/*<Link to='/admin-dash/admins'>
                        <li className='category'>
                            <span>Manage Admins</span>
                        </li>
                </Link>*/}
            </ul>
        </div>
    )
}
export default AdminDashNavbar