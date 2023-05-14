import {FC,useState} from 'react'

// ICONS
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from './components/Button';
import AddNew from './components/AddNew';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';

type UserData = {
    id:number,
    name: string;
    email: string;
    status: string;
    role: string;
    lastLogin: string;
    lastLoginTime: string;
} | null;

const Table:FC = () => {


  const data = 
  [
    {"id":1,"name":"Alex Dudding","email":"adudding0@wunderground.com","status":"invited","role":"admin","lastLogin":"10/26/2022","lastLoginTime":"12:54 AM"},
  {"id":2,"name":"Pernell Haddleton","email":"phaddleton1@hibu.com","status":"active","role":"admin","lastLogin":"5/30/2022","lastLoginTime":"4:29 PM"},
  {"id":3,"name":"Corrine O'Geaney","email":"cogeaney2@nbcnews.com","status":"active","role":"Sales Rep","lastLogin":"10/24/2022","lastLoginTime":"3:24 PM"},
  {"id":4,"name":"Rodie Conlaund","email":"rconlaund3@about.me","status":"active","role":"admin","lastLogin":"7/7/2022","lastLoginTime":"2:12 PM"},
  {"id":5,"name":"Amity Gorman","email":"agorman4@ameblo.jp","status":"invited","role":"Sales Rep","lastLogin":"6/24/2022","lastLoginTime":"10:56 AM"},
  {"id":6,"name":"Osbourne Romanski","email":"oromanski5@e-recht24.de","status":"invited","role":"Sales leader","lastLogin":"7/6/2022","lastLoginTime":"9:42 AM"}
  ]
  
  const [userData,setUserData] = useState<UserData[]>(data);

//   ADD NEW USER
const handleAddNewUser = (newUser:UserData) => {
    console.log(newUser);
    setUserData([...userData, newUser]);
}



// DELETE USER

const [userInfo,setUserInfo] = useState<UserData>(null);

const setUser = (user:UserData) => {
    setUserInfo(user);
}

const handleDeleteUser = () => {
    const userIndex = userData?.findIndex(user => user?.id === userInfo?.id);
    if (userIndex !== -1) {
      const updatedData = [...userData];
      updatedData.splice(userIndex, 1);
      setUserData(updatedData);
    }
}

// UPDATE USER
const handleUpdateUser = (updatedUser:UserData) => {
    const updatedData = userData.map((user)=>{
        if(user?.id === updatedUser?.id){
          return updatedUser;
        }else{
          return user;
        }
     });
     setUserData(updatedData);
}





// MODAL POPUP
   const [isAddModalOpen,setIsModalOpen] = useState<boolean>(false);
   const [isDeleteModalOpen,setIsDeleteModalOpen] = useState<boolean>(false);
   const [isUpdateModalOpen,setIsUpdateModalOpen] = useState<boolean>(false);



   const handleOpenAddModal = () => {
     setIsModalOpen(true);
   }

   const handleCloseAddModal = () => {
     setIsModalOpen(false);
   }

   const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
   }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
   }

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  }

  return (
    <div className='bg-white m-12 rounded-lg border border-gray-300 p-4'>

    <div className='flex items-center justify-between'>

    <h1 className='font-bold text-xl'>Users</h1>

    <div className='flex items-center gap-4 font-semibold'>

    {/* <---------------------- ADD NEW USER BUTTON ---------------------> */}

    <Button bgColor="blue" text="Add New" onClick={handleOpenAddModal}/>

    {/*<------------------------ DOWNLOAD BUTTON ------------------------->*/}

    <Button bgColor="green" text="Download CSV"/>

    </div>
    </div>



    {/*<--------------------------------------- TABLE -------------------------------------------> */}

    <div className='mt-3 p-4'>

    <table className='w-full text-gray-900'>
        <thead>
            <tr className='font-semibold'>
                <td className='py-4 border-b border-gray-700 cursor-pointer text-left'>
                Name
                </td>
                <td className='py-4 border-b border-gray-700 cursor-pointer '>
                Status
                </td>
                <td className='py-4 border-b border-gray-700'>Role</td>
                <td className='py-4 border-b border-gray-700 text-left'>Last Login</td>
                <td className='py-4 border-b border-gray-700'></td>
            </tr>
        </thead>
        <tbody>
            {
                userData.map((user)=>(
                    <tr key={user?.id}>
                        <td className='py-4 flex items-center gap-3'>
                            <img 
                            className='w-[3rem] h-[3rem] object-cover rounded-full'
                            src="https://images.pexels.com/photos/15174712/pexels-photo-15174712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <div className='flex flex-col items-start'>
                                <span className='font-bold'>{user?.name}</span>
                                <span>{user?.email}</span>
                            </div>
                        </td>
                        <td className='py-4'>
                            <span>
                                {user?.status}
                            </span>
                        </td>
                        <td className='py-4'>{user?.role}</td>
                        <td className='py-4'>
                            <div className='flex flex-col items-start'>
                                <span className='font-bold'>{user?.lastLogin}</span>
                                <span>{user?.lastLoginTime}</span>
                            </div>
                        </td>
                        <td className='py-4'>
                            <div className='flex items-center gap-2'>
                                <span 
                                className='text-yellow-400 cursor-pointer'>
                                <CreateIcon fontSize='large' onClick={()=>{handleOpenUpdateModal();setUser(user)}}/>
                                </span>
                                <span 
                                className='text-red-600 cursor-pointer'> 
                                <DeleteIcon fontSize='large' onClick={()=>{handleOpenDeleteModal();setUser(user)}}/>
                                </span>
                            </div>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    
    </div>

    {/*<--------------------------------------- TABLE -------------------------------------------> */}
    <AddNew isOpen={isAddModalOpen} onClose={handleCloseAddModal} onSubmit={handleAddNewUser} len={userData.length}/>
    <DeleteUser isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleDeleteUser}/>
    {
        userInfo && <UpdateUser isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal} user={userInfo} onSubmit={handleUpdateUser}/>
    }
    

    </div>
  )
}

export default Table


