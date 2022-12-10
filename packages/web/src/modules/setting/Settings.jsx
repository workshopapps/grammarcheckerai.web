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
} from '../../assets';
import FontAdjustment from './font-adjustment/font-adjustment';
import HelpSupport from './help-support/help-support';
import Languages from './language/languages';
import SettingOption from './setting-list/setting-list';
import LanguageOption from './language/language-option';
import axios from 'axios';

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

  const [searchTerm, setsearchTerm] = useState('');

  const userId = localStorage.getItem('grittyuserid'); // Get user ID
  const userToken = localStorage.getItem('grittyusertoken'); // Get bearer token

  // Axios Call to the backend to get the user language
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`, // Token Authorization
    },
  };
  let userDetails;

  const getLanguage = async () => {
    await axios
      .get(`https://api.speakbetter.hng.tech/v1/user/profile/${userId}`, config) // Used my login details ID here as well
      .then((response) => {
        userDetails = response.data.data;
        const userLanguage = response.data.data.language;

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
        'https://api.speakbetter.hng.tech/v1/user/profile/update',
        { ...userDetails, language: selected.name },
        config,
      )
      .then(() => {
        subPage();
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
      query: 'language, english, french, spanish, german, russian, italian, chinese',
      child: <Languages openBar={subPage} universalLanguage={languageList} />,
    },
    {
      name: 'Font Size Adjustment',
      icon: maximizeIcon,
      query: 'font size adjustment',
      child: <FontAdjustment />,
    },
    {
      route: 'help',
      name: 'Help & Support',
      icon: infinityIcon,
      query: 'With exceptional customer service, try Gritty Grammer, the best Grammer software out there',
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
    <div className="px-6 font-semibold w-full h-full pt-10 max-w-screen-lg mx-auto">
      <div className=" relative">
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
              onChange={(event) => {
                setsearchTerm(event.target.value);
              }}
            />
            <img className="" src={searchIcon} alt="search for a setting" />
          </label>
        </div>
        <div className="flex flex-col gap-6 w-full">
          {settingList.every((val) => !val.query.toLowerCase().includes(searchTerm.toLowerCase())) ? (
            <div>No results found</div>
          ) : (
            settingList
              .filter((obj) => {
                if (searchTerm === '' || obj.query.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return obj;
                }
              })
              .map((option, index) => {
                return (
                  <SettingOption key={index} option={option} arrowRight={arrowRightIcon} openBar={subPage}>
                    {option.child}
                  </SettingOption>
                );
              })
          )}
        </div>
      </div>
      {languageBar && <LanguageOption openBar={subPage} languageList={languageList} changeLanguage={changeLanguage} />}
    </div>
  );
}

export default Settings;
