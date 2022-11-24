import { useState } from 'react';
import step1Img from './assets/step-1.png';
import step2Img from './assets/step-2.png';
import step3Img from './assets/step-3.png';

const HowToUse = () => {
    const [index, setIndex] = useState(0);
    const [active, setActive] = useState(null);
    const btns = [
        {
            step: 1,
            title: 'Tap on the mic and start up\
            a conversation with Grit our Ai bot,\
            talk about anything'
        },
        {
            step: 2,
            title: 'Record your speech'
        },
        {
            step: 3,
            title: 'The AI bot transcribes your speech,\
             highlights errors and provides corrections.'
        },
    ];
    const imgs = [
        {
            src: step1Img
        },
        {
            src: step2Img
        },
        {
            src: step3Img
        },
    ]
    const btnsActive = [
        {id: 0},
        {id: 1},
        {id: 2},
      ]
    return (
        <section className="bg-[#f5f3f380] py-10">
            <div className='w-[80%] mx-auto my-6 '>
                <h3 className='text-xl text-center md:text-3xl font-black'>How You Can Use Gritty Grammar In Three Tiny Steps</h3>
                <div className='md:flex md:justify-between md:items-center mt-12'>
                    <div className='flex flex-col max-w-xs my-9 gap-4 border-l-[1px] border-[#afc1ca]'>
                        {btns.map((btn, idx) => {
                            return <button
                                key={btn.step}
                                type="button"
                                className={`${active === idx ? 'border-[#5D387F] border-l-2 text-[#5D387F]' : 'transparent' }  hover:border-[#5D387F] text-left pl-7`}
                                onClick={() => {
                                    setIndex(idx);
                                    setActive(btnsActive[idx].id)
                                }}>
                                <span className='block font-black text-lg'>Step {btn.step} </span>
                                {btn.title}
                            </button>
                        })}
                    </div>

                    <div className='bg-[#5D387F] py-6 px-6 w-[21em] mx-auto md:w-[39em] max-w-3xl rounded-lg '>
                        <img
                            src={imgs[index].src}
                            alt={imgs[index].src}
                            className='w-60 mx-auto md:w-[100%]'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowToUse;