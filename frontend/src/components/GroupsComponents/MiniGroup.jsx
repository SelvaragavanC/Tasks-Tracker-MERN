import React from 'react'
import GroupAdmin from './GroupAdmin'

function MiniGroup({groupName,description,groupAdmin}) {
  return (
    <div className='bg-white w-11/12 rounded p-2'>
        <h1 className="text-2xl text-center underline">{groupName}</h1>
        <div className='text-center'><GroupAdmin id={groupAdmin}/></div>
        <p className='text-center'>Description:{description}</p>
    </div>
  )
}

export default MiniGroup