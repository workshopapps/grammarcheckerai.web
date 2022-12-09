import useTheme from '../../../hooks/useTheme';
import ade from './assets/ade.png';
import sarah from './assets/sarah.png';
import chris from './assets/chris.png';

import styles from './styles/index.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MotionContext } from 'framer-motion';

const Testimonials = () => {
  const context = useTheme();
  const dark = context.theme === 'dark';
  const testimonyDetails = [
    {
      testimony:
        'I like how fast it corrects my\
            mistakes and the fact that\
            it makes corrections in the language I am learning',
      name: 'Ade',
      img: ade,
      occupation: 'Foreign Exchange Student',
    },
    {
      testimony:
        'This app has made communication\
            easier for me.I can now handle reports\
            in other languages at work.',
      name: 'Sarah Napilo',
      img: sarah,
      occupation: 'Turkish Reporter',
    },
    {
      testimony:
        'Speak Better has helped my students improve their   communication skills in different languages.  It has boosted their confidence level',
      name: 'Chris Hampton',
      img: chris,
      occupation: 'Teacher',
    },
  ];

  return (
    <section className={`${dark ? 'bg-[#0A0A0A] ' : 'bg-[#fff]'} py-16 text-[#525252]`}>
      <div className="w-[80%] mx-auto">
        <div className="mb-10">
          <h3
            className={`text-center md:text-left ${dark ? 'text-[white]' : null} mb-3 text-xl md:text-3xl font-black`}
          >
            See what our customers are saying
          </h3>
          <p className={`${dark && 'text-white'} text-center md:text-left`}>
            Several case studies have shown that Speak Better helps to significantly sound smarter through simple,
            effective exercises.
          </p>
        </div>
        <div className=" flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between ">
          {testimonyDetails.map((data) => {
            return (
              <article
                key={data.name}
                className="bg-white px-4 py-12 border-[#70707011] border-[1px] max-w-sm min-h-[200px] rounded-lg"
              >
                <p className={`${styles._quotes} relative`}>{data.testimony}</p>
                <div className="flex gap-3 items-cente mt-6">
                  <img src={data.img} alt={data.name} className="w-10 h-10" />
                  <div>
                    <h4 className="font-black">{data.name}</h4>
                    <small>{data.occupation}</small>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
