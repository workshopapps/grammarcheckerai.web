import React, { useState, useEffect } from 'react';
import Culture from '../../components/Careers/culture';
import TeamFeedback from '../../components/Careers/teamFeedback';
import teamData from '../../data/careers/teamData.json';

const Careers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = teamData;
  const sliderScroll = () => {
    if (currentIndex === data.length - 1) {
      return setCurrentIndex(0);
    }

    return setCurrentIndex(currentIndex + 1);
  };
  const previous = () => {
    currentIndex != 0 && setCurrentIndex(currentIndex - 1);
    console.log(currentIndex, 'prev');
  };
  const next = () => {
    data.idx <= 2 && setCurrentIndex(currentIndex + 1);
    console.log(currentIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      sliderScroll();
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <div>
      <section className="bg-purple-500 py-14 text-center space-y-8 text-dark-200">
        <h4 className="text-white text-xl">Careers and Culture</h4>
        <h1 className="text-4xl text-white font-bold sm:text-3xl sm:w-3/5 sm:mx-auto">
          A culture rooted in setting people up for success
        </h1>
        <button className="bg-purple-100 text-dark-200 py-2 px-4 rounded-md">See Open roles</button>
      </section>
      <div className="px-60 py-14 space-y-14 bg-gray-100 sm:px-2 sm:py-8">
        <h4 className="text-center text-xl font-bold text-dark-primary">
          Hear from <span className="text-purple-500">the team</span>
        </h4>
        <div className="flex whitespace-nowrap overflow-hidden sm:whitespace-normal">
          {data?.map(({ img, feedback, name, role, idx }) => (
            <div
              key={idx}
              className="w-full justify-center items-center min-w-full transition-all sm:min-w-fit"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: `1s cubic-bezier(0.39, 0.575,0.565, 1)`,
              }}
            >
              <TeamFeedback img={img} feedback={feedback} name={name} role={role} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-10">
          <button onClick={previous} className="cursor-pointer">
            <img src="images/previous.svg" alt="previous" />
          </button>
          <button onClick={next} className="cursor-pointer">
            <img src="images/next.svg" alt="next" />
          </button>{' '}
        </div>
      </div>
      <Culture />
      <section className="text-center py-10">
        <p className="w-1/2 mx-auto py-6 sm:w-full sm:px-8 sm:pb-10">
          Every member of the team brings something unique to Gritty Grammar which strenghtens the team. We are growing
          and we would like you to join us. Do you think you have what it takes to join the team? Find out how you can
          add your talent and skills to our team and help us push forward our mission!
        </p>
        <a href="/roles" className="bg-purple-800 text-white rounded-lg py-4 px-4">
          Explore Open Roles
        </a>
      </section>
    </div>
  );
};

export default Careers;
