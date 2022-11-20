import userimg from '../../assets/ProfileImage.png';
import editicon from '../../assets/edit.svg';
import coloredediticon from '../../assets/EditColored.svg';

//components
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton'


export default function profileScreen() {
  return (
    <main className='bg-white'>
        <div className='h-[100vh] w-[90%] md:w-[70%] m-auto'>
            <div className='flex flex-col md:flex-row md:justify-between items-center pb-3 md:border-b-[3px] border-[#d2d2d2]/50 relative'>
                <h3 className='text-2xl font-bold'>User Profile</h3>
                <span><img className='absolute bottom-1 md:hidden' src={coloredediticon} alt="edit" /></span>
                <img className='h-24 mt-3 md:mt-0 md:h-12 md:w-12' src={userimg} alt="user-img" />
            </div>
            <div className='flex flex-col text-center md:hidden'>
                <h1 className='text-xl font-bold text-[#393939]'>Faith Bello</h1>
                <p className='text-[#9c9c9c]'>faithbello444@gmail.com</p>
             </div>

            <div className='flex flex-col gap-10 mt-5'>
                <div className='hidden md:block border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>Full Name</span>
                    <p className='text-lg'>Faith Bello</p>
                </div>

                <div className='border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>UID</span>
                    <p className='text-lg'>687632</p>
                </div>

                <div className='relative border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>Display Name</span>
                    <p className='text-lg'>Fabe</p>
                    <span className='absolute bottom-2 right-0 cursor-pointer'><img src={editicon} alt="edit" /></span>
                </div>

                <div className='hidden md:block border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>Email Address</span>
                    <p className='text-lg'>faithbello44@gmail.com</p>
                </div>

                <div className='relative flex flex-col border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>Password</span>
                    <input type="password" name="password" id="" value="password" disabled className='text-xl bg-transparent' />
                    <p></p>
                    <span className='absolute bottom-2 right-0 cursor-pointer'><img src={editicon} alt="edit" /></span>
                </div>
            </div>

            <div className="_btnContainer">
                <ProfileScreenButton variant="danger" >{'Delete Account'}</ProfileScreenButton>
                <ProfileScreenButton>{'Sign Out'}</ProfileScreenButton>
            </div>
        </div>
        
    </main>
  )
}
