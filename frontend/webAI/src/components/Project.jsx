import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const Project = () => {

  const location = useLocation()
  console.log(location.state);
  const [isSidepanel, setissidepanel] = useState(false)
  return (
    <main className='h-screen w-screen flex'>
      <section className='left flex flex-col h-full min-w-85  relative '>
        <header className='flex justify-end p-4 w-full bg-sky-100 '>
          <button className='p-2 cursor-pointer'
          onClick={()=> setissidepanel(!isSidepanel)}>
        <i class="ri-group-fill"></i>
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
            <i class="ri-send-plane-2-fill"></i>
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
          <i class="ri-user-2-fill"></i>
          </div>
          <p className='text-md font-semibold'>username</p>
         </div>
        </div>

      </section>
    </main>
  )
}

export default Project
