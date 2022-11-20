import styles from './styles/index.module.css';

const Cta = () => {
  return (
      <section className='bg-[#E8DDF2] py-12'>
          <div className='w-[90%] max-w-lg mx-auto flex flex-col justify-center items-center gap-5 text-center text-[#5A5A5A]'>
              <h4 className='text-2xl'>Try Quick Transcibe for Free</h4>
              <p>Set up your personal account, free forever
                  and never worry about an error in your speech again.
              </p>
              <button className={`${styles._btn} bg-[#5D387F] text-[#E8DDF2]`} type='button'>Get Started</button>
          </div>
    </section>
  )
}

export default Cta;