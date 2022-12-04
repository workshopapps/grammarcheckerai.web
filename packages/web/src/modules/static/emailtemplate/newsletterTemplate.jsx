import React from 'react';

const NewsletterEmailTemplate = () => {
  return (
    <div className="bg-white px-20 py-14 max-[640px]:p-0">
      <div className="bg-dark-300 w-3/5 mx-auto pt-5 pb-20 px-20 max-[640px]:w-full max-[640px]:px-6 max-[640px]:h-screen">
        <div className="flex justify-center py-10">
          <img src="images/grit.svg" alt="speak better icon" />
        </div>
        <div className="bg-white p-14 space-y-8 max-[640px]:p-8 my-4">
          <h2>Thanks for subscribing to our Newsletter</h2>
          <p>Our emails will keep you informed of the most recent activities and best way to empower your writing </p>

          <p>
            See you soon, <br />
            Team Grit.
          </p>
        </div>
        <div className="bg-white my-4 p-14 space-y-8 max-[640px]:p-8 text-center">
          <h3 className='text-3xl w-4/5 mx-auto max-[640px]:text-xl'>We would like to offer you 20% off for your first time</h3>
          <div>
            <a href="/converse" className="bg-purple-500 px-10 py-4 rounded-md text-white">
              Write to AI Bot
            </a>
          </div>
        </div>
        <p className='text-center text-sm text-cards py-5'>You received this email to confirm your new account registration with Speak Better.</p>
      </div>
    </div>
  );
};

export default NewsletterEmailTemplate;
