import {FC,useState,ChangeEvent,FormEvent} from 'react'
import CloseIcon from '@mui/icons-material/Close';

type UserData = {
    id:string;
    name: string;
    email: string;
    status: string;
    role: string;
    lastLogin: string;
    lastLoginTime: string;
};

type UpdateModalProps = {
    isOpen?:boolean,
    onClose?:()=>void,
    user?:UserData,
    onSubmit?: (updatedUser:UserData) => void;
}

const UpdateUser:FC<UpdateModalProps> = ({isOpen,onClose,user,onSubmit}) => {

  const [name,setName] = useState<string>("");
  const [role,setRole] = useState<string>("");  
  const [error,setError] = useState(false);

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // VALIDATE INPUT FIELDS
    if (name.trim() === '' || role.trim() === '') {
            setError(true);
            return;
    }

    if (!user) {
        return; // handle the undefined case
    }
    const updatedUser = {
        ...user,
        name: name,
        role: role
    }
    if (onSubmit) {
        onSubmit(updatedUser);
    }
    if(onClose){
        onClose();
    }
  }
  
  const resetEdit = () => {
    setError(false);
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

        <div className='bg-white m-12 rounded-lg border border-gray-300 p-4 h-[320px] w-[400px] mx-auto relative'>
                
                <div className='absolute top-3 right-3 cursor-pointer' onClick={resetEdit}><CloseIcon/></div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center mt-8'>
                    <div className='flex flex-col gap-2'>
                    <label>Name</label>

                    <input 
                    type="text" 
                    placeholder={user?.name} 
                    className='border-[1px] outline-none p-[0.3rem] rounded-sm'
                    onChange={(e:ChangeEvent<HTMLInputElement>):void=>setName(e.target.value)}
                    />
                    {
                        error && <span className='text-red-500'>Name field cannot be empty !</span> 
                    }
                    </div>
                    <div className='flex flex-col gap-2'>
                    <label>Role</label>
                    <input 
                    type="text" 
                    placeholder={user?.role} 
                    className='border-[1px] outline-none p-[0.3rem] rounded-sm'
                    onChange={(e:ChangeEvent<HTMLInputElement>):void=>setRole(e.target.value)}
                    />
                    {
                        error && <span className='text-red-500'>Role field cannot be empty !</span> 
                    }
                    </div>
                    <button type='submit' className='bg-blue-500 py-[0.6rem] px-4 rounded-lg text-white flex items-center justify-center gap-2'>Submit</button>
                </form>
            </div>
        </div>
      )
  )
}

export default UpdateUser