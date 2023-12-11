'use client'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
 
const Newpage = () => {

const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [age, setAge] = useState("")
const [phone, setPhone] = useState("")
const router = useRouter()
debugger
const Submit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/employee/store',{phone, name, email, age})
    .then(result =>{
        console.log(result)
        router.push('/')
    })
    .catch(err => console.log(err))   
}



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className='d-flex w-100 vh-100 justify-contect-center align-items-center'>
    <div className='w-50 border bg-light p-5'>
     <h2 className='text-center mb-4'>Add a user</h2>
     <form onSubmit={Submit}  className='bg-white rounded p-4 w-120 shadow-md'>
        <div className='form-group mb-3 p-2'>
           <label htmlFor='name' className="text-sm font-medium text-gray-700">name</label>
           <input type='text' placeholder='enter name'
           onChange={(e) => setName(e.target.value )}/>
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='phone'  className="text-sm font-medium text-gray-700">phone</label>
            <input type='number' placeholder='enter number'
            onChange={(e) => setPhone(e.target.value )}/>
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='age' className="text-sm font-medium text-gray-700">age</label>
            <input type='number' placeholder='enter age'
            onChange={(e) => setAge(e.target.value )}/>
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='email' className="text-sm font-medium text-gray-700">email</label>
            <input type='email' placeholder='enter email'
            onChange={(e) => setEmail(e.target.value )}/>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-3">Submit</button>
     </form>
    </div>
   </div>
</main>
  )
}

export default Newpage