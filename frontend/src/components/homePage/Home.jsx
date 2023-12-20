import React, { useContext, useEffect } from 'react'
import url from '../../url'
import axios from 'axios'
import {MyContext} from '../../App'

function Home() {
  const {updateUser,updateAlert,user} = useContext(MyContext)
  useEffect(()=>{
    async function get(){
      const userId = localStorage.getItem("task-id")
      
      if(userId){
        try{
          let user = await axios.post(`${url}/login/sessionedUser`,{id:userId})
          
          user = JSON.parse(user.data)
          
          updateUser({_id:user._id,name:user.username})
          updateAlert({bg:"green",content:`logged in as ${user.username}`,display:"show"})
        }catch(err){
          updateAlert({bg:"red",content:"Session timed out",display:"show"})
        }
      }else{
        updateAlert({bg:"yellow",content:"Please login!",display:"show"})
      }
    }
    if(!user.name){
      get()
    }
  },[])
  return (
    <>
      <div className='relative left-1/2 -translate-x-1/2 w-11/12 h-max px-5 bg-white rounded backdrop-blur-sm p-2 flex flex-col gap-2 mt-5'>
        <h1 className='text-2xl'>
          what's new?
        </h1>
        <p>Nothing is new here. This is a website where you can create groups and assign tasks to the members of your groups</p>
      </div>
      <div className='relative left-1/2 -translate-x-1/2  w-11/12 h-max px-5 bg-white rounded backdrop-blur-sm p-2 flex flex-col gap-2 mt-5'>
        <h1  className='text-2xl'>
          How to create a group?
        </h1>
        <p>Click create in the navbar, Then create groups</p>
      </div>
      <div className='relative left-1/2 -translate-x-1/2  w-11/12 h-max px-5 bg-white rounded backdrop-blur-sm p-2 flex flex-col gap-2 mt-5'>
        <h1 className="text-2xl">About me</h1>
        <p>I am Selvaragavan, An ug student from Karpagam college of engineering. I am a fullstack developer(MERN)</p>
      </div>
    </>
  )
}

export default Home