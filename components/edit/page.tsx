'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';


const Edit = () => {
  
  
    const [employee, setEmployee] = useState<any>({
    });
    const router = useRouter();
    const{id} = useParams();
    // const [name, setName] = useState("")
    //  const [email, setEmail] = useState("")
    //  const [age, setAge] = useState("")
    // const [phone, setPhone] = useState("")
    

    
    useEffect(() => {
      let userId:any=localStorage.getItem("UserId")
      console.log(userId)
    }, []);


    useEffect(() => {
      const fetchData = async () => {
        try {
          let userId = localStorage.getItem("UserId");
          const body = {
            employeeID: userId
          }
          const response = await axios.post<any>('http://localhost:3001/api/employee/show', body);
          
          const employeeData = (response.data)
          setEmployee(employeeData.response);
    
          console.log('Employee Data:', employeeData);
        } catch (err) {
          console.error('Error fetching employee data:', err);
        }
      };
    
      fetchData();
    }, []);
    

useEffect(() => {
  let employeeid:any=localStorage.getItem("employeeID")
  console.log("jgkkjj",employeeid.name
  )
}, []);

const handleUpdate = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  console.log('Updating with employee data:', employee);
  
  let userId = localStorage.getItem("UserId");
  const body = {
    employeeID: userId, 
    name: ""
    
  }
  console.log(body)
  axios.post('http://localhost:3001/api/employee/update', body)
    .then(result => {
      console.log('Update result:', result);
      router.push('/');
    })
    .catch(err => console.error('Error updating employee:', err));
}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className='d-flex w-100 vh-100 justify-contect-center align-items-center'>
    <div className='w-50 border bg-light p-5'>
     <h2 className='text-center mb-4'>Edit a user</h2>
     <form onSubmit={handleUpdate} className='bg-white rounded p-4 w-120 shadow-md'>     
        <div className='form-group mb-3 p-2'>
           <label htmlFor='name' className="text-sm font-medium text-gray-700">name</label>
           <input
            type='text'
            placeholder='enter name'
            value={employee.name}
            onChange={(e) => setEmployee({name:e.target.value} )}
            />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='phone'  className="text-sm font-medium text-gray-700">phone</label>
            <input
             type='number'
             placeholder='enter number'
             value={employee.phone}
             onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
            />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='age' className="text-sm font-medium text-gray-700">age</label>
            <input
             type='number'
             placeholder='enter age'
             value={employee.age}
             onChange={(e) => setEmployee({ ...employee, age: e.target.value })}
            />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='email' className="text-sm font-medium text-gray-700">email</label>
            <input
             type='email'
             placeholder='enter email'
             value={employee.email}
             onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-3">Update</button>
     </form>
    </div>
   </div>
</main>
  )
}

export default Edit