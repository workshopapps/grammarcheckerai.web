import React from 'react';
import { Link } from 'react-router-dom';

import stars from '../../../assets/raters/star.png';
import testimonial1 from '../../../assets/raters/testimonials/testimonial1.png';
import testimonial2 from '../../../assets/raters/testimonials/testimonial2.png';
import testimonial3 from '../../../assets/raters/testimonials/testimonial3.png';
import testimonial4 from '../../../assets/raters/testimonials/testimonial4.png';
import testimonial5 from '../../../assets/raters/testimonials/testimonial5.png';
import ornament2 from '../../../assets/raters/testimonials/ornament2.png';
import Footer from '../landing-page/Footer';

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      date: 'May 8, 2022',
      name: 'Amaka Disappoint',
      heading: 'No more disgraceful errors',
      testimony: `“I am a big fan of Gritty Grammar because it takes the fear out of grammar. I've always been scared
                of making grammatical errors, but with this app, I don't have to worry about them anymore.” — Amaka
                Disappoint`,
      image: testimonial1,
    },
    {
      id: 2,
      date: 'Jan 16, 2022',
      name: 'Magareth Tobi',
      heading: 'Perfect for learners across all levels',
      testimony: `“This app is perfect for kids who don't want to spend hours studying grammar or parents who need a
                simple way to teach their kids the basics. It's fun, interactive, and keeps you engaged.” —
                Margareth Tobi`,
      image: testimonial2,
    },
    {
      id: 3,
      date: 'May 8, 2022',
      name: 'Adebayo Rejoice',
      heading: 'Lovely',
      testimony: `“I love this app! It helps me with my homework, and I feel so much more confident about my English. I
                definitely recommend it to everyone who needs help with grammar.” — Adebayo Rejoice`,
      image: testimonial3,
    },
    {
      id: 4,
      date: 'May 8, 2022',
      name: 'Paul',
      heading: 'I like how fast it corrects my mistakes',
      testimony: `“I've never been a huge fan of grammar, but this app makes it fun to learn. I'm definitely
                going to continue using it in the future. My friends keep telling me how much they like my new grammar
                skills!” — Paul`,
      image: testimonial4,
    },
    {
      id: 5,
      date: 'May 8, 2022',
      name: 'Edward Rose',
      heading: 'Good app for students',
      testimony: `“I am a teacher, and Gritty Grammar is the perfect app for students to use in class. It's
                interactive and fun so that they don&apos;t even realize they are learning!” — Edward Rose`,
      image: testimonial5,
    },
  ];
  return (
    <div>
      <div className="mx-6 lg:mx-32">
        <div className="text-xs my-6">
          <Link to="/ratings" className="text-[#5D387F]">
            {' '}
            &lt; Back{' '}
          </Link>
        </div>
        <h1 className="text-center mt-12 text-lg lg:text-4xl">Users Love What We Do</h1>
        <p className="text-center my-4 text-sm lg:text-lg">
          Read the stories of our users who have relied on our product to improve their grammar
        </p>
        <main className="lg:grid space-y-6 lg:space-y-0 grid-cols-3 gap-8 my-14">
          {testimonials.map((testimony) => {
            return (
              <section
                key={testimony.id}
                className={`lg:flex px-4 py-6 lg:p-0 shadow-md rounded-xl col-span-2 lg:h-56 ${
                  testimony.id % 2 === 0 ? 'col-start-2' : ''
                }`}
              >
                <div className="flex items-center lg:w-52 lg:relative">
                  <img
                    src={ornament2}
                    alt=""
                    className={`hidden lg:block float-left lg:absolute z-10  ${
                      testimony.id % 2 === 0 ? 'hidden' : 'bottom-32 left-0'
                    }`}
                  />
                  <img
                    src={testimony.image}
                    alt=""
                    className="h-20 w-20 rounded-full lg:relative lg:h-full lg:w-full lg:rounded-none z-30"
                  />
                  <div className="lg:hidden ml-6">
                    <p className="font-bold">{testimony.name}</p>
                    <span className="flex float-right ml-4">
                      {[...Array(5)].map((it, index) => {
                        return <img src={stars} key={index} alt="" />;
                      })}
                    </span>
                    <span className="text-xs">May 8, 2022</span>
                  </div>
                </div>
                <div className="lg:w-2/3 space-y-4 lg:relative ">
                  <div className="space-y-4 p-4 lg:relative z-40 lg:h-full bg-white">
                    <div className="hidden lg:block">
                      <span className="flex lg:float-right">
                        {[...Array(5)].map((it, index) => {
                          return <img src={stars} key={index} alt="" />;
                        })}
                      </span>
                      <span className="text-xs">May 8, 2022</span>
                    </div>
                    <div>
                      <h3 className="my-4 text-center lg:text-left">{testimony.heading}</h3>
                      <p className="text-xs">{testimony.testimony}</p>
                    </div>
                  </div>
                  <img
                    src={ornament2}
                    alt=""
                    className={`hidden lg:absolute z-10 ${
                      testimony.id % 2 === 0 ? 'lg:block top-28 right-0 rotate-180 ' : 'hidden'
                    }`}
                  />
                </div>
              </section>
            );
          })}
        </main>
      </div>
      <Footer />
    </div>
  );
}
