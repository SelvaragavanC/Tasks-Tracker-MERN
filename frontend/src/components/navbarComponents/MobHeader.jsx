import React from 'react'
import { useNavigate } from 'react-router-dom'

function MobHeader({navs,disp}) {
  const navigate = useNavigate()
  const navRoutes = {
    "home":"/",
    "create":"/create",
    "groups":"/groups",
    "search":"/search"
  }
  const navigateHelper = (e)=>{
    navigate(navRoutes[e.target.innerHTML.toLowerCase()])
  }
  return (
    <div className={`absolute ${disp} bg-white w-full left-0 pl-5 transition-all duration-500 z-10 sm:hidden`}>
        {navs.map(element=>{
            return(
                <div className="my-5 font-medium capitalize cursor-pointer underline-offset-4 transition-all duration-1000 ease-in hover:underline" key={element.id} onClick={navigateHelper}>{element.content}</div>
            )
        })}
    </div>
  )
}

export default MobHeader