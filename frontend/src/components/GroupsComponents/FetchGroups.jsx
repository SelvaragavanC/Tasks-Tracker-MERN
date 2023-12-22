import React,{useContext, useEffect,useState} from 'react'
import { MyContext } from '../../App'
import url from '../../url'
import MiniGroup from './MiniGroup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function FetchGroups() {
    const {user,updateAlert} = useContext(MyContext)
    const [groups,setGroups] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user.name){
            navigate("/")
        }
        (async ()=>{
            try{
                const response  = await axios.post(`${url}/group/userGroups`,{userId:user._id})
                setGroups(response.data)
            }catch(err){
                updateAlert({bg:"red",content:err.message,display:"show"})
            }
        })()
    },[])
  return (
    <div>
        <h1 className="text-2xl text-center font text-gray-600 first-letter:text-3xl first-letter:text-red-700 mt-2">GROUPS</h1>
        <div className='flex flex-col gap-2 items-center'>
            {groups.map((element)=>{
                return(
                    <MiniGroup groupName={element.groupName}description = {element.description} groupAdmin={element.groupAdmin} key={element._id}/>
                )
            })}
        </div>
    </div>
  )
}

export default FetchGroups