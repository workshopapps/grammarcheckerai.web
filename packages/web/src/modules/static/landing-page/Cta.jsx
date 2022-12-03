import styles from './styles/index.module.css';
import { Link } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';

const Cta = () => {
  const context = useTheme();
  const dark = context.theme === 'dark';
  return (
    <section className={`${dark ? 'bg-[#000]' : 'bg-[#ffff]'} py-12`}>
      <div className="w-[80%] mx-auto flex flex-col justify-center items-center md:items-start gap-5 text-center md:text-left text-[#5A5A5A]">
        <h4 className={`${dark ? 'text-[#ffff]' : 'text-[#000]'} text-xl md:text-3xl font-black`}>
          Try Quick Transcibe for Free
        </h4>
        <p className={`-mt-2 ${dark ? 'text-[#ffff]' : 'text-[#000]'}`}>
          Set up your personal account, free forever and never worry about an error in your speech again.
        </p>
        <Link
          to="/signup"
          className={`${styles._btn} bg-[#5D387F] rounded-[12px] text-white hover:bg-[#392150] hover:text-[#ffff] transition-colors `}
          type="button"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Cta;
