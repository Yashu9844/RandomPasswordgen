"use client"

import React, { useCallback, useState ,useEffect, useRef } from 'react'
const page = () => {
    
  
const [length,setlength] =useState()
const [numberAllowed,setnumberAllowed]=useState(false)
const [charAllowed,setcharAllowed]=useState(false)
const [password,setPassword]=useState("")


const passwordRef =useRef(null)
const passwordGenerator = useCallback(() =>{

  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed){
    str+="0123456789"
  }
  if(charAllowed){
    str+="!@#$%^&*(){}"
  }
  for(let i=0;i<length;i++){

   let char = Math.floor(Math.random()*str.length+1)
   pass += str.charAt(char)
  }
  setPassword(pass)

},[length,numberAllowed,charAllowed,setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,999)
  window.navigator.clipboard.writeText(password)
},[password])


useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])

  return (

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
     <h1 className='text-white text-center my-3'>Password Genrator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type='text'
      value={password}
      className='outline-none w-full py-1 px3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button 
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
     </div>

     <div className='flex text-sm gap-x-3'>
      <div className='flex items-center gap-x-2'>
        <input 
        type='range'
        min={8}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=> {setlength(e.target.value)}}/>
        <label>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-2'>
        <input
        type='checkbox'
        defaultChecked={charAllowed}
        id='characterInput'
        onChange={()=>{
          setcharAllowed((prev)=> !prev)
        }}
        />
       <label htmlFor='charcterInput'>Characters</label>
      </div>
      <div className='flex items-center gap-x-2'>
        <input
        type='checkbox'
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setnumberAllowed((prev)=> !prev)
        }}
        />
       <label htmlFor='numberInput'>numbers</label>
      </div>
     </div>
     </div>


    

  )
}

export default page
