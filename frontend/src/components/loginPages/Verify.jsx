import React from "react";
import axios from 'axios'
import { useLocation} from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";
import url from "../../url";
import { useNavigate } from "react-router-dom";

function Verify(){
    const location = useLocation()
    const navigate = useNavigate()
    const{updateAlert} = useContext(MyContext)
    const verify = async()=>{
        const token = location.pathname.substring(1)
        updateAlert({bg:"yellow",content:"verifying...",display:"show"})
        try{
            const response = await axios.post(`${url}/register/verify`,{token:token})
            updateAlert({bg:"green",content:response.data,display:"show"})
        }catch(err){
            updateAlert({bg:"red",content:err.response.data,display:"show"})
        }
        navigate("/login")
    }
    return(
        <div className="w-1/2 bg-white flex flex-col gap-2 relative left-1/2 -translate-x-1/2 top-6 p-5">
            <p>We just wanted to verify that you're email actually exists :)</p>
            <button className="bg-green-500 p-2" onClick={verify}>Verify</button>
        </div>
    )
}

export default Verify