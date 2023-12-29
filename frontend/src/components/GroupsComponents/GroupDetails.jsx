import React, { useContext, useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import GroupHeaders from './GroupHeaders'
import Todo from './Todo'
import axios from 'axios'
import url from '../../url'
import { MyContext } from '../../App'
import AddTasks from './AddTasks'


function GroupDetails() {
    const {pathname} = useLocation()
    const id = pathname.substring(8)
    const [admin,setAdmin] = useState("");
    const [users,setUsers] = useState([])
    const {user} = useContext(MyContext)

  useEffect(()=>{
    (async()=>{
      try{
        const users = await axios.get(`${url}/group/users/${id}`)
        setUsers(users.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  

  return (
    <div className='bg-green-600 w-11/12 relative left-1/2 -translate-x-1/2 mt-16 p-5 flex flex-col items-center'>
        <GroupHeaders id={id} setAdmin={setAdmin}/>
        {admin===user._id && <AddTasks _id={id} users={users} />}
        <Todo  _id={id}  Admin_id={admin} users={users}/>
    </div>
  )
}

export default GroupDetails