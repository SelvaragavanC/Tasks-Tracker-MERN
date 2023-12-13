import React from 'react'

function NavItem({name}) {
  return (
    <div className='font-medium capitalize cursor-pointer underline-offset-4 transition-all duration-1000 ease-in hover:underline'>{name}</div>
  )
}

export default NavItem