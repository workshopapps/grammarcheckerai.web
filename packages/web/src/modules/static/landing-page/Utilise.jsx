import robot from './assets/robot.png';
import styles from './styles/index.module.css';

const Utilise = () => {
    return (
        <section className='w-[90%] max-w-7xl mx-auto shadow-xl shadow-[#c5bfbf] flex flex-col justify-center items-center gap-5 text-center bg-[#5D387F] rounded-md my-20 py-16 px-8 text-white relative
        md:flex-row'>
            <img src={robot} alt='robot' className='absolute -top-9 w-20 left-5 md:w-40' />
            <div className='max-w-sm'>
                <h4 className='text-2xl mb-4'>Utilise the power of AI</h4>
                <p>Use Gritty Grammar speech correcton bot and never
                    worry about your speech again.</p>
            </div>
            <button type='button' className={`${styles._btn} bg-[#E8DDF2] whitespace-nowrap text-[#263238] hover:bg-[#c9a3f0] hover:text-black transition-colors`}>Download the App</button>
        </section>
    );
}

export default Utilise;