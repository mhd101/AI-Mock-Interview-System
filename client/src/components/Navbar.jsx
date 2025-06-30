import Button from './Button'
import { LuBrain } from "react-icons/lu";

const Navbar = () => {
    return (
        <>
            <div className=' flex items-center justify-between max-w-[1240px] mx-auto py-5 px-5'>
                {/* Logo */}
                <div className='w-full flex items-center'>
                    <LuBrain size={30} color="black" className='mx-1' />
                    <div className='text-black font-medium text-lg'>
                        InterviewAI
                    </div>
                </div>
                {/* Signup Button */}
                <div className=''>
                    <Button text="Signup" />
                </div>

            </div>
            {/* Horizontal Line */}
            <hr className='h-px bg-gray-200 border-0 dark:bg-gray-200' />
        </>
    )
}

export default Navbar