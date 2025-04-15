import React from 'react'
import Card from './Card'

function Blogg() {
  return (
    <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10 relative">
      <h1 className='font-bold'>Todays Top Blogss!!</h1>
      <br />
      <div className='flex items-center justify-center gap-[40px]'>
      <Card/>
      <Card/>
      <Card/>
      </div>
      
    </div>
  )
}

export default Blogg
