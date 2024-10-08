import React from 'react'

function Input({className, placeholder, type}) {
  return (
    <input className={className} placeholder={placeholder} type={type} />
  )
}

export default Input