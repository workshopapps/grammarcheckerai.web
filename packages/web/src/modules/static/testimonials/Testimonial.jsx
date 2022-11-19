import React from 'react'

import stars from '../../../assets/raters/star.png';
import testimonial1 from '../../../assets/raters/testimonials/testimonial1.png';
import testimonial2 from '../../../assets/raters/testimonials/testimonial2.png';
import testimonial3 from '../../../assets/raters/testimonials/testimonial3.png';
import testimonial4 from '../../../assets/raters/testimonials/testimonial4.png';
import testimonial5 from '../../../assets/raters/testimonials/testimonial5.png';

export default function Testimonial() {
    const testimonials = [
      {
        id: 1,
        date: 'May 8, 2022',
        heading: 'No more disgraceful errors',
        testimony: `“I am a big fan of Gritty Grammar because it takes the fear out of grammar. I've always been scared
                of making grammatical errors, but with this app, I don't have to worry about them anymore.” — Amaka
                Disappoint`,
        image: testimonial1,
      },
      {
        id: 2,
        date: 'Jan 16, 2022',
        heading: 'Perfect for learners across all levels',
        testimony: `“This app is perfect for kids who don't want to spend hours studying grammar or parents who need a
                simple way to teach their kids the basics. It's fun, interactive, and keeps you engaged.” —
                Margareth Tobi`,
        image: testimonial2,
      },
      {
        id: 3,
        date: 'May 8, 2022',
        heading: 'Lovely',
        testimony: `“I love this app! It helps me with my homework, and I feel so much more confident about my English. I
                definitely recommend it to everyone who needs help with grammar.” — Adebayo Rejoice`,
        image: testimonial3,
      },
      {
        id: 4,
        date: 'May 8, 2022',
        heading: 'I like how fast it corrects my mistakes',
        testimony: `“I've never been a huge fan of grammar, but this app makes it fun to learn. I'm definitely
                going to continue using it in the future. My friends keep telling me how much they like my new grammar
                skills!” — Paul`,
        image: testimonial4,
      },
      {
        id: 5,
        date: 'May 8, 2022',
        heading: 'Good app for students',
        testimony: `“I am a teacher, and Gritty Grammar is the perfect app for students to use in class. It's
                interactive and fun so that they don&apos;t even realize they are learning!” — Edward Rose`,
        image: testimonial5,
      },
    ];
  return (
    <div className="mx-32">
      <h1>Users Love What We Do</h1>
      <p>Read the stories of our users who have relied on our product to improve their grammar</p>
        <main className="grid grid-cols-3">
              {testimonials.map(testimony => {
                  return (
                    <section
                      key={testimony.id}
                      className={`flex shadow-md rounded-xl my-6 col-span-2 ${
                        testimony.id % 2 === 0 ? 'col-start-2' : ''
                      }`}
                    >
                      <div className="w-1/3">
                        <img src={testimony.image} alt="" />
                      </div>
                      <div className="m-4 w-2/3 space-y-4">
                        <div>
                          <span className="flex float-right">
                            {[...Array(5)].map((it, index) => {
                              return <img src={stars} key={index} alt="" />;
                            })}
                          </span>
                          <span className='text-xs'>May 8, 2022</span>
                        </div>
                        <div className='space-y-4'>
                          <h3>{testimony.heading}</h3>
                          <p className="text-xs">
                            {testimony.testimony}
                          </p>
                        </div>
                      </div>
                    </section>
                  );
              })}
      </main>
    </div>
  );
}
