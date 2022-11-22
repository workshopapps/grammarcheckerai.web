import purpleWoman from './assets/hero/purple-woman.png';
import styles from './styles/index.module.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className={`bg-white `}>
            <div className='max-w-[1220px] w-[90%] mx-auto py-16 text-center text-[#262626] flex flex-col justify-center items-center gap-32 md:flex-row md:text-left md:justify-between lg:gap-96'>
                <div className='max-w-xl'>
                    <h2 className={`pb-2 text-4xl ${styles.font_w} ${styles.ff_inter} md:text-7xl whitespace-nowrap`}>Gritty Grammar.</h2>
                    <p className='font-bold text-2xl italic my-4'>Corrects all grammar <span className={`${styles.errors} relative`}>errors</span></p>
                    <p className={`mb-10 text-lg`}>Tired of making grammer mistakes while you speak?
                        Do you find it hard to constuct correct sentences in the new language you're learning?</p>
                    <Link
                        to='/converse'
                        className=' text-white bg-[#5D387F] py-4 px-3 rounded-lg'>Try Gritty Grammar For Free!</Link>
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
            </div>
        </section>
    );
}

export default Hero;