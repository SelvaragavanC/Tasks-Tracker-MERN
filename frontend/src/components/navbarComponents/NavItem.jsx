import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavItem({name}) {
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
    <div className='font-medium capitalize cursor-pointer underline-offset-4 transition-all duration-1000 ease-in hover:underline' onClick={navigateHelper}>{name}</div>
  )
}

export default NavItem