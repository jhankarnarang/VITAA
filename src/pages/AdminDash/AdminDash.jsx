import React from 'react'
import './AdminDash.css'
import AdminHistoryCard from '../../components/AdminHistoryCard/AdminHistoryCard';
import AdminDashNavbar from '../../components/AdminDashNavbar/AdminDashNavbar';
import { ModerationHistory } from '../../dummyData';
const AdminDash = () => {
    return (
    <div className='admin-dash'>
        <AdminDashNavbar/>
        <div className="action-cards-list">
            <table className="action-cards">
                <tbody>
                {ModerationHistory.map((action) => (
                        <AdminHistoryCard
                            key={action.id}
                            action_type={action.action_type}
                            admin_name={action.admin_name}
                            action_desc={action.action_desc}
                            action_timestamp={action.action_timestamp} />
                ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default AdminDash