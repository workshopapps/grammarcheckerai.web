import purpleWoman from './assets/hero/purple-woman.png';
import styles from './styles/index.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Hero = () => {
const [status, setStatus] = useState([]);
    const getRes = async () => {
        const data = await axios.get('https://grittygrammar.hng.tech/v1/quiz')
        console.log(data.data)
     }

     const apiTest = async () => {
        const data = await axios.get('https://grittygrammar.hng.tech/api/v1/test')
        console.log(data.data,'API status')
        setStatus(data.data)
        status.map((item, index) => 
        console.log(Object.keys(item) + ' Status: '+ item[Object.keys(item)].status)
    )
     }

    useEffect(() => {
       getRes()
    apiTest()
   }, [])
    return (
        <section className={`bg-white -mt-20 `}>
            <div className='lg:max-w-[1220px] w-[90%] mx-auto py-16 text-center text-[#262626] flex flex-col justify-center items-center gap-32 md:flex-row md:text-left  lg:gap-96'>
                <div className='max-w-2xl relative'>
                    <div className={` ${styles.hero__header} relative z-10 max-w-xs md:max-w-xl mx-auto `}>
                        <h2 className={`pb-2 text-4xl text-white ${styles.font_w} ${styles.ff_inter} md:text-4xl whitespace-nowrap`}>Gritty Grammar.</h2>
                    </div>
                    <p className='font-bold text-2xl my-4'>Corrects all grammatical errors.</p>
                    <p className={`mb-10 text-lg`}>Tired of making grammer mistakes while you speak?
                        Do you find it hard to constuct correct sentences in the new language you're learning?</p>
                    <Link
                        to='/signup'
                        className=' text-white bg-[#5D387F] py-4 px-3 rounded-lg hover:bg-[#392150] hover:text-white transition-colors'>Try Gritty Grammar For Free!</Link>
                </div>

                <div className={`${styles.hero_img__container} relative w-[20em] mx-auto shadow-lg -mt-10  shadow-black rounded-2xl z-10 md:min-w-[20em]`}>
                    <div className={`${styles.correction}`}>
                        <img
                            src={purpleWoman}
                            alt='mic'
                            className=' w-[20em] '
                        />
                    </div>
                </div>
                {/* <div>
                {status?.map((item, index) => {
                    return (
                        <div key={index}>
                            {console.log(item[Object.keys(item)].status)}
                            <p>{Object.keys(item)} Status: {item[Object.keys(item)].status}</p>
                        </div>
                    )
                })}
              </div> */}
            </div>
        </section>
    );
}

export default Hero;