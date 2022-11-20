import {
  arrowRightIcon,
  BritishFlagIcon,
  ChineseFlagIcon,
  FinnishFlagIcon,
  GermanyFlagIcon,
  HindiFlagIcon,
  ItalianFlagIcon,
  MalayFlagIcon,
  MandarinFlagIcon,
  NorwegianFlagIcon,
  PortugeseFlagIcon,
  searchIcon,
  UAEFlagIcon,
  USAFlagIcon,
} from '../../../../assets';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function LanguageOption({ openBar, setUniversalLanguage }) {
  const languageList = [
    { name: 'Chinese', flag: ChineseFlagIcon },
    { name: 'British English', flag: BritishFlagIcon, selected: true },
    { name: 'Finnish', flag: FinnishFlagIcon },
    { name: 'Hindi', flag: HindiFlagIcon },
    { name: 'Italian', flag: ItalianFlagIcon },
    { name: 'Malay', flag: MalayFlagIcon },
    { name: 'Mandarin', flag: MandarinFlagIcon },
    { name: 'Norwegian', flag: NorwegianFlagIcon },
    { name: 'Portugese', flag: PortugeseFlagIcon },
    { name: 'German', flag: GermanyFlagIcon },
    { name: 'US English', flag: USAFlagIcon },
    { name: 'Arabic', flag: UAEFlagIcon },
  ];

  useEffect(() => {
    var selected = languageList.filter((obj) => {
      return obj.selected;
    });

    setUniversalLanguage(selected);
  });

  return (
    <div className="absolute top-0 left-0 w-full bg-gray-100 px-6 max-w-screen-lg py-4">
      <div className="flex items-center mb-5">
        <button onClick={() => openBar('language')}>
          <img className="-rotate-180" src={arrowRightIcon} alt="Go back" />
        </button>
        <h1 className="text-center w-full">Language</h1>
      </div>
      <div className="relative flex items-center mb-5">
        <input
          type="text"
          placeholder="Find a Language"
          className="w-full border bg-transparent border-gray-300 rounded-md px-3 py-2 font-normal"
        />
        <img className="absolute right-3 block" src={searchIcon} alt="Find a language" />
      </div>
      <div className="flex flex-col gap-8">
        {languageList.map((language, index) => {
          return (
            <div key={index} className="flex justify-between items-center">
              <label htmlFor={language.name} className="w-full flex items-center gap-3 font-normal">
                <img src={language.flag} alt={language.name} />
                <p>{language.name}</p>
              </label>
              <input type="radio" id={language.name} name="language" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

LanguageOption.propTypes = {
  openBar: PropTypes.func,
  setUniversalLanguage: PropTypes.func,
};

export default LanguageOption;
