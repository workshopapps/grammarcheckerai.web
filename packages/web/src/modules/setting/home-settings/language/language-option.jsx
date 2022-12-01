import { arrowRightIcon, checkIcon, searchIcon } from '../../../../assets';
import PropTypes from 'prop-types';

function LanguageOption({ openBar, changeLanguage, languageList }) {
  return (
    <div className="absolute top-0 left-0 z-[150] w-full h-screen bg-dark-100 px-6 py-5 overflow-y-auto">
      <div className="max-w-screen-xl mx-auto">
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
                <button
                  className="absolute w-full h-full"
                  onClick={() => {
                    changeLanguage(language);
                  }}
                ></button>
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
    </div>
  );
}

LanguageOption.propTypes = {
  openBar: PropTypes.func,
  languageList: PropTypes.array,
  changeLanguage: PropTypes.func,
};

export default LanguageOption;
