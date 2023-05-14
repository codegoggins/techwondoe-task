import {FC,useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';

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
{"id":6,"name":"Osbourne Romanski","email":"oromanski5@e-recht24.de","status":"invited","role":"Sales leader","lastLogin":"7/6/2022","lastLoginTime":"9:42 AM"},
{"id":7,"name":"Tades Van Waadenburg","email":"tvan6@gnu.org","status":"active","role":"Sales leader","lastLogin":"8/18/2022","lastLoginTime":"11:09 AM"},
{"id":8,"name":"Howie Everett","email":"heverett7@liveinternet.ru","status":"active","role":"Sales Rep","lastLogin":"10/1/2022","lastLoginTime":"1:55 PM"},
{"id":9,"name":"Abbe Sekulla","email":"asekulla8@gravatar.com","status":"invited","role":"admin","lastLogin":"11/3/2022","lastLoginTime":"5:15 PM"},
{"id":10,"name":"Nathanael Simony","email":"nsimony9@infoseek.co.jp","status":"active","role":"Sales leader","lastLogin":"2/18/2023","lastLoginTime":"8:22 PM"},
{"id":11,"name":"Camella Pabst","email":"cpabsta@freewebs.com","status":"active","role":"Sales leader","lastLogin":"3/29/2023","lastLoginTime":"5:58 AM"},
{"id":12,"name":"Rudd Sayward","email":"rsaywardb@ed.gov","status":"active","role":"admin","lastLogin":"10/4/2022","lastLoginTime":"1:33 AM"},
{"id":13,"name":"Ephraim Tippin","email":"etippinc@cyberchimps.com","status":"invited","role":"Sales leader","lastLogin":"1/10/2023","lastLoginTime":"10:00 PM"},
{"id":14,"name":"Cindi Hambelton","email":"chambeltond@boston.com","status":"active","role":"admin","lastLogin":"2/7/2023","lastLoginTime":"7:19 PM"},
{"id":15,"name":"Lacey Ducker","email":"lduckere@yelp.com","status":"active","role":"Sales leader","lastLogin":"9/22/2022","lastLoginTime":"10:53 PM"},
{"id":16,"name":"Adams Cass","email":"acassf@angelfire.com","status":"active","role":"Sales leader","lastLogin":"8/17/2022","lastLoginTime":"7:58 AM"},
{"id":17,"name":"Phillie Mulvany","email":"pmulvanyg@foxnews.com","status":"invited","role":"Sales Rep","lastLogin":"3/16/2023","lastLoginTime":"1:24 AM"},
{"id":18,"name":"Gifford Oldknowe","email":"goldknoweh@hp.com","status":"active","role":"admin","lastLogin":"3/23/2023","lastLoginTime":"9:54 PM"},
{"id":19,"name":"Melany Dorro","email":"mdorroi@webmd.com","status":"invited","role":"Sales Rep","lastLogin":"2/1/2023","lastLoginTime":"3:44 PM"},
{"id":20,"name":"Courtnay Swafford","email":"cswaffordj@whitehouse.gov","status":"invited","role":"admin","lastLogin":"5/10/2023","lastLoginTime":"10:53 PM"},
{"id":21,"name":"Matthias Rosevear","email":"mroseveark@pagesperso-orange.fr","status":"invited","role":"Sales Rep","lastLogin":"8/28/2022","lastLoginTime":"9:32 PM"},
{"id":22,"name":"Margarethe O' Connell","email":"mol@sina.com.cn","status":"invited","role":"Sales leader","lastLogin":"8/2/2022","lastLoginTime":"11:26 AM"},
{"id":23,"name":"Jefferey Beggini","email":"jbegginim@nationalgeographic.com","status":"invited","role":"Sales Rep","lastLogin":"3/6/2023","lastLoginTime":"4:15 AM"},
{"id":24,"name":"Hagen Grund","email":"hgrundn@zimbio.com","status":"active","role":"Sales leader","lastLogin":"5/23/2022","lastLoginTime":"5:05 PM"},
{"id":25,"name":"Danny Dominec","email":"ddomineco@geocities.jp","status":"invited","role":"Sales leader","lastLogin":"4/6/2023","lastLoginTime":"2:47 AM"}]
  
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
    const sortProperty = 'name';
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
  
    const sortedData = data
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

    {/*<------------------------ DOWNLOAD BUTTON ------------------------->*/}

    <Button bgColor="green" text="Download CSV"/>

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

   {/*<------------------------ PAGINATION  ------------------------------>*/}

    <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(data.length / perPage)}
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


