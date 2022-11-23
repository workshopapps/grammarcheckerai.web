import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { arrowRightIcon, BritishFlagIcon, infinityIcon, languageIcon, maximizeIcon, searchIcon } from '../../../assets';
import FontAdjustment from './font-adjustment/font-adjustment';
import HelpSupport from './help-support/help-support';
import Languages from './language/languages';
import SettingOption from './setting-list/setting-list';
import LanguageOption from './language/language-option';
import axios from 'axios';

function Settings() {
  const [universalLanguage, setUniversalLanguage] = useState({
    name: 'British English',
    flag: BritishFlagIcon,
    selected: true,
  });

  // Axios Call to the backend to get the user language

  // useEffect(() => {
  //   axios
  //     .post('http://localhost:5000/v1/user/profile/update', {
  //       id: '629f4141b11cbcd395f2b82e',
  //       email: 'demo@mail.com',
  //       firstName: 'first name',
  //       lastName: 'last name',
  //       username: 'Demo-Kid',
  //       language: 'Portugese',
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }, []);

  const changeLanguage = (selected) => {
    setUniversalLanguage(selected[0]);
  };

  const settingList = [
    {
      route: 'language',
      name: 'Language',
      icon: languageIcon,
      child: <Languages openBar={subPage} universalLanguage={universalLanguage} />,
    },
    {
      name: 'Font Size Adjustment',
      icon: maximizeIcon,
      child: <FontAdjustment />,
    },
    {
      route: 'help',
      name: 'Help & Support',
      icon: infinityIcon,
      child: <HelpSupport />,
    },
  ];

  const [languageBar, setLanguageBar] = useState(false);

  function subPage({ route }) {
    switch (route) {
      case 'help':
        <Navigate to="/faq" />;
        break;

      default:
        setLanguageBar((prev) => !prev);
        break;
    }
  }

  return (
    <div className="px-6 font-semibold max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-4 mb-7 md:flex-row justify-between md:items-center">
        <h1 className="text-center sm:border-b border-gray-400 py-4 text-2xl font-semibold md:border-0">Settings</h1>
        <label
          htmlFor="search"
          className="relative flex items-center w-3/4 md:w-1/3 border border-gray-200 rounded-md pr-3"
        >
          <input
            type="text"
            id="search"
            placeholder="Search for a setting"
            className="w-full outline-0 border-0 px-3 py-2 font-normal"
          />
          <img className="" src={searchIcon} alt="search for a setting" />
        </label>
      </div>
      <div className="flex flex-col gap-6">
        {settingList.map((option, index) => {
          return (
            <SettingOption key={index} option={option} arrowRight={arrowRightIcon} openBar={subPage}>
              {option.child}
            </SettingOption>
          );
        })}
      </div>
      {languageBar && <LanguageOption openBar={subPage} setUniversalLanguage={changeLanguage} />}
    </div>
  );
}

export default Settings;
