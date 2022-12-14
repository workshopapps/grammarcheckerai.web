import { Toaster } from 'react-hot-toast';
import Converse from '../conversation/converse';

function HomePage() {
  return (
    <div className="flex flex-col justify-center h-full pt-5 w-full">
      <Converse noRive />
      <Toaster />
    </div>
  );
}

export default HomePage;
