import { useState,FC,ChangeEvent,FormEvent} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';

type ModalProps = {
  isOpen?:boolean,
  onClose?:()=>void,
  onSubmit?: (newUser: {
    id:number,
    name: string;
    email: string;
    status: string;
    role: string;
    lastLogin: string;
    lastLoginTime: string;
  }) => void,
  len:number
}

const AddNew:FC<ModalProps> = ({isOpen,onClose,onSubmit,len}) => {

  const [name,setName] = useState<string>("");
  const [role,setRole] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [status,setStatus] = useState<string>("");


  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const time = hours + ':' + minutes + ' ' + ampm;
    return time;
  }


  // <---------------------- SUBMIT FORM -------------------------->
  const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();


    const newUser = {
      id:len+1,
      name: name,
      email: email,
      status: status,
      role: role,
      lastLogin: new Date().toLocaleDateString(),
      lastLoginTime: getCurrentTime()
    }

    console.log(newUser) 

    if(onSubmit){
      onSubmit(newUser);
    }


    //Close Modal on Submit  
     if(onClose){
       onClose();
     }
  }

  // <----- MODAL OPEN CONDITION ---->

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


        <form 
        onSubmit={handleSubmit} 
        className='flex flex-col gap-6 justify-center mt-8'>
            

            {/*<------------------ USER NAME ------------------------->*/}
            <div className='flex flex-col gap-2'>
            <label>Name</label>
            <input 
            type="text" 
            placeholder='Enter full Name' 
            className='border-[1px] outline-none p-[0.3rem] rounded-sm'
            onChange={(e:ChangeEvent<HTMLInputElement>):void=>setName(e.target.value)}
            />
            </div>


            {/*<------------------ ROLE -------------------------------------> */}

            <div className='flex flex-col gap-2'>
            <label>Role</label>
            <input 
            type="text" 
            placeholder='Enter your role' 
            className='border-[1px] outline-none p-[0.3rem] rounded-sm'
            onChange={(e:ChangeEvent<HTMLInputElement>):void=>setRole(e.target.value)}
            />
            </div>


            {/*<-------------------------- EMAIL -------------------------------->*/}

            <div className='flex flex-col gap-2'>
            <label>Email</label>
            <input 
            type="text" 
            placeholder='Enter your email' 
            className='border-[1px] outline-none p-[0.3rem] rounded-sm'
            onChange={(e:ChangeEvent<HTMLInputElement>):void=>setEmail(e.target.value)}
            />
            </div>


            {/*<----------------------- STATUS ---------------------------------------->*/}

            <div className='flex flex-col gap-2'>
            <label>Status</label>
            <div className='flex items-center gap-2'>

            {/* ACTIVE STATUS */}
            <input 
            type="radio" 
            id="active" 
            name="status" 
            value="active"
            onChange={(e:ChangeEvent<HTMLInputElement>):void=>setStatus(e.target.value)}
            />
            
            <label htmlFor="active">active</label>

            {/* INVITED STATUS */}
            <input 
            type="radio" 
            id="invited" 
            name="status" 
            value="invited"
            onChange={(e:ChangeEvent<HTMLInputElement>):void=>setStatus(e.target.value)}
            />

            <label htmlFor="invited">invited</label>

            </div>
            </div>

            {/*<----------------------------------- SUBMIT BUTTON ---------------------------------->*/}
            <Button bgColor="blue" text="Submit"/>
        </form>
    </div>
    </div>
    )
  )
}

export default AddNew



