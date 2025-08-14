import React from 'react'
export default function InputField({ label, ...props }){
  return (
    <div style={{marginBottom:8}}>
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  )
}
