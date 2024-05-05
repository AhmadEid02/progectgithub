import React from 'react'
import './book.css'
import imags from '../component/imags'
import SlideShow3 from '../component/SlideShow3'
const Book = () => {
    return (
        <div>
            <div className="step-container">
                <div className="step active"><span>1</span></div>
                <div className="step"><span>2</span></div>
                <div className="step-connector"></div>
            </div>
            <div className="container003">
                <div className="field-info">
                    <h2>Field Name</h2>
                    <p>Field Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="container-field-type">
                        <span className='secCol'>Field type:</span>
                        <div className='field-type'>
                            <p>Football</p>
                            <span className="material-symbols-outlined">
                                sports_soccer
                            </span>
                        </div>
                    </div>

                </div>
                {/* <div className="image-container">
                    <img class="image" src=".\assets\Football5field.jpg" alt="Main Image" />

                    <div class="secondary-images">
                        <img src=".\assets\Football5field.jpg" alt="Secondary Image 1" />
                        <img src=".\assets\Football5field.jpg" alt="Secondary Image 2" />
                        <img src=".\assets\Football5field.jpg" alt="Secondary Image 3" />
                    </div>

                </div> */}
                <SlideShow3 slides={imags} />
                <div className="features">
                    <h3>Features:</h3>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>

                    </ul>
                </div>

                <div className="date-time">
                    <label for="date">Date:</label>
                    <input type="date" id="date" name="date" />
                    {/* <label for="time">Time:</label>
                    <input type="time" id="time" name="time" /> */}
                </div>
                <label for="time">Time:</label>
                <div className="time">
                <div className="time-selection">
                    <span class="material-symbols-outlined">
                        schedule
                    </span>
                    <p>13:00</p>
                </div>
                <div className="time-selection">
                    <span class="material-symbols-outlined">
                        schedule
                    </span>
                    <p>14:00</p>
                </div>
                <div className="time-selection">
                    <span class="material-symbols-outlined">
                        schedule
                    </span>
                    <p>15:00</p>
                </div>
                </div>
                

                <div className="checkbox">
                    <input type="checkbox" id="equipment" name="equipment" />
                    <label for="equipment">Include Equipment</label>
                </div>

                <div className="checkbox">
                    <input type="checkbox" id="referee" name="referee" />
                    <label for="referee">Add Referee</label>
                    <input type="number" id="referee-price" name="referee-price" placeholder="Price" />
                </div>

                <button type="submit">Book Now</button>
            </div>


        </div>
    )
}

export default Book