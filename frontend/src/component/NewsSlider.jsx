import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../pages/AboutUs.css'; // Make sure to import your CSS file

const NewsSlider = () => {
    const [width, setWidth] = useState(0);
    const carousel2 = useRef();

    useEffect(() => {
        const updateWidth = () => {
            if (carousel2.current) {
                setWidth(carousel2.current.scrollWidth - carousel2.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);
    const newsItems = [
        { id: 1, title: "News 1", description: "Description 1", imgSrc: `../assets/Football5field.jpg` },
        { id: 2, title: "News 2", description: "Description 2", imgSrc: `../assets/Football5field.jpg` },
        { id: 3, title: "News 3", description: "Description 3", imgSrc: `../assets/Football5field.jpg` },
        { id: 4, title: "News 4", description: "Description 4", imgSrc: `../assets/Football5field.jpg` },
        { id: 5, title: "News 5", description: "Description 5", imgSrc: `../assets/Football5field.jpg` },
    ];

    return (
        <motion.div ref={carousel2} className='carousel2'>
            <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className='inner-carousel2'
                whileTap={{ cursor: "grabbing" }}
            >
                {
                    newsItems.map(news => {return(
                        <div className="news">
                            <img src={news.imgSrc} alt="" />
                            <h3>{news.title}</h3>
                            <p>{news.description}</p>
                            <button>Book now!</button>
                        </div>)
                    })
                }

            </motion.div>
        </motion.div>
    );
};

export default NewsSlider;
