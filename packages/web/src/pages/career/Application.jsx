import React from 'react';
import FileUploader from '../../components/Careers/fileUpload';
import Header from '../../components/Careers/header';

const Application = () => {
  return (
 <div>
  <Header/>
     <div className="px-56 py-10 space-y-20 sm:px-0 sm:space-y-6 mt-24">
      <div className="sm:px-5 ">
        <div className="flex justify-between py-4">
          <h3 className="text-3xl font-bold text-green sm:text-xl ">Analyst Relations Manager</h3>
          <a
            className="border-purple-500 border rounded-md py-3 px-6 sm:hidden hover:bg-green transition-all hover:text-white"
            href="#form"
          >
            Apply now
          </a>
        </div>
        <p className="py-6">
          We are looking for an Analyst Relations Manager to join our Communications team. The Analyst Relations Manager
          will be critical in building awareness of and sustaining Gritty Grammar’s category leadership while driving a
          high-touch program that creates leverage for our ambitious vision. Working closely with Gritty Grammar’s Brand
          and Product Communications Lead, the person in this role will be directly responsible for helping to establish
          and grow our category through validation from major analyst firms, including Gartner and Forrester, as well as
          boutique firms.
        </p>
        <div className="space-y-3 py-4">
          <h4>We’re looking for someone who</h4>
          <ul className="list-disc space-y-1">
            <li>Embodies our EAGER values—is ethical, adaptable, gritty, empathetic, and remarkable.</li>
            <li>
              Is able to collaborate in person 3 weeks per quarter, traveling if necessary to the hub where the team is
              based.
            </li>
            <li>
              Has experience creating and driving long-term AR strategies, identifying high-impact research (earned and
              owned), and expanding brand awareness among key analysts and analyst firms.
            </li>
            <li>
              Can build, evolve, and sustain long-term strategic approaches that develop and establish market
              leadership.
            </li>
            <li>
              Can build strong analyst relationships and has an established roster of relationships and contacts with
              relevant analysts.
            </li>
            <li>
              Can convey a product&apos;s story in words and images in a way that connects with the target audience.
            </li>
            <li>
              Understands and explains a technical product as well as—or better than—a product manager and puts the
              value into real, simple language for external audiences.
            </li>
            <li>
              Has experience building and reinforcing brand leadership within the business market through high-touch
              analyst programs.
            </li>
            <li>Drives work forward without losing sight of business objectives or the big picture.</li>
            <li>
              Can move forward various projects across short- to long-term horizons with multiple cross-functional
              stakeholders.
            </li>
            <li>
              Can clearly and effectively articulate ideas and feedback verbally and through written communication.
            </li>
          </ul>
          <button className="bg-purple-500 text-white border rounded-md py-3 px-6 sm:block hidden ">Apply now</button>
        </div>
      </div>
      <form className="grid bg-gray-100 w-1/2 mx-auto py-8 space-y-5 sm:w-full sm:px-2 sm:space-y-6 " id="form">
        <h3 className="text-center text-xl font-semibold">Apply for this Job</h3>
        <div className="px-14 space-y-5 sm:px-7">
          <label className="grid gap-y-1">
            First Name
            <input
              type="text"
              name="fname"
              placeholder="First name"
              className="border border-gray-300 p-2 rounded-md placeholder:text-sm"
            />
          </label>
          <label className="grid gap-y-1">
            Last Name
            <input
              type="text"
              name="lname"
              placeholder="Last name"
              className="border border-gray-300 p-2 rounded-md placeholder:text-sm"
            />
          </label>
          <label className="grid gap-y-1">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded-md placeholder:text-sm"
            />
          </label>
          <label className="grid gap-y-1">
            Phone Number
            <input
              type="number"
              name="number"
              placeholder="Phone number"
              className="border border-gray-300 p-2 rounded-md placeholder:text-sm"
            />
          </label>
          <label className="grid gap-y-1" htmlFor="upload">
            Resume/CV
            <FileUploader id="upload" placeholder="Attach Resume/CV" />
          </label>
        </div>
        <button className="bg-purple-500 rounded-md p-2 w-1/2 mx-auto py-3 text-white">Submit Application</button>
      </form>
    </div>
 </div>
  );
};

export default Application;
