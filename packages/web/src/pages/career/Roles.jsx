import React, { useState } from 'react';
import Footer from '../../modules/static/landing-page/Footer';
import Navbar from '../../components/Navbar';

import SelectDropdown from '../../components/Select/select';

const Roles = () => {
  const roles = ['Sales', 'Marketing'];
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleChange = (evt) => {
    setSelectedRole(evt.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className=" py-10 space-y-6 px-72 max-[480px]:px-4 text-dark-200">
        <h3 className="font-bold text-purple-500 text-4xl text-center">Open Roles</h3>
        <p className="py-8 text-dark-200">
          Speak Better is excited to offer a 100% remote working model. Team members can work primarily remotely from
          anywhere in the world as long as you deliver your task on time. We believe this balanced, flexible approach
          gives our team members the best of both worlds: unlock creativity, fuels innovation and you also have time for
          personal activities.
        </p>
        <div className="w-44 my-4">
          <SelectDropdown values={roles} options={roles} handleChange={handleChange} />
        </div>
        <div className="py-10">
          <h3 className="text-bold text-2xl">{selectedRole}</h3>

          {selectedRole === 'Sales' && (
            <p className="text-center w-3/5 mx-auto py-16 text-gray-500 max-[480px]:w-full">
              Speak Better does not have any open roles for sales at the moment. However, if you feel you have something
              to bring to the table - send an email to{' '}
              <a href="recruitment@speakbetter.com" className="text-blue-500">
                recruitment@speakbetter.com
              </a>
            </p>
          )}
          {selectedRole === 'Marketing' && (
            <div className="space-y-3 py-8">
              {['Analyst Relations Manager', 'Chief Marketing Officer'].map((role, idx) => (
                <div key={idx} className="flex justify-between items-center border-t py-4">
                  <div className="space-y-2">
                    <h4>{role}</h4>
                    <div className="flex gap-3">
                      <div className="flex gap-1">
                        <img src="/images/location.svg" alt="loaction" />
                        <h4 className="text-sm">100% remote</h4>
                      </div>
                      <div className="flex gap-1">
                        <img src="/images/clock.svg" alt="clock" />
                        <h4 className="text-sm">Full-time</h4>
                      </div>
                    </div>
                  </div>
                  <a href="/apply" className="bg-purple-primary text-white p-2 rounded-lg px-8">
                    Apply
                  </a>
                </div>
              ))}
              <hr />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Roles;
