import {FC} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';

type DeleteModalProps = {
    isOpen?:boolean,
    onClose?:()=>void,
}

const DeleteUser:FC<DeleteModalProps> = ({isOpen,onClose}) => {

  if(!isOpen){
        return null;
  }

  return (
    (

      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>

        <div className='bg-white m-12 rounded-lg border border-gray-300 p-4 h-[240px] w-[350px] mx-auto relative'>

            <div 
            className='absolute top-3 right-3 cursor-pointer'><CloseIcon onClick={onClose}/></div>

            <div className='flex flex-col justify-center items-center gap-6 mt-10'>
                <h3>Sure you want to delete user ?</h3>
                <div className='flex items-center gap-3'>
                <Button bgColor="red" text="Delete"/>
                <Button bgColor="yellow" text="Cancel"/>
                </div>
            </div>   

        </div>

        </div>
      )
  )
}

export default DeleteUser