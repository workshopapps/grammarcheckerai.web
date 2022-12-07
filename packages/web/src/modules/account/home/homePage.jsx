import { Toaster } from 'react-hot-toast';
import Converse from '../conversation/converse';

function HomePage() {
  const userData = JSON.parse(localStorage.getItem('isUserDetails'));

  return (
    <div className="flex flex-col pt-16 lg:ml-[62px] lg:mr-[9rem] sm:mx-[70px] mx-8">
      <div className="heading flex justify-between items-center font-['DM_Sans']">
        <h3 className=" text-[#393939] sm:text-[32px] font-normal text-[24px] leading-10">
          Hello <b>{userData ? userData.username : ''},</b>
        </h3>
        <span className="w-[26px] h-[23px]  rounded-[50%] bg-[#8C54BF] p-[22px] text-white text-[18px] flex justify-center items-center font-medium">
          {userData ? userData.firstName.charAt(0) + '' + userData.lastName.charAt(0) : ''}
        </span>
      </div>
      <div className="w-full">
        <Converse noRive />
      </div>
      <Toaster />
    </div>
  );
}

export default HomePage;
