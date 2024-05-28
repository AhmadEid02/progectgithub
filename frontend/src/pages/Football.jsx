import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AboutUs.css'
import NewsSlider from '../component/NewsSlider';
import SlideShow3 from '../component/SlideShow3';
import ProgressBar from '../component/ProgressBar';
import { useEffect } from 'react';
import axios from "axios"

const matchData = [
    {
        team1: 'uni jordan',
        team2: 'uni jordan',
        date: '13/3/2024',
        time: '3:00',
        logo: '../assets/uniLogo.png'
    },
    {
        team1: 'uni jordan',
        team2: 'uni jordan',
        date: '14/3/2024',
        time: '4:00',
        logo: '../assets/uniLogo.png'
    }
];

const teams = ["../assets/team/team1.jpg", "../assets/team/team2.jpg", "../assets/team/team3.jpg", "../assets/team/team4.jpeg", "../assets/team/team5.jpeg"]

const Football = () => {
    const [matches, setMatches] = useState([])
    const [news, setNews] = useState([])
    const [active, setActive] = useState(new Array(matchData.length).fill(false));
    const navigate = useNavigate();
    const navigateTo = () => {
        navigate("/", { state: { sport: "Football" } });
    }
    const toggleActive = (index) => {
        setActive(prevActive => {
            const newActive = [...prevActive];
            newActive[index] = !newActive[index];
            return newActive;
        });
    };
    const fetchMatchesData=async()=>{
        try {
            const apiUrl = `http://localhost:4000/matches/Football`
            const response = await axios.get(`${apiUrl}`);
            setMatches(response.data.matches)
        } catch (error) {

        }
    }
    const fetchNewsData=async()=>{
        try {
            const apiUrl = `http://localhost:4000/news/Football`
            const response = await axios.get(`${apiUrl}`);
            setNews(response.data.news)

        } catch (error) {

        }
    }
    useEffect(() => {
        fetchMatchesData()
        fetchNewsData()
    }, [])


    return (
        <div>
            <ProgressBar />
            <div className='hero'>
                <div className='welcome'>
                    <h2>Welcome to <span className='secCol'>Football</span></h2>
                    {/* <h2>Sport <span className='secCol'>Activites</span> Complex</h2> */}
                    <h2><span className='secCol'>In</span></h2>
                    <h2> University of jordan</h2>
                    <button onClick={navigateTo}>Book Now!</button>
                </div>
                <div className='heroImage'>
                    <img src="../assets/one.png" alt="" />
                </div>
            </div>
            <div className='gallery-title'>
                <h2>Our Fileds</h2>
                <p>Explore our state-of-the-art football fields, designed to provide the best playing experience for all levels of play.</p>
            </div>
            <div className="photo-gallery">
                <img src="../assets/Football11field.jpeg" alt="" />
                <img src="../assets/Football5field.jpg" alt="" />
                <img src="../assets/Footballfield.jpg" alt="" />
            </div>
            <div className='gallery-title'>
                <h2>Upcoming Matches</h2>
                <p>Catch the excitement of our upcoming matches. Mark your calendars and join us to cheer for our teams!</p>
            </div>
            <div className='matches'>
                <ul>
                    {matches.map((match) => (
                        <li key={match._id} >
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
                                        <img src="../assets/youtube.svg" alt="" />
                                    </span>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='gallery-title'>
                <h2>Achievement</h2>
                <p>We are proud of our accomplishments. Here are some of our notable achievements over the years.</p>
            </div>
            <div className='our-Achievement'>
                <div className='Achievement-card'>
                    <img src="../assets/ac1.png" alt="" />
                    <p>Jordanian Universities Championship</p>
                    <p className='secCol'>2007 | 1 FST</p>
                </div>
                <div className='Achievement-card'>
                    <img src="../assets/ac2.png" alt="" />
                    <p>Asia Regional Cup 2015</p>
                    <p className='secCol'>2015 | 1 FST</p>
                </div>
                <div className='Achievement-card'>
                    <img src="../assets/ac1.png" alt="" />
                    <p>Crown Prince Champnship</p>
                    <p className='secCol'>2020 | 1 FST</p>
                </div>
                <div className='Achievement-card'>
                    <img src="../assets/ac2.png" alt="" />
                    <p>Crown Prince Champnship</p>
                    <p className='secCol'>2023 | 1 FST</p>
                </div>
            </div>
            <div className='gallery-title'>
                <h2>News</h2>
                <p>Stay updated with the latest news and events from our football team and the sports community.</p>
            </div>
            <NewsSlider newsItems={news}/>
            <div className='gallery-title'>
                <h2>Our Team</h2>
                <p>Meet our dedicated team of players and coaches who strive for excellence on and off the field.</p>
            </div>
            <SlideShow3 slides={teams} />
        </div>
    )
}

export default Football