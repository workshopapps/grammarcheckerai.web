import { Toaster } from 'react-hot-toast';
import Converse from '../conversation/converse';

function HomePage() {
  return (
    <div className="flex flex-col min-h-fitPage justify-center h-full pt-5 w-full">
      <Converse noRive />
      <Toaster />
    </div>
  );
}

export default HomePage;
