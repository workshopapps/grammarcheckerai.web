import ade from './assets/ade.png';
import sarah from './assets/sarah.png';
import chris from './assets/chris.png';

import styles from './styles/index.module.css';
const Testimonials = () => {
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
        'I like how fast it corrects my\
            mistakes and the fact that\
            it makes corrections in the language I am learning',
      name: 'Chris Hampton',
      img: chris,
      occupation: 'Teacher',
    },
  ];

  return (
    <section className="bg-[#f5f3f380] py-10 text-[#525252]">
      <h3 className="text-center mb-10 text-xl md:text-3xl font-black">See what our customers are saying</h3>
      <div className="w-[90%] mx-auto flex flex-col gap-5 sm:flex-row justify-center">
        {testimonyDetails.map((data) => {
          return (
            <article key={data.name} className="bg-white px-4 py-12 shadow-sm max-w-sm rounded-lg mx-auto">
              <p className={`${styles._quotes} relative`}>{data.testimony}</p>
              <div className="flex gap-3 items-cente mt-6">
                <img src={data.img} alt={data.name} className="w-10 h-10" />
                <div>
                  <h4 className='font-black'>{data.name}</h4>
                  <small>{data.occupation}</small>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
