import React from 'react';

const SignInTemplate = () => {
  return (
    <div className="bg-white p-20 max-[640px]:p-0">
      <div className="bg-dark-300 w-3/5 mx-auto pt-5 pb-20 px-20 max-[640px]:w-full max-[640px]:px-6 max-[640px]:h-screen">
        <div className="flex justify-center py-10">
          <img src="images/grit.svg" alt="speak better icon" />
        </div>
        <div className="bg-white p-14 space-y-8 max-[640px]:p-8">
          <h2>Welcome to Speak Better</h2>
          <p>Consequat non nisl parturient et magna sed praesent at tincidunt. Nunc sem imperdiet purus elementum.</p>
          <p>
            Hendrerit tincidunt bibendum tortor in cursus ipsum. Sit metus tortor sit interdum integer gravida enim
            diam.
          </p>
          <p>
            Duis sit risus enim cursus ac magna. Mattis dolor rhoncus blandit quisque. Odio sit nibh sed nisi sapien.
          </p>
          <h6>Team Grit.</h6>
          <div>
            <a href="/home" className="bg-purple-500 p-3 rounded-md text-white ">
              Open Speak Better
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInTemplate;
