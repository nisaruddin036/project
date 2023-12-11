'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const App = () => {
  const router = useRouter()
  const [employee, setEmployee] = useState<any>([]);

  useEffect(() => {
    axios.get<any>('http://localhost:3001/api/employee')
      .then((res) => {
        setEmployee(res.data.response);
        console.log('asgduik', res.data.response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id:any) => {
    console.log('deleting employee with ID:',id);
    const body :any={
      employeeID: id
    }
    axios.post('http://localhost:3001/api/employee/delete',body)
      .then(res => {
        console.log(res);
       
      })
      .catch(err => console.log(err));
       
  }


const handleNew =(e:any, id:any) => {
  e.preventDefault()
  let userId: any = id;
  localStorage.setItem("UserId", userId);
  router.push(`/components/edit?id=${id}`)
}



  return (
    <div className="p-5 bg-light">
      <div className="bg-white shadow border">
        <div>
          <Link href="/components/new">add</Link>
        </div>
        <form className='flex-center'>
        <table className=" table min-w-full p-4">
          <thead>
            <tr>
              <th className='py-2 px-4'>ID</th>
              <th className='py-2 px-4'>Name</th>
              <th className='py-2 px-4'>Email</th>
              <th className='py-2 px-4'>Phone</th>
              <th className='py-2 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employee) && employee.map((d, i) => (
              <tr key={i}>
                <td className='py-2 px-4'>{d._id}</td>
                <td className='py-2 px-4'>{d.name}</td>
                <td className='py-2 px-4'>{d.email}</td>
                <td className='py-2 px-4'>{d.phone}</td>
                <td>
                  <button onClick={(e) => handleDelete(d._id)}>Delete</button>
                  <button onClick={(e)=> handleNew(e, d._id)}>Edit</button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </form> 
      </div>
    </div>
  );
};



export default App;


