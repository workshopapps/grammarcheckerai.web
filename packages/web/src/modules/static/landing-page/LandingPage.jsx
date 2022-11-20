import Charcters from './Charcters';
import Cta from './Cta';
import Faq from './Faq';
import Footer from './Footer';
import Hero from './Hero';
import HowToUse from './HowToUse';
import NewsLetter from './NewsLetter';
import Testimonials from './Testimonials';
import Utilise from './Utilise';

const LandingPage = () => {
    return (
        <div className='bg-[#bbb8b81a]'>
            <Hero />
            <Charcters />
            <HowToUse />
            <Testimonials />
            <Faq />
            <Cta />
            <Utilise />
            <NewsLetter />
            <Footer/>
        </div>
    );
}

export default LandingPage;