import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  arrowRightIcon,
  BritishFlagIcon,
  FrenchFlagIcon,
  SpanishFlagIcon,
  RussianFlagIcon,
  infinityIcon,
  languageIcon,
  maximizeIcon,
  searchIcon,
  ChineseFlagIcon,
  GermanyFlagIcon,
  ItalianFlagIcon,
} from '../../../assets';
import FontAdjustment from './font-adjustment/font-adjustment';
import HelpSupport from './help-support/help-support';
import Languages from './language/languages';
import SettingOption from './setting-list/setting-list';
import LanguageOption from './language/language-option';
import axios from 'axios';
// import { useLocalStorage } from '../../../hooks/useLocalStorage';

function Settings() {
  const [languageList, setLanguage] = useState([
    { name: 'English', flag: BritishFlagIcon },
    { name: 'French', flag: FrenchFlagIcon },
    { name: 'Spanish', flag: SpanishFlagIcon },
    { name: 'German', flag: GermanyFlagIcon },
    { name: 'Russian', flag: RussianFlagIcon },
    { name: 'Italian', flag: ItalianFlagIcon },
    { name: 'Chinese', flag: ChineseFlagIcon },
  ]);

  // const [userData, updateUserData] = useLocalStorage('grittyUserSignedIn');
  // Get User details but its not done yet

  // Axios Call to the backend to get the user language
  const config = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzYjgyZDNiYi1iN2U4LTRmYTYtYWJhNy05NGI4YWYzNjk5NDIiLCJpYXQiOjE2NjkzNzExNDcsImV4cCI6MTY2OTYzMDM0N30.DaE1P0kXmk7QshwouDeABhvEK6XqbaPzP6QKEgX3oSg', // I added my token here
    },
  };
  let UserDetails;

  const getLanguage = async () => {
    await axios
      .get('http://grittygrammar.hng.tech/api/v1/user/profile/3b82d3bb-b7e8-4fa6-aba7-94b8af369942', config) // Used my login details ID here as well
      .then((response) => {
        UserDetails = response.data.Detail;
        const userLanguage = response.data.Detail.language;

        setLanguage((prev) =>
          prev.map((obj) => {
            if (obj.name === userLanguage) {
              return { ...obj, selected: true };
            }
            return { ...obj, selected: false };
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLanguage();
  }, [languageList]);

  const changeLanguage = (selected) => {
    setLanguage((prev) =>
      prev.map((obj) => {
        if (obj === selected) {
          return { ...obj, selected: true };
        }
        return { ...obj, selected: false };
      }),
    );

    axios
      .post(
        'http://grittygrammar.hng.tech/api/v1/user/profile/update',
        { ...UserDetails, language: selected.name },
        config,
      )
      .then(() => {
        subPage();
        // updateUserData((prev) => ({ ...prev, language: selected.name }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const settingList = [
    {
      route: 'language',
      name: 'Language',
      icon: languageIcon,
      child: <Languages openBar={subPage} universalLanguage={languageList} />,
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
  let navigate = useNavigate();

  function subPage(route) {
    switch (route) {
      case 'help':
        navigate('/faq');
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
      {languageBar && <LanguageOption openBar={subPage} languageList={languageList} changeLanguage={changeLanguage} />}
    </div>
  );
}

export default Settings;
