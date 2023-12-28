import React,{useContext, useEffect,useState} from 'react'
import { MyContext } from '../../App'
import url from '../../url'
import MiniGroup from './MiniGroup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loadingComponents/Loading'

function FetchGroups() {
    const {user,updateAlert} = useContext(MyContext)
    const [groups,setGroups] = useState([])
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user.name){
            navigate("/")
            return;
        }
        (async ()=>{
            try{
                const response  = await axios.post(`${url}/group/userGroups`,{userId:user._id})
                setGroups(response.data)
            }catch(err){
                updateAlert({bg:"red",content:err.message,display:"show"})
            }
            setIsLoading(false)
        })()
    },[])
  return (
    <div className='mt-16'>
        <h1 className="text-2xl text-center font text-gray-600 first-letter:text-3xl first-letter:text-red-700 my-5">GROUPS</h1>
        <div className='flex flex-col gap-2 items-center'>
            { groups?groups.map((element)=>{
                return(
                    <MiniGroup groupName={element.groupName}description = {element.description} groupAdmin={element.groupAdmin} key={element._id} _id={element._id}/>
                )
            }):"youre not in any groups, goto search!"}
            
        </div>
        <div className='bg-white w-max relative left-1/2 -translate-x-1/2'>
            {isLoading && <Loading/> }
        </div>
    </div>
  )
}

export default FetchGroups