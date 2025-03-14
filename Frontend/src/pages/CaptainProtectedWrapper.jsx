import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

function CaptainProtectedWrapper({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {captain , setCaptain} = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }
        , [token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/current-captain`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
            if(response.status === 201) {
                setCaptain(response.data.data.captain);
                setIsLoading(false);
            }
        })
        .catch((error) => {
            // console.log(error);
            localStorage.removeItem('token');
            navigate('/captain-login')
        })
    if(isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            {children}
        </div>
    )
  
}

export default CaptainProtectedWrapper




