import { Toaster } from 'react-hot-toast';
import Converse from '../conversation/converse';

function HomePage() {
  return (
    <div className="flex flex-col justify-center h-full pt-5 w-full">
      <div className="w-full ">
        <Converse noRive />
      </div>
      <Toaster />
    </div>
  );
}

export default HomePage;
