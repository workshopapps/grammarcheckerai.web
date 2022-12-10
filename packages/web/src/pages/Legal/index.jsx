import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../modules/static/landing-page/Footer';
import termspng from '../../assets/legal/terms.png';
import privacypng from '../../assets/legal/privacy.png';
import cookiespng from '../../assets/legal/cookies.png';
import trademarkpng from '../../assets/legal/trademark.png';

const Legal = () => {


  return (
    <div className='w-full'>
      <div className='md:py-[7rem] py-[4rem] text-center bg-[#5d387f] text-white'>
        <h1 className='text-xl font-bold  md:text-4xl'>Legal Information and Resources</h1>
        <p className='w-[70%] md:w-full m-auto text-sm mt-2'>Find all the information you need as regards your legal rights to use our product</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 md:py-20 py-10 px-10 md:px-20 gap-10'>
        <Link to='/legal/terms-of-service'>
          <div className='_legalcard'>
            <img src={termspng} alt="terms" />
            <div>
              <h2 className='text-[#5d387f] font-bold text-lg md:text-xl'>Terms Services</h2>
              <p className='text-[#5a5a5a] text-sm'>Find terms and conditions for services </p>
            </div>
          </div>
        </Link>

        <Link to='/legal/privacy'>
          <div className='_legalcard'>
            <img src={privacypng} alt="terms" />
            <div>
              <h2 className='text-[#5d387f] font-bold text-lg md:text-xl'>Privacy Policy</h2>
              <p className='text-[#5a5a5a] text-sm'>Find terms and conditions for services </p>
            </div>
          </div>
        </Link>

        <Link to='/legal/cookies'>
          <div className='_legalcard'>
            <img src={cookiespng} alt="terms" />
            <div>
              <h2 className='text-[#5d387f] font-bold text-lg md:text-xl'>Cookies Statement</h2>
              <p className='text-[#5a5a5a] text-sm'>Find terms and conditions for services </p>
            </div>
          </div>
        </Link>

        <Link to='/legal/trademark'>
          <div className='_legalcard sm:truncate'>
            <img src={trademarkpng} alt="terms" />
            <div>
              <h2 className='text-[#5d387f] font-bold text-lg truncate'>Trademark and Copyright</h2>
              <p className='text-[#5a5a5a] text-sm md:px-10 sm:px-0'>Find terms and conditions for services </p>
            </div>
          </div>
        </Link>

      </div>
      <Footer />
    </div>
  );
};

export default Legal;
