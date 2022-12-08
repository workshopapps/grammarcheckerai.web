import useTheme from '../../../hooks/useTheme';
import robot from './assets/robot.png';
import styles from './styles/index.module.css';

const Utilise = () => {
  const context = useTheme();
  return (
    <section
      className={`w-[90%] md:w-[80%] mx-auto ${
        context.theme === 'dark' ? 'shadow-[#1f1e1e]' : 'shadow-[#c5bfbf]'
      } flex flex-col justify-center items-center gap-5 text-center bg-[#5D387F] rounded-md my-20 py-16 px-8 text-white relative
        md:flex-row`}
    >
      <img src={robot} alt="robot" className="absolute -top-9 w-20 left-5 md:-left-8 md:-top-12 md:w-36 lg:w-48" />
      <div className="max-w-sm">
        <h4 className="text-2xl mb-4">Utilise the power of AI</h4>
        <p className="md:px-8">Use Speak Better speech correcton bot and never worry about your speech again.</p>
      </div>
      <button
        type="button"
        className={`${styles._btn} bg-[#E8DDF2] whitespace-nowrap rounded-md text-[#263238] hover:bg-[#c9a3f0] hover:text-black transition-colors`}
      >
        Download the App
      </button>
    </section>
  );
};

export default Utilise;
