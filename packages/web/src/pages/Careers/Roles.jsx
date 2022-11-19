import React, { useState } from 'react';
import SelectDropdown from '../../components/Select/select';

const Roles = () => {
  const getInitialState = () => {
    const value = '';
    return value;
  };

  const roles = ['Sales', 'Marketing'];
  const [selectedRole, setSelectedRole] = useState(getInitialState);

  const handleChange = (evt) => {
    setSelectedRole(evt.target.value);
  };

  return (
    <div className=" py-10 space-y-6 px-72">
      <h3 className="font-bold text-green-800 text-4xl text-center">Open Roles</h3>
      <p className='py-8'>
        Gritty Grammar is excited to offer a 100% remote working model. Team members can work primarily remotely from
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
          <p className="text-center w-3/5 mx-auto py-16 text-gray-500">
            Gritty Grammar does not have any open roles for sales at the moment. However, if you feel you have something
            to bring to the table - send an email to{' '}
            <a href="recruitment@grittygrammar.com" className="text-blue-500">
              recruitment@grittygrammar.com
            </a>
          </p>
        )}
        {selectedRole === 'Marketing' && (
          <div className="space-y-3 py-8">
            {['Analyst Relations Manager', 'Chief Marketing Officer'].map((role, idx) => (
              <div key={idx} className="flex justify-between items-center border-t py-4">
                <div className='space-y-2'>
                  <h4>{role}</h4>
                  <div className="flex gap-3">
                    <div className="flex gap-1">
                      <img src="/images/location.svg" alt="loaction" />
                      <h4 className='text-sm'>100% remote</h4>
                    </div>
                    <div className="flex gap-1">
                      <img src="/images/clock.svg" alt="clock" />
                      <h4 className='text-sm'>Full-time</h4>
                    </div>
                  </div>
                </div>
                <button>Apply</button>
              </div>
            ))}
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default Roles;
