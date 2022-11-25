import { Link } from 'react-router-dom';
import { arrowRightIcon } from '../../../../assets';

function HelpSupport() {
  return (
    <div className="bg-gray-100 py-3 px-5 rounded-md">
      <div className="flex justify-between items-center py-4 mb-2 border-b-2 border-gray-200 relative">
        <Link className="absolute left-0 bg-blue w-full h-full" to="/faq"></Link>
        <h2>Customer Service</h2>
        <img src={arrowRightIcon} alt="Select a langauge" />
      </div>
      <p className="font-normal">
        With exceptional customer service, try Gritty Grammer, the best Grammer software <br /> out there.
      </p>
    </div>
  );
}

export default HelpSupport;
