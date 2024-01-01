import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import url from '../../url'
import { MyContext } from '../../App'
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Todo({_id,Admin_id,users}) {

    const usersObj = {}
    users.forEach(element=>{
        usersObj[element._id] = element.username
    })


    const [refresh,setRefresh] = useState(true)
    const [todos,setTodos] = useState([])
    const {user,updateAlert} = useContext(MyContext)
    const navigate = useNavigate()


    useEffect(()=>{
        if(!user._id){
            navigate("/")
            return;
        }
        (async ()=>{
            try{
                const response = await axios.get(`${url}/group/fetchTasks/${_id}`)
                setTodos(response.data)
            }catch(err){
                console.log(err)
            }
        })()
    },[refresh])

    const handleCheckboxClick = (e)=>{
        const _id = e.target.id
        const assignedTo = e.target.className
        const checked = e.target.checked
        if(assignedTo!=user._id){
            updateAlert({bg:"red",content:"Please dont play with others task",display:"show"})
            return;
        }
        try{
            const response = axios.post(`${url}/group/updateTodo/${_id}`,{checked:checked})
            const newTodos = todos.map((element)=>{
                if(element._id===_id){
                    element.checked = !element.checked;
                }
                return element
            })
            setTodos(newTodos)
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async(e)=>{
        const todoId = e.target.id
        updateAlert({bg:"yellow",content:"Please wait deleting...",display:"show"})
        try{
            const response  = await axios.post(`${url}/group/${_id}/delTask`,{taskId:todoId})
            updateAlert({bg:"green",content:response.data+". please refresh",display:"show"})
        }catch(err){
            updateAlert({bg:"red",content:err.response.data,display:"show"})
        }
    }

  return (
    <div className='bg-white p-5 mt-2 w-11/12 flex flex-col gap-5 items-center'>
        <h1 className='text-2xl  '>Tasks Assigned</h1><span className='text-blue-500 underline cursor-pointer' onClick={()=>setRefresh(prev=>!prev)}>(Refresh)</span>
        <div className='w-10/12'>
        {
            todos.length?
                todos.map((element)=>{
                    return(
                        <div key={element._id} className='w-full border-2 border-gray-500 flex flex-col gap-2 items-center p-2'>
                            <div className='flex justify-between w-full'>
                                <input type="checkbox" checked = {element.checked} onChange={handleCheckboxClick} id={element._id} className={element.assignedTo}/>
                                <p>{element.content}</p>
                                {Admin_id===user._id?
                                    <button className='bg-red-300 p-2 ' onClick={handleDelete} id={element._id}> <span className='pointer-events-none'><AiOutlineDelete/></span></button>
                                :
                                    <button  className=' p-2 bg-gray-300' disabled><AiOutlineDelete/></button>
                                }
                            </div>
                            <div className='flex-col flex justify-evenly w-full items-center'>
                               <p>To: {usersObj[element.assignedTo]}</p> 
                               <p>DueDate: {element.dd.substring(0,10)}</p>
                            </div>
                        </div>
                    )
                })
            :
                <p className='text-center'>No tasks assigned</p>
        }
        </div>
    </div>
  )
}

export default Todo