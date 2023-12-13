import React from 'react'

function MobHeader({navs,disp}) {
  return (
    <div className={`absolute ${disp} bg-white w-full left-0 pl-5 transition-all duration-500 z-0 sm:hidden`}>
        {navs.map(element=>{
            return(
                <div className="my-5 font-medium capitalize cursor-pointer underline-offset-4 transition-all duration-1000 ease-in hover:underline" key={element.id}>{element.content}</div>
            )
        })}
    </div>
  )
}

export default MobHeader