import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminMatchesCard = ({ match }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`${match._id}/edit`)
    }
    return (
        <li key={match._id}>
            <div className='team-logo'>
                <img src={`../../../assets/fields/${match.team1Logo}`} alt="" />
                <p>{match.team1}</p>
            </div>
            <p>vs</p>
            <div className='team-logo'>
                <img src={`../../../assets/fields/${match.team2Logo}`} alt="" />
                <p>{match.team2}</p>
            </div>
            <div className='time2'>
                <span className="material-symbols-outlined">
                    calendar_today
                </span>
                <p>{match.date?.split("T")[0]}</p>
            </div>
            <div className='time2'>
                <span className="material-symbols-outlined">
                    schedule
                </span>
                <p>{match.time}</p>
            </div>
            <div className="bell">
                <a href={match.link} target="_blank">
                    <span className="material-symbols-outlined">
                        videocam
                    </span>
                </a>


            </div>
            <span className="material-symbols-outlined pointer" onClick={handleEdit}>
                edit
            </span>
        </li>
    )
}

export default AdminMatchesCard