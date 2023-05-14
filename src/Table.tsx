import {FC,useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import Button from './components/Button';
import AddNew from './components/AddNew';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import Badge from './components/Badge';
import axios from 'axios';
// import { CSVLink } from "react-csv";

// ICONS
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';


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

  const [userData,setUserData] = useState<UserData[]>([]);

  useEffect(()=>{
    const fetchData = async () => {
        const response = await axios.get('https://techwondummy.free.mockoapp.net/users');
        setUserData(response.data);
    }
    fetchData(); 
   },[])

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

// PAGINATON
const [filteredData, setFilteredData] = useState<UserData[]>([]);

const [currentPage, setCurrentPage] = useState(0);
const [perPage, setPerPage] = useState(5); 

useEffect(() => {
  const start = currentPage * perPage;
  const end = start + perPage;
  setFilteredData(userData.slice(start, end));
}, [userData, currentPage, perPage]);


// SORTING DATA
const [sortOrder, setSortOrder] = useState('asc');

// SORT BY NAME
const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedData = filteredData.sort((a, b) => {
        if (a && b) {
            if (sortOrder === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          }
        return 0;
    });
    setFilteredData(sortedData);
    setSortOrder(newSortOrder);
  };
  

// SORT BY STATUS  
const handleStatusSort = () => {
    const start = currentPage * perPage;
    const end = start + perPage;
  
    const sortedData = userData
      .slice(start, end)
      .sort((a, b) => {
        if (a && b && a.status === 'active' && b.status === 'invited') {
          return -1;
        } else if (a && b && a.status === 'invited' && b.status === 'active') {
          return 1;
        } else {
          return 0;
        }
      });
    setFilteredData(sortedData);
};  



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
    <div className='bg-white mx-8 my-6 rounded-lg border border-gray-300 p-4'>

    <div className='flex items-center justify-between'>

    <h1 className='font-bold text-xl'>Users</h1>

    <div className='flex items-center gap-4 font-semibold'>

    {/* <---------------------- ADD NEW USER BUTTON ---------------------> */}

    <Button bgColor="blue" text="Add New" onClick={handleOpenAddModal}/>

    {/* <CSVLink data={userData}>
    <Button text="Download CSV" onClick={handleOpenAddModal}/>
    </CSVLink> */}
    
    </div>
    </div>



    {/*<--------------------------------------- TABLE -------------------------------------------> */}

    <div className='mt-3 p-4'>

    <table className='w-full text-gray-900'>
        <thead>
            <tr className='font-semibold'>
                <td className='py-4 border-b border-gray-700 cursor-pointer text-left' onClick={handleSort}>
                Name
                </td>
                <td className='py-4 border-b border-gray-700 cursor-pointer' onClick={handleStatusSort}>
                Status
                </td>
                <td className='py-4 border-b border-gray-700'>Role</td>
                <td className='py-4 border-b border-gray-700 text-left'>Last Login</td>
                <td className='py-4 border-b border-gray-700'></td>
            </tr>
        </thead>
        <tbody>
            {
                filteredData.map((user)=>(
                    <tr key={user?.id}>
                        <td className='py-4'>
                            <div className='flex flex-col items-start'>
                                <span className='font-bold'>{user?.name}</span>
                                <span>{user?.email}</span>
                            </div>
                        </td>
                        <td className='py-4'>
                            <Badge text={user?.status}/>
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

   {/*<------------------------ PAGINATION  ------------------------------>*/}

    <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(userData?.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        activeClassName={'active'}
        containerClassName="flex flex-wrap items-center justify-center pagination mt-12"
        pageClassName="m-1 px-3 py-2 rounded-full bg-white cursor-pointer"
        activeLinkClassName="bg-blue-500 text-white px-3 py-2 rounded-full"
        previousClassName="m-1 px-3 py-2 rounded-full bg-white cursor-pointer"
        nextClassName="m-1 px-3 py-2 rounded-full bg-white cursor-pointer"
        />
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


