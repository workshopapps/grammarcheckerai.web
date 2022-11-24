import cheeryToby from './assets/cheery-toby.png';
import chirpyBob from './assets/chirpy-bob.png';
import dotingPiper from './assets/doting-piper.png';
import pensiveMark from './assets/pensive-mark.png';


const Charcters = () => {
    const charactersInfo = [
        {
            img: cheeryToby,
            name: 'Cheery Toby',
            description: 'Toby is a smart and merry bot\
            Always there to cheer for you\
            and keeps the learning fun.'
        },
        {
            img: dotingPiper,
            name: 'Doting Piper',
            description: 'Piper is a momma bear, she\
            checks on you regularly, she\
            goes all out for your growth.'
        },
        {
            img: chirpyBob,
            name: 'Chirpy Bob',
            description: 'Bob is a jovial bot and active,\
            always ready to help with your\
            speech needs 23/7.'
        },
        {
            img: pensiveMark,
            name: 'Pensive Mark',
            description: 'Mark is a thoughtful and\
            organized bot. He ensures\
            you have everything you need.'
        },
       
    ]
    return (
        <section className='bg-[#f5f3f380] py-10'>
            <div className='w-[90%] mx-auto max-w-[1220px] '>
                <header className=' text-[#263238] py-7 max-w-md'>
                    <h2 className='mb-4 text-xl md:text-2xl font-black md:whitespace-nowrap'>Talk to our AI bot in different characters</h2>
                    <p>Make your learning experience more personalised and fun.
                        Talk to grit in different voices, avatars and personalities.
                    </p>
                </header>
          
                <div className='bg-transparent text-[#fff] md:shadow-lg md:shadow-black flex flex-col gap-5
            md:flex-row md:items-center md:justify-center md:gap-9 md:px-5 md:bg-[#5D387F] md:rounded-2xl md:mt-20'>
                    
                    <div className='bg-[#5D387F] flex mb-12 py-6 px-3 text-sm rounded-2xl mt-8 
                md:mt-0 md:mb-0 md:gap-9'>
                        {charactersInfo.slice(0, 2).map((char) => {
                            return <article
                                key={char.name}
                                className='mr-4 relative max-w-xs'>
                                <img
                                    src={char.img}
                                    alt={char.name}
                                    className='w-12 absolute -top-14 rounded-full bg-white md:w-20 md:-top-[6em]'
                                />
                                <h3
                                    className='text-lg mb-2 md:mt-8'>
                                    {char.name}
                                </h3>
                                <p className='opacity-90'>{char.description}</p>
                            </article>
                        })}
                    </div>

                    <div className='bg-[#5D387F] flex mb-12 py-6 px-3 text-sm rounded-2xl md:mb-0 md:gap-9'>
                        {charactersInfo.slice(2).map((char) => {
                            return <article
                                key={char.name}
                                className='mr-4 relative max-w-xs'>
                                <img
                                    src={char.img}
                                    alt={char.name}
                                    className='w-12 absolute -top-14 rounded-full bg-white 
                                md:w-20 md:-top-[6em]'
                                />
                                <h3
                                    className='text-lg mb-2 md:mt-8'>
                                    {char.name}
                                </h3>
                                <p className='opacity-90'>{char.description}</p>
                            </article>
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Charcters;