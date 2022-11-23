import FaqBox from './FaqBox';
import { Link } from 'react-router-dom';

const Faq = () => {
    return (
        <div className='bg-[#f5f3f380] py-8'>
            <div className='w-[90%] max-w-xl mx-auto my-7'>
                <div className='text-center'>
                    <h4 className='text-center text-3xl font-black'>FAQ</h4>
                    <p className='mb-7'>If you have further questions, please contact us</p>
                </div>
                <FaqBox
                    question='How does Gritty Grammar work?'
                    details='Download the app, Sign up and get started! 
                    You answer these questions We transcribe to text using 
                    whisper Identify grammatical errors It tells you how 
                    best to construct the sentence'
                />
                <FaqBox
                    question='Can Gritty Grammar translate in all languages? '
                    details='Yes, Gritty Grammar is avaliable to translate into all languages.'
                />
                <FaqBox
                    question='How does Gritty Grammar correct grammatical errors quickly? '
                    details='Gritty Grammar has efficient algorithms designed to identify 
                    mistakes and correct them appriopriately.'
                />
                <Link to='/faq' className='text-[#5D387F]' >See more...</Link>
            </div>
        </div>
    );
}

export default Faq;