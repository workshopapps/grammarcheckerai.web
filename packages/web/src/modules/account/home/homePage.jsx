import { Toaster } from 'react-hot-toast';
import Converse from '../conversation/converse';

function HomePage() {
  return (
    <div className="flex flex-col pt-5 lg:ml-[62px] lg:mr-[9rem] sm:mx-[70px] mx-8">
      <div className="w-full">
        <Converse noRive />
      </div>
      <Toaster />
    </div>
  );
}

export default HomePage;
