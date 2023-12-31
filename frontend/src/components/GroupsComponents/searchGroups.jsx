import React,{useContext, useEffect,useState}from 'react'
import url from '../../url'
import axios from 'axios'
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Loading from '../loadingComponents/Loading';
import GroupAdmin from './GroupAdmin';

function SearchGroups() {
    const [search,setSearch] = useState("");
    const [groups,setGroups] = useState([])
    const {user,updateAlert} = useContext(MyContext)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user._id){
            navigate("/")
            return;
        }
        (async ()=>{
            setLoading(true)
            try{
                const response = await axios.get(`${url}/group/search?id=${user._id}&q=${search}`)
                setGroups(response.data)
            }catch(err){
                updateAlert({bg:"red",content:"Sorry something's bad",display:"show"})
            }
            setLoading(false)
        })()
       

    },[search])

    const reqAGroup = async (e)=>{
        const id = e.target.id
        const reqBy = {_id:user._id,username:user.name}
        updateAlert({bg:"yellow",content:"Please wait, Requesting...",display:"show"})
        try{
            await axios.post(`${url}/group/sendRequest`,{groupId:id,reqBy})
            updateAlert({bg:"green",content:"Request Sent!",display:"show"})
        }catch(err){
            updateAlert({bg:"red",content:"Error Occurred",display:"show"})
        }
    }

  return (
    <div className='bg-white mt-16 w-11/12 relative left-1/2 -translate-x-1/2 flex items-center flex-col'>
        <h1 className='text-2xl font-mono'>Search</h1>
        <input type="text" value = {search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search any groups by title' className='border-2 border-gray-400' />
        {groups.map((group)=>{
            return(
                <div className='border-2 border-green-200 w-11/12 m-2 flex flex-col gap-2 items-center p-2' key = {group._id}>
                    <p className='text-2xl font-sans'>{group.groupName}</p>
                    <GroupAdmin id = {group.groupAdmin}/>
                    <p>{group.description}</p>
                    <button className='bg-blue-500 p-2 rounded text-white' id={group._id} onClick={reqAGroup}>Request to join</button>
                </div>
            )
        })}
        {groups.length?null:<p>No groups found for the query {search}</p>}
        {loading && <Loading/>}
    </div>
  )
}

export default SearchGroups