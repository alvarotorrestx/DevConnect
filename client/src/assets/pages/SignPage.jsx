import React from 'react'
import { FaKey, FaLock } from 'react-icons/fa'
import { GiMailbox } from 'react-icons/gi'
import Input from '../components/subcomponents/Input'
import { useNavigate } from 'react-router-dom'

function SignPage() {
    const navigate=useNavigate()
    const handleSubmit=(event)=>{
        event.preventDefault()
        navigate('/login')
    }
  return (
    <div className=' w-full h-full flex justify-center items-center'>
        <form onSubmit={(event)=> handleSubmit(event)} className=' sm:h-auto w-full sm:w-[30%] mt-40'>
            <div>
               <h1 className=' text-stone-600 mx-auto text-xl font-inter'>Sign Your Account</h1>
               <div className=' flex flex-col justify-start gap-2 relative mt-2'>
                 <p className=' font-inter text-sm text-stone-500'>EMAIL</p>
                 <Input className="  pl-8 focus-visible:ring-1 p-3 bg-stone-300 rounded-xl " placeholder="Enter Your Email" type="email" />
                 <GiMailbox size={24} color='gray' className=' absolute inset-y-10 pl-1' />
               </div>
               <div className=' relative flex flex-col justify-start gap-2 mt-1'>
                 <p className=' font-inter text-sm text-stone-500'>PASSWORD</p>
                 <Input className=" pl-8 focus-visible:ring-1 p-3 bg-stone-300 rounded-xl" placeholder="Enter Your Password" type="password" />
                 <FaLock size={21} color='gray' className=' absolute inset-y-10 pl-2' />
               </div>
               <div className=' relative flex flex-col justify-start gap-2 mt-1'>
                 <p className=' font-inter text-sm text-stone-500'>CONFIRM PASSWORD</p>
                 <Input className=" pl-8 focus-visible:ring-1 p-3 bg-stone-300 rounded-xl" placeholder="Enter Your Password" type="password" />
                 <FaKey size={21} color='gray' className=' absolute inset-y-10 pl-2' />
               </div>
               <button class="inline-block cursor-pointer rounded-md mt-2 w-full bg-blue-400 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-blue-500">
                   Sign Up
               </button>
            </div>
        </form>
    </div>
  )
}

export default SignPage