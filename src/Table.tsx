import {FC,useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import Button from './components/Button';
import AddNew from './components/AddNew';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import Badge from './components/Badge';
import axios from 'axios';
import { CSVLink } from "react-csv";

// ICONS
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';


type UserData = {
    id:string,
    name: string;
    email: string;
    status: string;
    role: string;
    lastLogin: string;
    lastLoginTime: string;
} | null;

const Table:FC = () => {

  const [userData,setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);


  // FETCH ALL USERS
  useEffect(()=>{
    const fetchData = async () => {
        const response = await axios.get('https://user-api-t37p.onrender.com/user');
        setUserData(response.data);
        setLoading(false);
    }
    fetchData(); 
  },[]);

  

//   ADD NEW USER
const handleAddNewUser =async (newUser:UserData) => {
   try{
    const response = await axios.post('https://user-api-t37p.onrender.com/user', newUser);
    setUserData([...userData, newUser]);
   }catch(error){
    console.error('Error adding user:', error);
   }
}



// DELETE USER

const [userInfo,setUserInfo] = useState<UserData>(null);

const setUser = (user:UserData) => {
    setUserInfo(user);
}

const handleDeleteUser =async () => {
    try{
      await axios.delete(`https://user-api-t37p.onrender.com/user/${userInfo?.id}`);
      const updatedData = userData.filter((user) => user?.id !== userInfo?.id);
      setUserData(updatedData);
      setFilteredData(updatedData);
    }catch(err){
      console.error('Error deleting user:', err);
    }
}


// UPDATE USER
const handleUpdateUser =async (updatedUser:UserData) => {
    try{
      const response = await axios.put(`https://user-api-t37p.onrender.com/user/${updatedUser?.id}`, updatedUser);
      const updatedData = userData.map((user)=>{
        if(user?.id === updatedUser?.id){
          return response.data;
        }else{
          return user;
        }
     });
     setUserData(updatedData);
    }catch(err){
      console.log(err);
    }
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

 // FUNCTION TO CONVERT userData into a format that will be accepted by CSV
 const convertToCSVData = (): any[] => {
 const csvData: any[] = [];

  // Add CSV headers
  csvData.push(['ID', 'Name', 'Email', 'Status', 'Role', 'Last Login', 'Last Login Time']);

  // Add user data rows
  userData.forEach((user) => {
    if (user) {
      const { id, name, email, status, role, lastLogin, lastLoginTime } = user;
      csvData.push([id, name, email, status, role, lastLogin, lastLoginTime]);
    }
  });

  return csvData;
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

    <CSVLink data={convertToCSVData()}>
       <Button text="Download CSV"/>
    </CSVLink>
    
    </div>
    </div>



    {/*<--------------------------------------- TABLE -------------------------------------------> */}

    <div className='mt-3 p-4 overflow-x-auto'>

    <table className='w-full text-gray-900'>
        <thead>
            <tr className='font-semibold'>
                <td className='py-4 border-b border-gray-700 cursor-pointer text-left'>
                <span onClick={handleSort}>
                Name
                </span>  
                </td>
                <td className='py-4 border-b border-gray-700 cursor-pointer' onClick={handleStatusSort}>
                <span onClick={handleStatusSort}>
                Status
                </span>  
                </td>
                <td className='py-4 border-b border-gray-700'>Role</td>
                <td className='py-4 border-b border-gray-700 text-left'>Last Login</td>
                <td className='py-4 border-b border-gray-700'></td>
            </tr>
        </thead>
        <tbody>
            {   loading ? (
                    <tr className='h-20'>
                      <td colSpan={5} className="font-bold text-center">
                      Loading....
                      </td>
                    </tr>
            ) :(
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
            )
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
    <AddNew isOpen={isAddModalOpen} onClose={handleCloseAddModal} onSubmit={handleAddNewUser}/>
    <DeleteUser isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleDeleteUser}/>
    {
        userInfo && <UpdateUser isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal} user={userInfo} onSubmit={handleUpdateUser}/>
    }
    

    </div>
  )
}

export default Table


