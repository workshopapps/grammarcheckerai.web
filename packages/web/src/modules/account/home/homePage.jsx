import chirpy from '../../../assets/chirpy.svg';
import talk from '../../../assets/talk.svg';
import { Link } from 'react-router-dom';

function HomePage() {
  const userData = JSON.parse(localStorage.getItem("isUserDetails"));

  return (
    <div className="flex flex-col pt-16 lg:ml-[62px] lg:mr-[9rem] sm:mx-[70px] mx-8">
      <div className="heading flex justify-between items-center font-['DM_Sans']">
        <h3 className=" text-[#393939] sm:text-[32px] font-normal text-[24px] leading-10">
          Hello <b>{userData ? userData.username : ''},</b>
        </h3>
        <Link to="/me/profile">
          <span className="w-[26px] h-[23px]  rounded-[50%] bg-[#8C54BF] p-[22px] text-white text-[18px] flex justify-center items-center font-medium">
          {userData ? userData.firstName.charAt(0) + '' + userData.lastName.charAt(0) : ""}
          </span>
        </Link>
      </div>
      <div className="flex justify-center items-center flex-col mt-8 font-['inter']">
        <div className="chripy flex flex-col ">
          <div className=" flex justify-center items-center">
            <img
              src={chirpy}
              alt="chirpy bob"
              className=" sm:w-[200px] sm:h-[200px] w-[120px] h-[120px] flex justify-center items-center "
            />
          </div>
          <p className="text-[#393939] font-medium sm:text-[24px] whitespace-nowrap text-[18px] leading-10 ">
            What would you like to say today?
          </p>
        </div>
        <div className="start-convo  flex justify-center items-center flex-col sm:mt-14 mt-20">
          <img src={talk} alt="microphone icon" className="sm:w-[80px] sm:h-[79px] w-[50.9px] h-[50.9px] " /> 
          <p className="text-[#5A5A5A] sm:text-sm text-[12px] mt-3 font-normal">Tap the Microphone to begin</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
