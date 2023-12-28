import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import url from '../../url'
import Loading from '../loadingComponents/Loading'
import GroupAdmin from './GroupAdmin'


function GroupHeaders({id,setAdmin}) {
    const [headers,setHeaders] = useState({})
    useEffect(()=>{
        (async ()=>{
            try{
               const response = await axios.get(`${url}/group/headers/${id}`) 
               setHeaders(response.data)
               setAdmin(response.data.groupAdmin)
            }catch(err){
                console.log(err)
                
            }
        })()
    },[])
  return (
    <div className='bg-white w-11/12 shadow-md shadow-black flex items-center flex-col'>
        {headers.groupName?
             <>
                <h1 className='text-3xl font-mono '>{headers.groupName}</h1>
                <GroupAdmin id={headers.groupAdmin}/>
                <p>{headers.description}</p>
             </>
        :
            <Loading/>
        }
       
    </div>
  )
}

export default GroupHeaders