import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/images/logo2.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const NewsletterUnsubscribe = () => {

     const [subscribedEmail, setSubscribedEmail] = useState('');
     const [reason, setReason] = useState('');
     const error = (message) => toast.error(message);
     const success = (message) => toast.success(message);
     const url = `https://api.speakbetter.hng.tech/v1/unsubscribe/newsletter`;
   
     useEffect(() => {
       localStorage.setItem('email', subscribedEmail);
     }, [subscribedEmail]);
   
     const handleSubmit = (e) => {
       e.preventDefault();
       if (subscribedEmail === '') {
         error('Please enter a valid email');
         return;
       } else {
         axios.post(url, {
             email: subscribedEmail,
           })
           .then((res) => {
             console.log(res);
             success(res.data.message);
           })
           .catch((err) => {
             console.log(err);
             error(err.response.data.message);
           });
       }
     };



     return(
          <section>
               <div>
                <img  className='m-8' src={logoImg} alt="" />
               <div className='p-4 max-w-lg flex justify-center mx-auto'>
                    <form
                     onSubmit={handleSubmit}
                     className='p-4 shadow-lg rounded-lg border-t-4 border-[#5d387f] '>
                         <div className='text-base border-l-4 border-[#bda6d3] p-2 pl-4 bg-[#f1ebf5]'>
                              <p>We&apos;re sorry to see you go, but hey, no hard feelings, hopefully we will see you back one day.</p>
                              <p>
                                   Please fill in your email address in order to unsubscribe from the list.
                              </p>
                              <br />
                              <p>You will receive an email to confirm your unsubscription, just to make sure this is not an accident or somebody else tries to unsubscribe you.</p>
                         </div>
                         <div className='my-6'>
                              <div className="flex-col mb-3">
                                   <label className="mb-4">Email</label>
                                   <input 
                                    className="w-full border border-[#bda6d3] rounded p-2 outline-none"
                                   type="email"
                                   placeholder="example@gmail.com"
                                   onChange={(e) => setSubscribedEmail(e.target.value)}
                                   
                                   />
                              </div>
                              <div className="flex-col mb-3">
                                   <label className="mb-3">Reason for unsubscribing</label>
                                   <textarea 
                                   className="w-full border border-[#bda6d3] rounded p-2 h-48 outline-none"
                                   type="text"
                                   placeholder="reasons..."
                                   required
                                   onChange={(e) => setReason(e.target.value)}
                              />
                              </div>
                         </div>
                         <button className=" border border-[#bda6d3] rounded p-2 flex justify-right ml-auto bg-[#f5f4f6]">Unsubscribe</button>
                    </form>

                    
               </div>
               <Toaster />
               </div>
          </section>
     )
}

export default NewsletterUnsubscribe