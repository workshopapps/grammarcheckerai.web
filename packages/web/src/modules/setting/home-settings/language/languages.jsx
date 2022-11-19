import { CountryIcon, EditIcon } from '../../../../assets';

function Languages() {
  return (
    <div className="bg-gray-100 py-3 px-5 rounded-md">
      <div className="flex justify-between items-center py-4 mb-1 border-b-2 border-gray-200">
        <h2 className="text-lg">Choose a Language</h2>
        <img src={EditIcon} alt="Select a langauge" />
      </div>
      <div>
        <p>I speak</p>
        <div className="mt-4 flex gap-3 items-center">
          <img src={CountryIcon} alt="British English" />
          <p className="font-normal">British English</p>
        </div>
      </div>
    </div>
  );
}

export default Languages;
