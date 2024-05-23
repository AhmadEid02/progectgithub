import React, { useEffect, useState } from 'react'
const SlideShow3 = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const style = { width: "800px", height: "400px" };
    const goToNextSlide = () => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    };
  
    const goToPreviousSlide = () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      setCurrentIndex(prevIndex);
    };
  
    useEffect(() => {
      // Check if there are slides available
      if (slides.length > 0) {
        const timer = setInterval(() => {
          goToNextSlide();
        }, 3000); // Change slide every 3 seconds
        
        return () => clearInterval(timer);
      }
    }, [slides]);
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
              <img src={slide} alt={`Slide ${index + 1}`} className='image-slider' />
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