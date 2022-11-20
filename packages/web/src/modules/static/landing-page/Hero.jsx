import micIcon from './assets/mic.png';

const Hero = () => {
    return (
        <section className='bg-white '>
            <div className='max-w-[1220px] w-[90%] mx-auto py-16 md:py-44 text-center text-[#262626] flex flex-col justify-center items-center gap-32'>
                <div>
                    <h2 className='pb-2 text-2xl md:text-4xl'>What would you like to say today?</h2>
                    <p>Each conversation brings you close to fluency.</p>
                </div>

                <div className=' h-24 w-24 bg-[#5D387F] flex justify-center items-center p-4 rounded-full'>
                    <img src={micIcon} alt='mic' />
                </div>
                <p>Tap the microphone to begin</p>
            </div>
        </section>
    );
}

export default Hero;