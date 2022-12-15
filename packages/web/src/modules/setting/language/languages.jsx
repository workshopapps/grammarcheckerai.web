import { EditIcon } from '../../../assets';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Languages({ openBar, universalLanguage }) {
  const [language, setLanguage] = useState({});

  useEffect(() => {
    universalLanguage.filter((obj) => {
      if (obj.selected) {
        setLanguage(obj);
      }
      return;
    });
  }, [universalLanguage]);

  return (
    <div className="bg-gray-100 py-3 px-5 rounded-md">
      <div className="flex justify-between items-center py-4 mb-1 border-b-2 border-gray-200">
        <h2 className="text-lg">Choose a Language</h2>
        <button onClick={() => openBar('language')}>
          <img src={EditIcon} alt="Select a langauge" />
        </button>
      </div>
      <div>
        <p>I speak</p>
        <button onClick={() => openBar('language')} className="mt-4 flex gap-3 h-[4rem] items-center">
          <img src={language.flag} alt={language.name} />
          <p className="font-normal">{language.name}</p>
        </button>
      </div>
    </div>
  );
}

Languages.propTypes = {
  openBar: PropTypes.func,
  universalLanguage: PropTypes.array,
};

export default Languages;
