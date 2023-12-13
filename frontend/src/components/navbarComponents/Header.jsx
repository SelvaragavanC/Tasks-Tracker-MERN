import React, { useState } from 'react'
import NavItem from './navItem'
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import MobHeader from './MobHeader';

function Header() {
  const [toggler,updateToggler] = useState(true)
  const handleToggler = (e)=>{
    updateToggler(prev=>!prev)
  }
  const items  = [
    {
      content:"Home",
      id:"1",
    },
    {
      content:"groups",
      id:"2",
    },
    {
      content:"search",
      id:"3",
    },
    {
      content:"create",
      id:"4",
    }
  ]
  return (
    <div className='p-0'>
      <div className="bg-white h-12 flex items-center justify-between px-3 rounded relative z-10">
          <div className='text-2xl font-bold tracking-wide ml-2 '>TaskX</div>
          <div className='sm:flex hidden  gap-5'>
            {items.map(element=>{
              return(
                <NavItem name={element.content} key={element.id} />
              )
            })}
          </div>
          <div className="flex items-center gap-3">
            <div className='rounded bg-green-500 p-1 text-white px-5 cursor-pointer'>Login</div>
            <button className='sm:hidden' onClick={handleToggler}>{toggler?<FaBarsStaggered/>:<IoCloseSharp/>}</button>
          </div>
      </div>
      <MobHeader navs={items} disp={toggler?"-top-full":"top-10"}/>
    </div>
  )
}

export default Header