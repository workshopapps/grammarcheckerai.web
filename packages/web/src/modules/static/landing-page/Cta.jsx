import styles from './styles/index.module.css';
import { Link } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';

const Cta = () => {
  const context = useTheme();
  return (
    <section className={`${context.theme === 'dark' ? 'bg-[#000]' : 'bg-[#ffff]'} py-12`}>
      <div className="w-[90%] max-w-lg mx-auto flex flex-col justify-center items-center gap-5 text-center text-[#5A5A5A]">
        <h4 className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#000]'}  text-2xl font-black`}>Try Quick Transcibe for Free</h4>
        <p className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#000]'}`}>Set up your personal account, free forever and never worry about an error in your speech again.</p>
        <Link
          to='/signup'
          className={`${styles._btn} bg-[#5D387F] text-[#E8DDF2] hover:bg-[#392150] hover:text-[#ffff] transition-colors `} type="button">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Cta;
