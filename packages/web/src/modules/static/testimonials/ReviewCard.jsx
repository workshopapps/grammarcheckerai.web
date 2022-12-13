import React from 'react';
import emblem from '../../../assets/images/emblem.png';
import sad from '../../../assets/images/sad.png';
import happy from '../../../assets/images/happy.png';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
};

export const ReviewCard = ({ closeModal, postReview }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const [loveSpeakBetter, setLoveSpeakBetter] = useState(false);
  const [hateSpeakBetter, setHateSpeakBetter] = useState(false);
  const [neutral, setNeutral] = useState(true);

  const [formvalue, setFormvalue] = useState({ comment: '' });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const handleFormsubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('https://api.speakbetter.hng.tech/v1/rating', {
        ratings: currentValue,
        userid: localStorage.getItem('grittyuserid'),
        comment: formvalue.comment,
      })
      .then(() => {
        setSuccessMessage('Thank you for rating SpeakBetter!');
        if (formvalue.comment !== '') {
          postReview(currentValue, formvalue.comment, localStorage.getItem('grittyuserid'));
        }
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        setSuccessMessage('There was an error processing your review');
      });
  };

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/testimonials');
  };

  return (
    <div className="flex justify-center ">
      <div className="fixed bg-gray-300 top-0 h-screen w-screen z-60" />
      <div className="fixed bg-white m-auto w-[98vw] sm:w-3/4 lg:w-1/3 top-1/2 -translate-y-1/2 rounded-2xl z-60 overflow-hidden">
        <img src={emblem} className="mx-auto my-6" />
        {neutral && (
          <main className="">
            <h2 className="font-bold text-center mx-auto my-4"> Enjoying SpeakBetter?</h2>
            <p className="mx-4 text-center">Hi there! We’d love to know if you’re having a great experience. </p>
            <div className="flex justify-evenly items-center mt-12 border-t border-slate-800">
              <section
                className="cursor-pointer border-r border-slate-800 w-1/2 py-6 mx-auto text-center"
                onClick={() => {
                  setHateSpeakBetter(true);
                  setNeutral(false);
                }}
              >
                <img src={sad} className="mx-auto" />
                <p>Not Really</p>
              </section>
              <section
                className="cursor-pointer py-6 w-1/2 mx-auto text-center"
                onClick={() => {
                  setLoveSpeakBetter(true);
                  setNeutral(false);
                }}
              >
                <img src={happy} className="mx-auto" />
                <p>Yes</p>
              </section>
            </div>
          </main>
        )}
        {loveSpeakBetter && (
          <>
            <h2 className="text-center font-bold my-2"> Review SpeakBetter</h2>
            <p className="text-center mb-4">How well did we serve you? </p>
            <form className="pb-6" onSubmit={handleFormsubmit}>
              <section>
                <div className="flex justify-center space-x-2 my-2">
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        style={{
                          marginRight: 10,
                          cursor: 'pointer',
                        }}
                      />
                    );
                  })}
                </div>
                <textarea
                  className="w-full border-t px-6 py-3 outline-none border-slate-800 mt-4"
                  placeholder="Describe your experience(optional)"
                  type="text"
                  name="comment"
                  value={formvalue.comment}
                  onChange={handleInput}
                />
              </section>
              <div className="flex justify-evenly mt-4">
                <button
                  onClick={handlePrev}
                  className="text-purple-500 font-bold bg-white px-8 py-4 rounded-lg shadow-sm"
                >
                  Not Now
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    handleFormsubmit;
                  }}
                  className="text-white font-bold bg-purple-500 px-8 py-4 rounded-lg shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
            <p className="font-bold text-purple-500 text-center pb-6">{successMessage}</p>
          </>
        )}
        {hateSpeakBetter && (
          <main>
            <h2 className="text-center font-bold my-4 mx-6">
              {' '}
              We're sorry you are not having a good time with SpeakBetter
            </h2>
            <p className="text-center mx-8 my-4">Would you like to let us know how we can improve your experience? </p>
            <div className="flex flex-col mt-6">
              <button
                className="border-t border-black-500/[.18] text-purple-500 py-4"
                onClick={() => {
                  setLoveSpeakBetter(true);
                  setNeutral(false);
                  setHateSpeakBetter(false);
                }}
              >
                Send Feedback
              </button>
              <button onClick={handlePrev} className="border-t border-black-500/[.18]  text-purple-500 py-4">
                Not Now
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};
