import React from 'react'
import './fields.css'
// import SlidShow from '../component/SlidShow'
import SlideShow2 from '../component/SlideShow2'
const Fields = () => {
    return (
        <div>
            {/* <SlideShow2/> */}
            <div className='Services'>
                <div className='Service'>
                    <img src="./assets/Football11field.jpg" alt="" />
                    <div className='desc'>
                        <h2>Football</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, similique doloribus a quas reprehenderit accusantium maiores deserunt quisquam ab esse distinctio delectus quod iusto incidunt accusamus sit dolor magnam. Iste?</p>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </div>
                <div className='Service r2'>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                    <img src="./assets/Football5field.jpg" alt="" />
                    <div className='desc'>
                        <h2>Basketball</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, similique doloribus a quas reprehenderit accusantium maiores deserunt quisquam ab esse distinctio delectus quod iusto incidunt accusamus sit dolor magnam. Iste?</p>
                    </div>
                </div>
                <div className='Service'>
                    <img src="./assets/Volleyballfield.jpg" alt="" />
                    <div className='desc'>
                        <h2> Volleyball</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, similique doloribus a quas reprehenderit accusantium maiores deserunt quisquam ab esse distinctio delectus quod iusto incidunt accusamus sit dolor magnam. Iste?</p>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Fields