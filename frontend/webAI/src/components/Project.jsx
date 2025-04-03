import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../config/Axios'

const Project = () => {
  const location = useLocation()

  const [isSidepanel, setissidepanel] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(new Set())

  const [users, setuser] = useState([])

  useEffect(()=>{
    axios.get('/user/all')
    .then((res)=>{
      console.log(res.data);
      
      setuser(res.data.users)})
    .catch((error)=>{console.log(error);
    })

  },[])

  const handleUserClick = (id) => {
    setSelectedUserId(prevSelectedUser => {
      const newSelectedUserId = new Set(prevSelectedUser);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }
      return newSelectedUserId;
    });
  }

  function addCollaborators() {

    axios.put("/project/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId)
    }).then(res => {
        console.log(res.data)
        setIsModalOpen(false)

    }).catch(err => {
        console.log(err)
    })

}

  return (
    <main className='h-screen w-screen flex'>
      <section className='left flex flex-col h-full min-w-85 relative'>
        <header className='flex justify-between p-4 w-full bg-sky-100'>
          <button
            className='flex justify-center items-center cursor-pointer p-1'
            onClick={() => setIsModalOpen(true)}
          >
            <i className='ri-user-add-fill mr-1 text-xl'></i>
            <p className='text-sm font-semibold py-1'>Add collaborators</p>
          </button>
          <button
            className='p-2 cursor-pointer'
            onClick={() => setissidepanel(!isSidepanel)}
          >
            <i className='ri-group-fill'></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col bg-slate-400">
          <div className="message-box flex-grow mt-1 ml-1 ">
            <div className="message max-w-56 bg-white w-fit rounded px-2 p-1">
              <small className='text-xs opacity-65 font-semibold'>@username</small>
              <p className='text-sm font-bold'>Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="ml-auto message max-w-56 bg-white w-fit rounded px-2 p-1 mt-1 mr-1">
              <small className='text-xs opacity-65 font-semibold'>@username</small>
              <p className='text-sm font-bold'>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
          <div className="inputfield flex">
            <input
            className='flex flex-grow p-2 px-4 bg-white border-none outline-none  '
            type="text" placeholder='Enter message' />
            <button className='p-2 px-3  bg-zinc-700 text-white '>
            <i className="ri-send-plane-2-fill"></i>
            </button>
          </div>
        </div>

        <div className={`sidePanel w-full h-full  bg-slate-300 absolute  ${isSidepanel ? 'translate-x-0':'-translate-x-full'} `}>
         <header className='flex justify-end p-4 bg-slate-200'
         onClick={()=>setissidepanel(!isSidepanel)}
         >
          <button className='p-2 cursor-pointer'>
         <i className="ri-close-fill text-2xl"></i>
          </button>
         </header>

         <div className="users flex gap-2 p-3 hover:bg-zinc-400 min-w-fit cursor-pointer mt-2 rounded ">
          <div className='flex text-white min-w-9 min-h-9 justify-center items-center rounded-full  bg-zinc-500 '>
          <i className="ri-user-2-fill"></i>
          </div>
          <p className='text-md font-semibold'>username</p>
         </div>
        </div>

        {isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-lg p-6 w-96 relative'>
              <header className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold'>Select a User</h2>
                <button
                  className='text-gray-500 hover:text-gray-700'
                  onClick={() => setIsModalOpen(false)}
                >
                  <i className='ri-close-fill text-2xl'></i>
                </button>
              </header>
              <div className='flex flex-col gap-2 max-h-96 overflow-auto'>
                {Array.isArray(users) && users.map((user) => (
                  <div
                    key={user._id}
                    className={`flex items-center gap-3 p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 ${Array.from(selectedUserId).indexOf(user._id)!=-1?'bg-gray-300':''} `}
                    onClick={() => handleUserClick(user._id)}
                  >
                    <div className='flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full'>
                      <i className='ri-user-2-fill text-lg'></i>
                    </div>
                    <p className='text-md font-medium'>{user.email}</p>
                  </div>
                ))}
              </div>
              <button
                className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                onClick={addCollaborators}
              >
                Add Collaborators
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Project
