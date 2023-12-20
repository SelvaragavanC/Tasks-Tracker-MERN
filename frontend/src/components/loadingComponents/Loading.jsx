import React from 'react'
import { IoReload } from "react-icons/io5";

function Loading() {
  return (
    <div className='w-max h-max relative'><div className='animate-spin'><IoReload/></div></div>
  )
}

export default Loading