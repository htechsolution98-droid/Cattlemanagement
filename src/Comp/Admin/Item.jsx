import React, { useEffect, useState } from 'react'
import axiosInstance from './api/axiosInstance'
import { useNavigate } from 'react-router'

const Item = () => {
    const naviagte=useNavigate()
    const [items,setItems]=useState([])

    const getItems=async()=>{
        const res=await axiosInstance.get("/gaushala/Items/Index")
        setItems(res.data ||[])
    }

    useEffect(()=>{
        getItems()
    },[])
  return (
    <div className='p-5'>
        <div className="flex justify-content-between items-center mb-4">
            <h1 className='text-xl font-bold'>Items Record</h1>

            <button className='bg-blue-600 text-white px-3 py-2 roundex-xl' onClick={()=>navigate("/admin-dashboard/items/create")}>+ Add Items</button>
        </div>
      
    </div>
  )
}

export default Item
