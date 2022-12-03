import useTheme from '../../../hooks/useTheme';
import { useState } from 'react';
import step1Img from './assets/step-1.png';
import step2Img from './assets/step-2.png';
import step3Img from './assets/step-3.png';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles/index.module.css';

const HowToUse = () => {
  const context = useTheme();
  const dark = context.theme === 'dark';
  const btns = [
    {
      step: 1,
      title:
        'Tap on the mic and start up\
                a conversation with Doting Piper our AI bot,\
                talk about anything',
      img: step1Img,
    },
    {
      step: 2,
      title: 'Record your speech',
      img: step2Img,
    },
    {
      step: 3,
      title: 'The AI bot transcribes your speech,\
                 highlights errors and provides corrections.',
      img: step3Img,
    },
  ];
  const [active, setActive] = useState(btns[0]);

  return (
<section className={`${dark ? 'bg-[#211f21]' : 'bg-[#ffff]'} py-10  transition-all`}>
      <div className="w-[80%] mx-auto my-6 ">
        <h3 className={`text-xl text-center md:text-left ${context.theme === 'dark' ? 'text-[#ffffff]' : null} md:text-3xl -mb-10 font-black`}>
          How You Can Use Speak Better In Three Tiny Steps
        </h3>
        <div className="md:flex md:justify-between md:items-center mt-12 lg:gap-96">
          <div className="flex flex-col max-w-xs my-9 gap-4 border-l-[1px] border-[#afc1ca]">
            {btns.map((btn) => {
              return (
                <button
                  key={btn.step}
                  type="button"
                  className={`${btn.step === active.step ? styles.step_active : 'transparent'
                    }  hover:border-[#BA7CFE] text-left pl-7 min-h-max relative h-28 `}
                  onClick={() => setActive(btn)}
                  step-theme={context.theme}
                >
                  <span className={`${dark ? 'text-[#BA7CFE]' : 'text-[#000]'} ${active.step === btn.step && 'text-[#9653dd]'}  block font-black text-lg`}>Step {btn.step} </span>
                  <span className={`${active.step ? '' : styles.step_active} ${dark && 'text-white'}` }> {btn.title} </span> 
                  {/* {btn.title}  */}
                  {btn.step === active.step ? (
                    <motion.div className="absolute top-0 -left-1 h-full w-1 bg-[#BA7CFE] block" layoutId="underline" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="bg-[#8C54BF] py-6 px-6 w-[21em] mx-auto md:w-[39em] max-w-3xl rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                transition={{
                  damping: 160,
                }}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
              >
                <img src={active.img} alt={active.title} className="w-60 mx-auto md:w-[100%]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
