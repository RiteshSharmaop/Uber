import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CaptainLogout() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout` ,
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 201){
            localStorage.removeItem('token');
            navigate('/captain-login')
        }
    })
  return (
    <div>
      Captain Logout
    </div>
  )
}

export default CaptainLogout