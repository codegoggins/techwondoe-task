import {FC} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';

type DeleteModalProps = {
    isOpen?:boolean,
    onClose?:()=>void,
    onConfirm?:()=>void
}

const DeleteUser:FC<DeleteModalProps> = ({isOpen,onClose,onConfirm}) => {

  const handleDelete = () => {
     if(onConfirm){
        onConfirm();
     }
     if(onClose){
        onClose();
     }
  }  

  if(!isOpen){
        return null;
  }

  return (
    (

      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>

        <div className='bg-white m-12 rounded-lg border border-gray-300 p-4 h-[200px] w-[350px] mx-auto relative'>

            <div 
            className='absolute top-3 right-3 cursor-pointer'><CloseIcon onClick={onClose}/></div>

            <div className='flex flex-col justify-center items-center gap-6 mt-10'>
                <h3>Sure you want to delete user ?</h3>
                <div className='flex items-center gap-3'>
                <Button bgColor="red" text="Delete" onClick={handleDelete}/>
                <Button bgColor="yellow" text="Cancel" onClick={onClose}/>
                </div>
            </div>   

        </div>

        </div>
      )
  )
}

export default DeleteUser