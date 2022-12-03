import React, { useState } from 'react';
import Footer from '../../components/Careers/footer';
import Navbar from '../../components/Navbar';
import  "./Roles.css"



['Sales', 'Marketing' ,'Front-End','Back-end','Design', 'Corporate'];
const Roles = () => {
  const roles = [{
    id: 1,
    value: 'Design',

  },
  {
    id: 2,
    value: 'Marketing',
    
  },
  {
    id: 3,
    value: 'Front-End',
    
  },
  {
    id: 4,
    value: 'Back-end',
    
  },{
    id: 5,
    value: 'Sales',
    
  },{
    id: 6,
    value: 'Corporate',
  }
]
  const [selectedRole, setSelectedRole] = useState('Sales');

  const handleChange = (evt) => {
    setSelectedRole(evt.target.value);
  };

  return (
    <div>
       <Navbar />
      <div className= "_page">
        
        <div className='_t'>
          <h3 className=" text-2xl text-center">Open Roles</h3>
          <p className=" text-sm py-8 text-dark-150 mb-5" >
           Speak Better is excited to offer a 100% remote working model. Team members can work primarily remotely from
            anywhere in the world as long as you deliver your task on time. We believe this balanced, flexible approach
            gives our team members the best of both worlds: unlock creativity, fuels innovation and you also have time for
            personal activities.
          </p>
          <div className="py-10">
          {roles.map((button) => {
          
            return <button className='_p ' onClick= {() => setSelectedRole(button.value)} type="submit">{button.value}</button>
          })}
          
          
          
              {selectedRole === 'Sales' &&  (
                <p className="text-center w-3/5 mx-auto py-16 text-gray-500">
                 No open roles at the moment
                 
                </p>
              )}
              
          {selectedRole === 'Design' &&  (
                <p className="text-center w-3/5 mx-auto py-16 text-gray-500 max-[480px]:w-full">
                   No open roles at the moment
          
                </p>
              )}
              
          {selectedRole === 'Front-End' &&  (
                <p className="text-center w-3/5 mx-auto py-16 text-gray-500 max-[480px]:w-full">
                    No open roles at the moment
          
                </p>
              )}
              
          {selectedRole === 'Back-end' &&  (
                <p className="text-center w-3/5 mx-auto py-16 text-gray-500 max-[480px]:w-full">
                   No open roles at the moment
          
                </p>
              )}
              
          {selectedRole === 'Corporate' &&  (
                <p className="text-center w-3/5 mx-auto py-16 text-gray-500 max-[480px]:w-full">
                    No open roles at the moment
          
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
        </div>
      <Footer/>
    </div>
  );
};

export default Roles;
