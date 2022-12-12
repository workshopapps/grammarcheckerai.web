import { useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { Link } from 'react-router-dom';
import rater1 from '../../../assets/raters/rater1.png';
import rater2 from '../../../assets/raters/rater2.png';
import rater3 from '../../../assets/raters/rater3.png';
import rater4 from '../../../assets/raters/rater4.png';
import stars from '../../../assets/raters/star.png';
import starbar5 from '../../../assets/raters/bars/5starbar.png';
import starbar4 from '../../../assets/raters/bars/4starbar.png';
import starbar3 from '../../../assets/raters/bars/3starbar.png';
import starbar2 from '../../../assets/raters/bars/2starbar.png';
import Footer from '../landing-page/Footer';
import axios from 'axios';

export default function Ratings() {
  const [openReviewModal, setOpenReviewModal] = useState(true);
  const closeModal = () => {
    setOpenReviewModal(false);
  };

  const [ratingsData, setRatingsData] = useState([
    {
      name: 'A Google User',
      id: 1,
      img: rater1,
      stars: 5,
      date: '11/16/2022',
      review:
        'Simply a wonderful app that corrects our errors whenever we need a little assistance. This app is great!! I love this company, its excellent interface, and execution.',
    },
    {
      name: 'A Google User',
      id: 2,
      img: rater2,
      stars: 5,
      date: '11/16/2022',
      review:
        'A great assistant! Speak Better Is my best writing buddy! I always have it check my writings. Been using it for a while now and love it!',
    },
    {
      name: 'A Google User',
      id: 3,
      img: rater3,
      stars: 5,
      date: '11/16/2022',
      review:
        "I love the app it's helping me learning how to speak with the right intonation. It saved me from sounding retarded to people many times.",
    },
    {
      name: 'A Google User',
      id: 4,
      img: rater4,
      stars: 4,
      date: '11/16/2022',
      review:
        'I have only been using the free version for about 24 hours. I appreciate how it is improving my grammar. Speak Better has improved my use of commas (my downfall), word intonation, and capitalization - in just 24 hours of use!',
    },
  ]);

  const userToken = localStorage.getItem('grittyusertoken'); // Get bearer token
  // Axios Call to the backend to get the user language
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`, // Token Authorization
    },
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formatDate = (date) => {
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
  };

  const addRate = async (ratings, comment, userId) => {
    await axios
      .get(`https://api.speakbetter.hng.tech/v1/user/profile/${userId}`, config) // Used my login details ID here as well
      .then((response) => {
        const userDetails = response.data.data;
        console.log(userDetails);
        setRatingsData((prev) => [
          {
            name: `${userDetails.firstName} ${userDetails.lastName}`,
            id: userId,
            imageElement: (
              <div
                style={{ height: '60px', width: '70px' }}
                className="rounded-full text-white mr-6 flex items-center justify-center bg-purple-800 text-uppercase text-center"
              >
                {userDetails.firstName.split('')[0]} {userDetails.lastName.split('')[0]}
              </div>
            ),
            stars: ratings,
            date: formatDate(new Date()),
            review: comment,
          },
          ...prev,
        ]);
      })
      .catch(() => {
        const username = 'You';
        setRatingsData((prev) => [
          {
            name: username,
            id: userId,
            imageElement: (
              <div
                style={{ height: '60px', width: '60px' }}
                className="rounded-full text-white mr-6 flex items-center justify-center bg-purple-800 text-uppercase text-center"
              >
                YOU
              </div>
            ),
            stars: ratings,
            date: formatDate(new Date()),
            review: comment,
          },
          ...prev,
        ]);
      });
  };

  return (
    <div>
      <div className="mx-4 lg:mx-32">
        <div className="flex justify-between my-6">
          <Link to="/testimonials" className="text-[#5D387F] text-xs">
            {' '}
            &lt; Back{' '}
          </Link>
          <Link to="/testimonials" className="text-[#5D387F] text-xs">
            {' '}
            Testimonials &gt;
          </Link>
        </div>
        <h1 className="my-4">Ratings and Reviews</h1>
        <p className="text-xs">
          Ratings and reviews are verified and are from people who use the same type of device that you use
        </p>
        <section className="flex items-center my-12">
          <div className="mr-2 lg:mr-6 space-y-2">
            <h2 className="text-3xl">4.6</h2>
            <span className="flex">
              {[...Array(5)].map((it, index) => {
                return <img src={stars} key={index} alt="" />;
              })}
            </span>
            <p>10,0001</p>
          </div>
          <div className="w-2/3">
            <div className="flex lg:m-2 items-center space-x-4 text-lg">
              <span> 5 </span>
              <img src={starbar5} alt="" className="h-2" />
            </div>
            <div className="flex lg:m-2 items-center space-x-4">
              <span> 4 </span>
              <img src={starbar4} alt="" className="h-2" />
            </div>
            <div className="flex lg:m-2 items-center space-x-4">
              <span> 3 </span>
              <img src={starbar3} alt="" className="h-2" />
            </div>
            <div className="flex lg:m-2 items-center space-x-4">
              <span> 2 </span>
              <img src={starbar2} alt="" className="h-2" />
            </div>
            <div className="flex lg:m-2 items-center space-x-4">
              <span> 1 </span>
              <img src={starbar2} alt="" className="h-2" />
            </div>
          </div>
        </section>
        <main className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-between my-12">
          {ratingsData.map((rating) => {
            return (
              <section key={rating.id} className="space-y-2 my-6">
                <div className="flex items-center">
                  {rating.img ? <img src={rating.img} alt="" className=" mr-6" /> : rating.imageElement}
                  <div className="space-y-1">
                    <p className="text-xs">{rating.name}</p>
                    <span className="flex">
                      {[...Array(rating.stars)].map((it, index) => {
                        return <img src={stars} key={index} alt="" />;
                      })}
                    </span>
                    <p className="text-xs">{rating.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs">{rating.review}</p>
                </div>
              </section>
            );
          })}
        </main>
        {openReviewModal && <ReviewCard postReview={addRate} closeModal={closeModal} />}
      </div>
      <Footer />
    </div>
  );
}
