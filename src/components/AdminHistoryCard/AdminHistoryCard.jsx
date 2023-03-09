import React from 'react';
import './AdminHistoryCard.css';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutline from '@mui/icons-material/DeleteOutline'

function actionIcon_type(action_type){
    switch(action_type){
        case 'addUser': return <AddIcon style={{color: 'var(--primary-green)'}}/>
        case 'editUser': return <EditIcon style={{color: 'var(--primary-green)'}}/>
        case 'delUser': return <RemoveIcon style={{color: 'var(--danger-btn-bg)'}}/>
        case 'approveApplication': return <DoneIcon style={{color: 'var(--primary-green)'}}/>
        case 'rejectApplication': return <ClearIcon style={{color: 'var(--danger-btn-bg)'}}/>
        default:;
    }
}
const AdminHistoryCard=({action_type,admin_name,action_desc,action_timestamp})=>{
    return(
        <tr className="action-card">
                <td className="action-type">
                    <span className="action-type-desc">{actionIcon_type(action_type)}{action_desc}</span>
                </td>
                <td className="admin-name">
                   {admin_name}
                </td>
                <td className='action-timestamp'><HistoryIcon/> {action_timestamp}</td>
                <td className='delete-record'><button className="btn btn-danger delete-btn"><DeleteOutline/></button></td>
        </tr>

    )
}

export default AdminHistoryCard