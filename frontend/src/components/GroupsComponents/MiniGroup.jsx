import React, { useContext } from 'react'
import GroupAdmin from './GroupAdmin'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom'

function MiniGroup({groupName,description,groupAdmin,_id}) {
  const {user} = useContext(MyContext)
  const navigate = useNavigate()
  return (
    <div className='bg-white w-11/12 rounded p-2 cursor-pointer max-w-md flex flex-col gap-4' onClick={()=>navigate(`/group/${_id}`)}>
        <h1 className="text-3xl text-center font-mono"> {groupName}</h1>
        <div className='text-center text-lg'><GroupAdmin id={groupAdmin}/></div>
        <p className='text-center text-lg'>Description: {description}</p>
        {user._id === groupAdmin && <button className='bg-red-500 text-white p-2 w-max float-right'>Delete</button> }
        
    </div>
  )
}

export default MiniGroup