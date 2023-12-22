import React, { useEffect ,useState} from 'react'
import Loading from '../loadingComponents/Loading'
import axios from 'axios'
import url from '../../url'

function GroupAdmin({id}) {
    const [name,setName] = useState("")
    useEffect(()=>{
        (async ()=>{
            try{
                const response = await axios.get(`${url}/group/user/${id}`)
                setName(response.data)
            }catch(err){
                setName("Unknown")
            }
        })()
    },[])
  return (
    <div>Admin: {name?name:<Loading/>}</div>
  )
}

export default GroupAdmin