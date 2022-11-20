import FaqBox from './FaqBox';

const Faq = () => {
    return (
        <div className='bg-[#f5f3f380] py-8'>
            <div className='w-[90%] max-w-xl mx-auto my-7'>
                <div className='text-center'>
                    <h4 className='text-center text-3xl'>FAQ</h4>
                    <p className='mb-7'>If you have further questions, please contact us</p>
                </div>
                <FaqBox question='How does Gritty grammer work?' />
                <FaqBox question='Can Gritty Grammer translate in all languages? ' />
                <FaqBox question='Can Gritty grammer translate from one language to another ' />
            </div>
        </div>
    );
}

export default Faq;