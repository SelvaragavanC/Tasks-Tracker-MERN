import React, { useContext, useState } from 'react'
import axios from 'axios'
import { MyContext } from '../../App'
import url from '../../url'
import { useNavigate } from 'react-router-dom'

function Login() {
    //true->Login false->Signup
   const [LSToggler,updateLSToggler] = useState({login:"left-1/2",signup:"-left-1/2"})
   const [emails,updateEmails] = useState({login:"",signup:""})
   const [focus,updateFocus] = useState({
    login:false,
    signup:false,
   })
   const navigate = useNavigate()

   //context
   const {updateAlert,updateUser} = useContext(MyContext)

   const updateEmailsHelper = (e) => {
        if (e.target.id === "SEmail") {
            updateEmails((prev) => ({ ...prev, signup: e.target.value }));
        } else {
            updateEmails((prev) => ({ ...prev, login: e.target.value }));
        }
    }

    const login = async (e)=>{
        if(emails.login.indexOf("@")==-1){
            updateFocus(prev=>{return {...prev,login:true}})
            return
        }
        const childrens = e.target.parentElement.children
        const email = childrens[2].value
        const password = childrens[4].value
        updateAlert({bg:"yellow",content:"Loading...",display:"show"})
        try{
            const response = await axios.post(`${url}/login`,{email:email,password:password})
            if(! response.data){
                updateAlert({bg:"red",content:"Invalid Creadentials",display:"show"})
            }else{
                updateAlert({bg:"green",content:"Logged in as "+response.data.username,display:"show"})
                updateUser({name:response.data.username,_id:response.data._id,token:response.data.token})
                localStorage.setItem("task-id",response.data._id)
                navigate("/")

            }
            // console.log(response)
        }catch(e){
            updateAlert({bg:"red",content:"Server Busy!",display:"show"})
        }
    }

    const signup = async (e)=>{
        if(emails.signup.indexOf("@")==-1){
            updateFocus(prev=>{return {...prev,signup:true}})
            return
        }
        const childrens = e.target.parentElement.children
        const name = childrens[2].value
        const email = childrens[4].value
        const password = childrens[6].value
        updateAlert({bg:"yellow",content:"Please wait, It may take few seconds to hash your passwords to store it securely.",display:"show"})
        try{
            const response = await axios.post(`${url}/register`,{username:name,email:email,password:password})
            updateAlert({bg:"green",content:response.data,display:"show"})
        }catch(err){
            updateAlert({bg:"red",content:err.response.data,display:"show"})
        }
        navigate("/login")
    }

    
  return (
    <div>
        {/* login form */}
        <div className={`w-11/12 bg-white rounded h-min absolute top-1/2 ${LSToggler.login} transform-center max-w-sm flex flex-col gap-2 justify-between p-5 transition-all duration-500 ease-in-out`} id='1'>
            <h1 className='text-2xl mb-3'>Login Page</h1>
            <label htmlFor="Email">Email:</label>
            <input
                className={`border-gray-400 border-2 rounded focus:border-green-500 outline-none`}
                type="text"
                id="Email"
                placeholder="abc@gmail.com"
                autoComplete="on"
                value={emails.login}
                onChange={updateEmailsHelper}
                onFocus={()=>updateFocus(prev=>{return {...prev,login:true}})}
                onBlur={()=>updateFocus(prev=>{return {...prev,login:false}})}
            />
            {focus.login && emails.login.indexOf("@")==-1 && <p className='text-red-800 text-sm'>Email not valid</p>}

            <label htmlFor="password">Password</label>
            <input className='border-gray-400 border-2 rounded focus:border-green-500 outline-none' type="password" id='password' autoComplete='on'/>
            <button className='bg-green-500 rounded' onClick={login}>Login</button>
            <p>don't have an account? <span className="text-blue-800 cursor-pointer" onClick={()=>updateLSToggler({login:"-left-1/2",signup:"left-1/2"})}>Register</span></p>
        </div>
        
        {/* signupForm */}
        
        <div className={`w-11/12 bg-white rounded h-min absolute top-1/2 ${LSToggler.signup} transform-center max-w-sm flex flex-col gap-2 justify-between p-5 transition-all duration-500 ease-in-out` } id='2'>
            <h1 className='text-2xl mb-3'>Register Page</h1>
            <label htmlFor="name">Username:</label>
            <input className='border-gray-400 border-2 rounded focus:border-green-500 outline-none' type="text" id='name' placeholder='eg.Snake babu,kaipulla etc..' autoComplete='on' />
            <label htmlFor="SEmail">Email:</label>
            <input className='border-gray-400 border-2 rounded focus:border-green-500 outline-none' type="text" id='SEmail' placeholder='abc@gmail.com' autoComplete='on' value={emails.signup} onChange={updateEmailsHelper} onFocus={()=>updateFocus(prev=>{return {...prev,signup:true}})}
                onBlur={()=>updateFocus(prev=>{return {...prev,signup:false}})} />
            {focus.signup && emails.signup.indexOf("@")==-1 && <p className='text-red-800 text-sm'>Email not valid</p>}
            
            <label htmlFor="Spassword">Password</label>
            <input className='border-gray-400 border-2 rounded focus:border-green-500 outline-none' type="password" id='Spassword' autoComplete='on'/>
            <button className='bg-green-500 rounded ' onClick={signup}>Register</button>
            <p>Already have an account? <span className="text-blue-800 cursor-pointer"onClick={()=>updateLSToggler({login:"left-1/2",signup:"-left-1/2"})}>Login</span></p>
        </div>
    </div>
  )
}

export default Login