import { useNavigate } from 'react-router-dom';
import Button from './Button'
import { LuBrain } from "react-icons/lu";

const Navbar = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className=' flex items-center justify-between max-w-[1240px] mx-auto py-5 px-5'>
                {/* Logo */}
                <div className='w-full flex items-center cursor-pointer' onClick={(()=>navigate("/"))}>
                    <LuBrain size={30} color="black" className='mx-1' />
                    <div className='text-black font-medium text-lg'>
                        InterviewAI
                    </div>
                </div>
                {/* Button */}
                <div className='flex w-full items-center justify-end gap-2'>
                    <p className='font-light text-sm text-black/80  '>{props.accountExist}</p>
                    <Button text={props.text} onclick={props.onclick} />
                </div>

            </div>
            {/* Horizontal Line */}
            <hr className='h-px bg-gray-200 border-0 dark:bg-gray-200' />
        </>
    )
}

export default Navbar