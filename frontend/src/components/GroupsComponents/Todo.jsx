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



    const [todos,setTodos] = useState([])
    const {user} = useContext(MyContext)
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
    },[])

    const handleCheckboxClick = (e)=>{
        const _id = e.target.id
        const checked = e.target.checked
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

  return (
    <div className='bg-white p-5 mt-2 w-11/12 flex flex-col gap-5 items-center'>
        <h1 className='text-2xl  '>Tasks Assigned</h1>
        <div className='w-10/12'>
        {
            todos.length?
                todos.map((element)=>{
                    return(
                        <div key={element._id} className='w-full border-2 border-gray-500 flex flex-col gap-2 items-center p-2'>
                            <div className='flex justify-evenly w-full'>
                                <input type="checkbox" checked = {element.checked} onChange={handleCheckboxClick} id={element._id}/>
                                <p>{element.content}</p>
                                {Admin_id===user._id?
                                    <button className='bg-red-300 p-2'>  <AiOutlineDelete/></button>
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
                <p>No tasks assigned</p>
        }
        </div>
    </div>
  )
}

export default Todo