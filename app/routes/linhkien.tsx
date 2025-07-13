import React from 'react';
import { useState } from 'react';
import HeaderBannerPage from '~/Components/HeaderBannerPage';
import Authenticate from '~/Components/Authenticate';
import GPS from '~/Components/GPS';
import NPKsensor from '~/Components/NPKsensor';
import MoistureSensor from '~/Components/MoistureSensor';
import RS485 from '~/Components/RS485';

const Home = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [select, setSelect] = useState(0);
  const image = ["https://images.squarespace-cdn.com/content/v1/59b037304c0dbfb092fbe894/1628013025525-SURK4UAZYLSPQTX76622/neo6m_black_hand.JPG?format=2500w",
    "https://m.media-amazon.com/images/I/51lcqA0VpPL._AC_SL1001_.jpg",
    "https://www.sunfounder.com/cdn/shop/files/001_f0a7db9f-de3d-44f5-a1c5-f05eb67dbea8_600x.jpg?v=1698733155",
  "https://m.media-amazon.com/images/I/61pCsg2pOYL._UF350,350_QL80_.jpg"]




        
  return (
    <div className='bg-white min-h-screen mt-10 pt-20 text-black'>
      <HeaderBannerPage setOpenAuthModal={() => setAuthOpen(true)} />
      <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} setIsAuthenticated={setIsAuthenticated} />
    
      <p className="text-center m-3  text-[#2d6a4f] bg-[#40916c] text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-8 px-8 py-4 rounded-lg">
        Our project brings together modern IoT technology, environmental sensors, and cloud computing to help farmers monitor and manage their soil health more effectively. This setup is ideal for precision farming, sustainability efforts, and research applications.
        Find out about different component in out "TerraTrack" by clicking on each component's thumbnail below.
      </p>
      <div className='grid grid-cols-4 m-4 gap-3'>
        {
          image.map((img, idx)=>{
            return(
            <img 
              onClick={()=>{
                if(select !== idx) setSelect(idx);
              }}
               src={img}
              className={`${select === idx ? "": "opacity-40"} border border-2`}
               />
            )
          })
        }
      </div>

      {select === 0 && <GPS/>}
      {select === 1 && <NPKsensor/>}
      {select === 2 && <MoistureSensor/>}
      {select === 3 && <RS485/>}









    </div>
  );
};

export default Home;
