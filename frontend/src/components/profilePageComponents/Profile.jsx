import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { MyContext } from '../../App'
import url from '../../url'
import Loading from '../loadingComponents/Loading'
import { useNavigate } from 'react-router-dom'

function Profile({id}) {
    const {user,updateAlert,updateUser} = useContext(MyContext)
    const [userDetails,updateUserDetails] = useState({})
    const [isLoading,updateIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user._id){
            navigate("/")
            return;
        }
        
        (async function get(){
            updateIsLoading(true);
            try{
                const response = await axios.post(`${url}/login/user`,{id:user._id})
                updateUserDetails(response.data)
            }catch(err){
                updateAlert({bg:"red",content:err.response.data,display:"show"})
            }
            updateIsLoading(false)
        })()
    },[user])
  return (
    <div className='max-w-lg w-11/12 bg-white flex flex-col gap-2 p-2 relative left-1/2 -translate-x-1/2 top-2 h-max flex flex-col gap-2 items-center mt-16 '>
        {isLoading?<Loading/>:<>
        <div className='w-20 h-20 bg-green-500 flex items-center justify-center rounded-full text-2xl'>{userDetails.username && userDetails.username.substring(0,1)}</div>
        <p>{userDetails.username}</p>
        <p>{userDetails.email}</p>

        <button className='text-lg underline text-blue-800' onClick={()=>navigate("/groups")}>Your groups</button>
        <button className='text-lg underline text-blue-800' onClick={()=>navigate("/create")}> Create</button>
        <button className='bg-red-500 p-2 text-lg' onClick={()=>{localStorage.removeItem("task-id");navigate("/");updateUser({_id:"",name:"",token:""})}}>Sign out</button>

        </>}
    </div>
  )
}

export default Profile