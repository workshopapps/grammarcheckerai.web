import useTheme from '../../../hooks/useTheme';
import styles from './styles/index.module.css';

const NewsLetter = () => {
  const context = useTheme();
  return (
    <section
      className={`${
        context.theme === 'dark' ? 'bg-transparent text-white' : null
      } w-[90%] md:w-[60%] mx-auto text-center flex flex-col justify-center 
        md:items-start md:ml-[10em] gap-5 my-36 py-8`}
    >
      <h5 className="text-xl md:text-3xl font-black -mb-2">Be the first to know</h5>
      <p className="text-center md:text-left">
        Subscribe to out newsletter and be the first to know about new updates and news, but no spam, scouts honor!
      </p>

      <div className="relative md:w-[80%] flex ">
        <input
          type="email"
          placeholder="Your email address"
          className={`${styles.subscribe} rounded-tl-md rounded-bl-md text-black bg-gray-200 placeholder:text-black py-4 px-3 w-[100%] shadow-sm`}
        />
        <button
          type="submit"
          className={` py-4 px-7 bg-[#5D387F] text-[#E8DDF2] rounded-tr-md rounded-br-md hover:bg-[#392150] hover:text-white transition-colors`}
        >
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewsLetter;
