import React, { useState,FC } from 'react'
import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
  isOpen?:boolean,
  onClose?:()=>void
}

const AddNew:FC<ModalProps> = ({isOpen,onClose}) => {

  if(!isOpen){
    return null;
  }

  return (
    
    (

    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
    <div className='bg-white m-12 rounded-lg border border-gray-300 p-4 h-[500px] w-[400px] mx-auto relative'>

       {/*<---------------- CLOSE MODAL ICON----------------->  */}

        <div 
        className='absolute top-3 right-3 cursor-pointer'>
        <CloseIcon onClick={onClose}/>
        </div>

        {/* <----------------- MODAL FORM --------------------> */}

        <form className='flex flex-col gap-6 justify-center mt-8'>
            
            {/* USER NAME */}
            <div className='flex flex-col gap-2'>
            <label>Name</label>
            <input 
            type="text" 
            placeholder='Enter full Name' 
            className='border-[1px] outline-none p-[0.3rem] rounded-sm'
            />
            </div>

            {/* ROLE */}
            <div className='flex flex-col gap-2'>
            <label>Role</label>
            <input 
            type="text" 
            placeholder='Enter your role' 
            className='border-[1px] outline-none p-[0.3rem] rounded-sm'
            />
            </div>

            {/* EMAIL */}
            <div className='flex flex-col gap-2'>
            <label>Email</label>
            <input 
            type="text" 
            placeholder='Enter your email' 
            className='border-[1px] outline-none p-[0.3rem] rounded-sm'
            />
            </div>

            {/* STATUS */}
            <div className='flex flex-col gap-2'>
            <label>Status</label>
            <div className='flex items-center gap-2'>
            <input type="radio" id="active" name="status" value="active"/>
            <label htmlFor="active">active</label>
            <input type="radio" id="invited" name="status" value="invited"/>
            <label htmlFor="invited">invited</label>
            </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button type='submit' className='bg-blue-500 py-[0.6rem] px-4 rounded-lg text-white flex items-center justify-center gap-2'>Sumbit</button>
        </form>
    </div>
    </div>
    )
  )
}

export default AddNew



