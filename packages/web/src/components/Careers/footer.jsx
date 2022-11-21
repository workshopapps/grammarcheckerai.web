import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-500 flex max-[480px]:flex-col-reverse py-10 mt-8 gap-y-4 px-12 max-[480px]:px-7 gap-x-5 justify-center items-center">
      <h4 className="text-center text-white">&copy;2022 GrittyGrammar</h4>
      <div className="flex justify-between text-white text-md text-center gap-x-6 max-[480px]:grid max-[480px]:grid-cols-2 max-[480px]:gap-y-3 max-[480px]:gap-x-3 max-[480px]:text-left">
        {[
          'About us',
          'API status',
          'Blog',
          'Contact us',
          'Careers & Culture',
          'FAQ',
          'Newsletter',
          'Privacy Policy',
          'Reviews and testimonials',
          'Terms of use',
        ].map((item, idx) => (
          <a href="/" key={idx} >
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
