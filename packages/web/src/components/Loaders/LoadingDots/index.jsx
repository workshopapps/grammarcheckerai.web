import styles from './index.module.css';

const LoadingDots = () => {
  return (
    <div className="loading_dots bg-gray-200 flex space-x-1 py-2 px-2 justify-center rounded-md ">
      <div className={`bg-gray-600 w-2 h-2 rounded-full animate-bounce ${styles.circle_one}`}></div>
      <div className={`bg-gray-600 w-2 h-2 rounded-full animate-bounce ${styles.circle_two}`}></div>
      <div className={`bg-gray-600 w-2 h-2 rounded-full animate-bounce ${styles.circle_three}`}></div>
    </div>
  );
};

export default LoadingDots;
