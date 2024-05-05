import React, { useEffect, useState } from 'react'
const SlideShow3 = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const style = { width: "100%", height: "400px" };
    const goToNextSlide = () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
    };
  
    const goToPreviousSlide = () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      setCurrentIndex(prevIndex);
    };
  
    useEffect(() => {
      const timer = setInterval(() => {
        goToNextSlide();
      }, 3000); // Change slide every 3 seconds
  
      return () => clearInterval(timer);
    }, [currentIndex]);
  
    return (
      <>
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`mySlides fade ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="numbertext">
                {index + 1}/{slides.length}
              </div>
              <img src={slide} alt={`Slide ${index + 1}`} style={style} />
              <div className="text">Caption Text</div>
            </div>
          ))}
          <a className="prev" onClick={goToPreviousSlide}>&#10094;</a>
          <a className="next" onClick={goToNextSlide}>&#10095;</a>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </>
    );
  };
  
  export default SlideShow3;