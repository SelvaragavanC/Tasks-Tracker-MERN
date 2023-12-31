import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MyContext } from '../../App'
import axios from 'axios'
import url from '../../url'

function AcceptRequest() {
    const {pathname} = useLocation()
    const [,groupId,userId] = pathname.split("/")

    const {updateAlert} = useContext(MyContext)
    const handleAccept = async ()=>{
        updateAlert({bg:"yellow",content:"Please wait...",display:"show"})
        try{
            const response = await axios.post(`${url}/group/acceptRequest`,{groupId,userId})
            updateAlert({bg:"green",content:response.data,display:"show"})
        }catch(err){
            updateAlert({bg:"red",content:"sOrry",  display:"show"})
            console.log(err)
        }
    }
  return (
    <div className=' mt-16  p-0 w-full flex justify-center items-center flex-col'>
        Click Her to accept Him/Her
        <button className='bg-white p-2 rounded' onClick={handleAccept}>Accept Him/Her</button>
    </div>
  )
}

export default AcceptRequest