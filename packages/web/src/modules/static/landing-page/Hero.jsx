import useTheme from '../../../hooks/useTheme';

import purpleWoman from './assets/hero/purple-woman.png';
import styles from './styles/index.module.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  const context = useTheme();

  return (
    <section data-theme={context.theme} className={`${styles.hero__bg} mt-[0em] pt-10 transition-all `}>
      <div className=" w-[80%] mx-auto py-16 text-center text-[#262626] flex flex-col justify-center items-center gap-32 md:flex-row md:text-left  lg:gap-96">
        <div className={`max-w-4xl relative ${context.theme === 'light' ? 'text-black' : 'text-white'}`}>
          <div
            className={` ${styles.hero__header} relative z-10 max-w-xs mx-auto md:ml-2`}
            hero-head-theme={context.theme}
          >
            <h2 className={` pb-1 text-3xl text-white ${styles.font_w} ${styles.ff_inter} whitespace-nowrap`}>
              Speak Better
            </h2>
          </div>
          <p className="font-bold text-3xl mb-3">corrects all grammar errors.</p>
          <p className={`mb-10 text-lg lg:w-1/2`}>
            Tired of making grammer mistakes while you speak? Do you find it hard to constuct correct sentences in the
            new language you're learning?
          </p>
          <Link
            to="/converse"
            className=" text-white whitespace-nowrap bg-[#5D387F] py-4 px-4 rounded-[12px] hover:bg-[#392150] hover:text-white transition-colors"
          >
            Try Speak Better For Free!
          </Link>
        </div>

        <div
          className={`${styles.hero_img__container} relative w-[20em] mx-auto shadow-lg -mt-10  shadow-[#0000000] rounded-2xl z-10 md:min-w-[20em]`}
        >
          <div className={`${styles.correction}`}>
            <img src={purpleWoman} alt="mic" className=" w-[20em] " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
