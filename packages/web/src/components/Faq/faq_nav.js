// import React, {useState} from 'react';


// const faq_nav = () => {
//     const [nav, setNav] = useState(false)
//     const handleClick = () => setNav(!nav)
//     const handleClose =()=> setNav(!nav)

//   return (

//     <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
//     <div className='px-2 flex justify-between items-center w-full h-full'>
//       <div className='flex items-center'>
//        <img src="https://res.cloudinary.com/dpokiomqq/image/upload/v1668861665/Grit_Grammar_3_wvcvtw.png" alt="logo1" className="w-[171px] lg:mx-[120px]"/>
//       </div>
//       <ul className='hidden md:flex place-items-center justify-center items-center grid lg:gap-[48px] gap-[20px]'>
//         <li className="font-[DM Sans] font-[500px] text-[16px] cursor-pointer leading-[21px] text-[#393939]">Home</li>
//         <li className="font-[DM Sans] font-[500px] text-[16px] cursor-pointer leading-[21px] text-[#393939]">About</li>
//         <li className="font-[DM Sans] font-[500px] text-[16px] cursor-pointer leading-[21px] text-[#393939]">FAQ</li>
//         <li className="font-[DM Sans] font-[500px] text-[16px] cursor-pointer leading-[21px] text-[#393939]">Blog</li>
//         <li className="font-[DM Sans] font-[500px] text-[16px] cursor-pointer leading-[21px] text-[#393939]">Contact</li>
//         </ul>
//       <div className='hidden md:flex pr-4'>
//         <button className='bg-[#5D387F] text-[#FFFFFF]  gap-[12px] w-[169px] h-[51px] px-[40px] py-[16px] rounded-[12px] lg:mr-[120px] text-center text-[16px] font-[Inter] leading-[19px]'>Get Started</button>
//       </div>
//       <div className='md:hidden mr-4' onClick={handleClick}>
//          {!nav ? <img src="https://res.cloudinary.com/dpokiomqq/image/upload/v1668864802/menu_hqnb2l.png" alt="menu" className='w-8 h-8 text-[#393939]' /> : <img src="https://res.cloudinary.com/dpokiomqq/image/upload/v1668865165/icons8-close-24_kaxp1j.png" alt="close" className='w-8 h-8 text-[#393939]' />}    
//       </div>
//     </div>

//    <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
//        <li className='border-[#393939] w-full border-opacity-50 mt-3 mb-3 text-x leading-6 text-[#393939] font-normal cursor-pointer'>Home</li>
//        <li className='border-[#393939] w-full border-opacity-50 mt-3 mb-3 text-x leading-6 text-[#393939] font-normal cursor-pointer'>About</li>
//        <li className='border-[#393939] w-full border-opacity-50 mt-3 mb-3 text-x leading-6 text-[#393939] font-normal cursor-pointer'>FAQ</li>
//        <li className='border-[#393939] w-full border-opacity-50 mt-3 mb-3 text-x leading-6 text-[#393939] font-normal cursor-pointer'>Blog</li>
//        <li className='border-[#393939] w-full border-opacity-50 mt-3 mb-3 text-x leading-6 text-[#393939] font-normal cursor-pointer'>Contact</li>

//      <div className='flex flex-col my-4'>
//          <button className='px-5 py-3 border rounded-[12px] bg-[#5D387F] text-[#FFFFFF]'>Get Started</button>
//      </div>
//    </ul>
//     </div>
//   );
// };

// export default faq_nav;