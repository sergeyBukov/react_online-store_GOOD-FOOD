import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BannerPart.scss';
import './media_BannerPart.scss';

import banner_1 from './img/banner_1.png';
import banner_2 from './img/banner_2.png';


const BannerPart = () => {

  let navigate = useNavigate();

  return (
      <>
        <div className="containerPartWithBannersAndFilters">
          <div className="bannerBlock">
            <div className="bannerBlock__item">
              <img className='bannerBlock__item_img' src={banner_1} alt="banner 1" />
              <h2 className='bannerBlock__item_titleLeft'>summer fruits</h2>
              <p className="bannerBlock__item_textLeft">100% all natural fruit juice</p>
              <button className="bannerBlock__item_btnLeft" onClick={() => navigate('/products/15')}>SHOP NOW</button>
            </div>
            <div className="bannerBlock__item">
              <img className='bannerBlock__item_img' src={banner_2} alt="banner 2" />
              <h2 className='bannerBlock__item_titleRight'>Dried & Drink <br /> Fruits</h2>
              <p className="bannerBlock__item_textRight">100% all natural fruit juice</p>
              <button className="bannerBlock__item_btnRight" onClick={() => navigate('/products/4')}>SHOP NOW</button>
            </div>
          </div>

        </div>
      </>
  )
}

export default BannerPart
