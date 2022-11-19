import React from 'react';
import rater1 from '../../../assets/raters/rater1.png';
import rater2 from '../../../assets/raters/rater2.png';
import rater3 from '../../../assets/raters/rater3.png';
import rater4 from '../../../assets/raters/rater4.png';
import stars from '../../../assets/raters/star.png';
import starbar5 from '../../../assets/raters/bars/5starbar.png';
import starbar4 from '../../../assets/raters/bars/4starbar.png';
import starbar3 from '../../../assets/raters/bars/3starbar.png';
import starbar2 from '../../../assets/raters/bars/2starbar.png';

export default function Ratings() {
  const ratingsData = [
    {
      img: rater1,
      stars: 5,
      date: '11/16/22',
      review:
        'Simply a wonderful app that corrects our errors whenever we need a little assistance. This app is great!! I love this company, its excellent interface, and execution.',
    },
    {
      img: rater2,
      stars: 5,
      date: '11/16/22',
      review:
        'A great assistant! Gritty Grammar Is my best writing buddy! I always have it check my writings. Been using it for a while now and love it!',
    },
    {
      img: rater3,
      stars: 5,
      date: '11/16/22',
      review:
        "I love the app it's helping me learning how to speak with the right intonation. It saved me from sounding retarded to people many times.",
    },
    {
      img: rater4,
      stars: 4,
      date: '11/16/22',
      review:
        'I have only been using the free version for about 24 hours. I appreciate how it is improving my grammar. Gritty Grammar has improved my use of commas (my downfall), word intonation, and capitalization - in just 24 hours of use!',
    },
  ];

  return (
    <div className="p">
      <h1 className=''>Ratings and Reviews</h1>
      <p>Ratings and reviews are verified and are from people who use the same type of device that you use</p>
      <section className='flex'>
        <div>
          <h2>4.6</h2>
          <span className="flex">
            {[...Array(5)].map((it, index) => {
              return <img src={stars} key={index} alt="" />;
            })}
          </span>
          <p>10,0001</p>
        </div>
        <div>
          <div className="flex m-2 items-center space-x-4">
            <span> 5 </span>
            <img src={starbar5} alt="" className="h-2" />
          </div>
          <div className="flex m-2 items-center space-x-4">
            <span> 4 </span>
            <img src={starbar4} alt="" className="h-2" />
          </div>
          <div className="flex m-2 items-center space-x-4">
            <span> 3 </span>
            <img src={starbar3} alt="" className="h-2" />
          </div>
          <div className="flex m-2 items-center space-x-4">
            <span> 2 </span>
            <img src={starbar2} alt="" className="h-2" />
          </div>
          <div className="flex m-2 items-center space-x-4">
            <span> 1 </span>
            <img src={starbar2} alt="" className="h-2" />
          </div>
        </div>
      </section>
      <main>
        {ratingsData.map((rating) => {
          return (
            <section key={rating.id}>
              <div>
                <img src={rating.img} alt="" />
                <span className="flex">
                  {[...Array(rating.stars)].map((it, index) => {
                    return <img src={stars} key={index} alt="" />;
                  })}
                </span>
                <p>{rating.date}</p>
              </div>
              <div>
                <p>{rating.review}</p>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
