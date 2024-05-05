import React, { useState, useEffect } from 'react';

const SlideShow2 = () => {
    const style = { width: "100%", height: "400px" };
    const [slideIndex, setSlideIndex] = useState(1);

    const plusSlides = (n) => {
        const nextIndex = (slideIndex + 1) % 3;
        setSlideIndex(nextIndex);
    };

    const currentSlide = (n) => {
        setSlideIndex(n);
    };

    useEffect(() => {
        showSlides(slideIndex);
    }, [slideIndex]);

    const showSlides = (n) => {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        if (n > slides.length) { setSlideIndex(1); }
        if (n < 1) { setSlideIndex(slides.length); }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    };

    return (
        <>
            <div className="slideshow-container">
                {<div className="mySlides fade">
                    <div className="numbertext">1 / 3</div>
                    <img src="./assets/imgs/img1.jpg" style={style} alt="Slide 1" />
                    <div className="text">Caption Text</div>
                </div>}

                {<div className="mySlides fade">
                    <div className="numbertext">2 / 3</div>
                    <img src="./assets/imgs/img2.jpg" style={style} alt="Slide 2" />
                    <div className="text">Caption Two</div>
                </div>}
                {<div className="mySlides fade">
                    <div className="numbertext">3 / 3</div>
                    <img src="./assets/imgs/img3.jpg" style={style} alt="Slide 3" />
                    <div className="text">Caption Three</div>
                </div>}
                <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
                <span className="dot" onClick={() => currentSlide(1)}></span>
                <span className="dot" onClick={() => currentSlide(2)}></span>
                <span className="dot" onClick={() => currentSlide(3)}></span>
            </div>
        </>
    );
};

export default SlideShow2;
