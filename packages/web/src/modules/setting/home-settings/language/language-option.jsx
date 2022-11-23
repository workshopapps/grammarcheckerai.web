import {
  arrowRightIcon,
  BritishFlagIcon,
  checkIcon,
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
import { useEffect, useState } from 'react';

function LanguageOption({ openBar, setUniversalLanguage }) {
  const [languageList, setLanguage] = useState([
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
  ]);

  useEffect(() => {
    var selected = languageList.filter((obj) => {
      return obj.selected;
    });

    setUniversalLanguage(selected);
  }, [languageList]);

  const selectLanguage = (id) => {
    setLanguage((arr) =>
      arr.map((obj) => {
        if (obj === id) {
          return { ...obj, selected: true };
        }
        return { ...obj, selected: false };
      }),
    );
  };

  return (
    <div className="absolute -top-5 left-0 w-full h-screen bg-dark-100 px-6 max-w-screen-lg py-5 overflow-y-auto">
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
      <div className="flex flex-col gap-8 h-6/12">
        {languageList.map((language, index) => {
          return (
            <div key={index} className="relative flex justify-between items-center">
              <button className="absolute w-full h-full" onClick={() => selectLanguage(language)}></button>
              <div className="w-full flex items-center gap-3 font-normal">
                <img src={language.flag} alt={language.name} />
                <p>{language.name}</p>
              </div>
              <div
                className={
                  language.selected
                    ? 'w-6 h-6 rounded-full bg-purple-500 border-2 flex justify-center items-center'
                    : 'w-6 h-6 rounded-full bg-white border-2 border-gray-300'
                }
              >
                {language.selected && <img src={checkIcon} alt="check" />}
              </div>
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
