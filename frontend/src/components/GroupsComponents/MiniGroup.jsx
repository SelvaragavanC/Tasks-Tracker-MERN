import React, { useContext } from 'react'
import GroupAdmin from './GroupAdmin'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import url from '../../url'

function MiniGroup({groupName,description,groupAdmin,_id}) {
  const {user,updateAlert} = useContext(MyContext)
  const navigate = useNavigate()
  const handleDeleteGroup = async (e)=>{
    updateAlert({bg:'yellow',content:"Please wait deleting...",display:"show"})
    try{
      const response = await axios.post(`${url}/group/delete`,{groupId:_id,userId:user._id})
      updateAlert({bg:'green',content:response.data+". please refresh!",display:"show"})
    }catch(err){
      console.log(err)
      updateAlert({bg:"red",content:err.response.data,display:"show"})
    }
  }
  return (
    <div className='bg-white w-11/12 rounded p-2 cursor-pointer max-w-md flex flex-col gap-4'
     >
        <h1 className="text-3xl text-center font-mono"> {groupName}</h1>
        <div className='text-center text-lg'><GroupAdmin id={groupAdmin}/></div>
        <p className='text-center text-lg'>Description: {description}</p>
        <div className="flex justify-between">
          {user._id === groupAdmin && <button className='bg-red-500 text-white p-2 w-max rounded' onClick={handleDeleteGroup}>Delete</button> }
          <button className='bg-blue-500 text-white p-2 w-max rounded' onClick={()=>navigate(`/groups/${_id}`) }>View</button>
        </div>
        
    </div>
  )
}

export default MiniGroup