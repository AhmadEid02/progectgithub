import React from 'react'
import HorizontalCard from '../component/HorizontalCard'

const Dashboard = () => {
  return (
    <div className='dash'>
      <div className="card">
        <div class="card__img"><img src="./assets/sportbackground.jpg" alt="" /> </div>
        <div className="hii">
          <div className='avatar'>
            <div class="card__avatar"><img src="./assets/Zaid.jpeg" alt="" /></div>
            <div className="card__title">Zaid Ayoub</div>
          </div>
          <div class="ds-info">
            <div class="ds pens">
              <h6 >books <i class="fas fa-edit"></i></h6>
              <p>29</p>
            </div>
            <div class="ds projects">
              <h6 >tournament <i class="fas fa-project-diagram"></i></h6>
              <p>0</p>
            </div>
            <div class="ds posts">
              <h6 >Posts <i class="fas fa-comments"></i></h6>
              <p>0</p>
            </div>
            <div class="ds posts">
              <h6 >Posts <i class="fas fa-comments"></i></h6>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3>upcoming booking</h3>
        <div className="booking-list">
          <HorizontalCard />
          <HorizontalCard />
          <HorizontalCard />
          
        </div>
        <h3>old booking</h3>
        <div className="booking-list">
          <HorizontalCard />
          <HorizontalCard />
        </div>
      </div>

    </div>
  )
}

export default Dashboard