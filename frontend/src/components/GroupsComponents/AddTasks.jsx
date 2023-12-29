import React, { useContext } from 'react'
import axios from 'axios'
import url from '../../url'
import { MyContext } from '../../App'

function AddTasks({_id,users}) {
    const {updateAlert} = useContext(MyContext)

    const handleAddTask = async(e)=>{
        const content = document.getElementById("task").value
        const dd = document.getElementById("dd").value
        const select = document.getElementById("to")
        if(!select.options.length){
            updateAlert({bg:"red",content:"Your group doesn't have any members",display:"show"})
            return;
        }
        const userId = select.options[select.selectedIndex].id
        updateAlert({bg:"yellow",content:"Loading...",display:"show"})
        try{
            const response = await axios.post(`${url}/group/${_id}/addTask`,{taskDetails:{
                content:content,
                dd:dd,
                checked:false,
                assignedTo:userId
            }})
            updateAlert({bg:"green",content:response.data+". Please refresh",display:"show"})
        }catch(err){
            console.log(err)
            updateAlert({bg:"red",content:err.response.data,display:"show"})
        }
    }

  return (
    <div className='bg-white p-2 flex flex-col gap-2 w-11/12 mt-2 items-center '>
        <h1 className='text-2xl'>Add Task</h1>
        <label htmlFor="task" className='text-lg flex gap-2'>
            Task:
            <input type="text" name="task" id="task" placeholder='eg. Arrange the books in our office' className="border-2 border-green-200 rounded-lg"/>
        </label>
        <label htmlFor="dd" className='text-lg flex gap-2'>
            Due date: 
            <input type="date" name='dd' id='dd' className='border-2 border-green-200 rounded-lg'/>
        </label>
        <label htmlFor="to">
            Assign to: 
            <select name="to" id="to">
                {users.map(
                    (user)=>{
                        return(
                            <option value={user.username} id = {user._id} key={user._id}>{user.username}</option>
                        )
                    }
                )}
            </select>
        </label>
        <button className='bg-green-500 w-1/2 text-white p-1 rounded-sm' onClick={handleAddTask}>Add</button>
    </div>
  )
}

export default AddTasks