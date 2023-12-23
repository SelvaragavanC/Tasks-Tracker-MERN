import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className='w-max h-max relative'><div className='animate-spin'><AiOutlineLoading3Quarters/></div></div>
  )
}

export default Loading