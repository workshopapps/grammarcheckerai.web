
import styles from './styles/index.module.css';

const NewsLetter = () => {
    return (
        <section className="w-[90%] max-w-lg mx-auto text-center flex flex-col justify-center gap-5 my-36 pb-20">
            <h5 className="text-xl font-black">Be the first to know</h5>
            <p>Subscribe to out newsletter and  be the first to know about new updates
                and news, but no spam, scouts honor!</p>
            
            <div className='relative'>
                <input type='email'
                    placeholder='Your email address'
                    className={`${styles.subscribe} py-4 px-3 w-[100%] rounded-md shadow-sm`}
                />
                <button
                    type="submit"
                    className={`${styles._btn} bg-[#5D387F] text-[#E8DDF2] absolute right-3 top-[15%] hover:bg-[#392150] hover:text-white transition-colors`}>
                    Subscribe
                </button>
            </div>
        </section>
    );
}

export default NewsLetter;