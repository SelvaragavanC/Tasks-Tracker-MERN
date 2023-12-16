import React from 'react'

function Home() {
  return (
    <>
      <div className='relative left-1/2 -translate-x-1/2 w-11/12 h-max px-5 bg-white rounded backdrop-blur-sm p-2 flex flex-col gap-2 mt-5'>
        <h1 className='text-2xl'>
          what's new?
        </h1>
        <p>Nothing is new here. This is a website where you can create groups and assign tasks to the members of your groups</p>
      </div>
      <div className='relative left-1/2 -translate-x-1/2  w-11/12 h-max px-5 bg-white rounded backdrop-blur-sm p-2 flex flex-col gap-2 mt-5'>
        <h1  className='text-2xl'>
          How to create a group?
        </h1>
        <p>Click create in the navbar, Then create groups</p>
      </div>
      <div className='relative left-1/2 -translate-x-1/2  w-11/12 h-max px-5 bg-white rounded backdrop-blur-sm p-2 flex flex-col gap-2 mt-5'>
        <h1 className="text-2xl">About me</h1>
        <p>I am Selvaragavan, An ug student from Karpagam college of engineering. I am a fullstack developer(MERN)</p>
      </div>
    </>
  )
}

export default Home