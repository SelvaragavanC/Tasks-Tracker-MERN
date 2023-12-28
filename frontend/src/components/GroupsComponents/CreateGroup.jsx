import React, { useContext, useEffect } from 'react'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import url from '../../url'
import axios from 'axios'

function CreateGroup() {

    const {user,updateAlert} = useContext(MyContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user.name){
            navigate("/")
        }
    },[])

    const createGroup = async (e)=>{
        const children = e.target.parentElement.children
        const groupName = children[2].value
        const description = children[4].value
        updateAlert({bg:"yellow",content:"Please wait! Creating...",display:"show"})
        try{
            const response = await axios.post(`${url}/group/create`,{groupName:groupName,description:description,groupAdmin:user._id})
            updateAlert({bg:"green",content:response.data,display:"show"})
            navigate("/groups")
        }catch(err){
            updateAlert({bg:"red",content:err.message,display:"show"})
        }
    }

  return (
    <div className='bg-white w-11/12 max-w-xl flex flex-col items-center justify-evenly p-2 gap-2 relative left-1/2 top-2 -translate-x-1/2 capitalize mt-16'>
        <h1 className='text-2xl'>Create Group</h1>
        <label htmlFor="name" className='self-start'> Group Name: </label>
        <input type="text" name="name" id="name"  className='border-gray-400 border-2 w-full'/>
        <label htmlFor="description" className='self-start'> Description: </label>
        <input type="text" name="description" id="description"  className='border-gray-400 border-2 h-10 w-full' placeholder='Additional informations...'/>
        <button className='bg-green-500 w-11/12' onClick={createGroup}>Create</button>
    </div>
  )
}

export default CreateGroup