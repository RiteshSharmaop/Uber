import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";


function CaptainLogin() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    const {captain , setCaptain} = useContext(CaptainDataContext)
    
    const navigate = useNavigate();

    const submitHandler = async(e) => {
        e.preventDefault();
        const captainData = {
            email, 
            password
        };
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
    

        if(response.status === 201){
            const data = response.data.data;
            // setCaptainData(data.captain);
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        setEmail('');
        setPassword('');
    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 ml-3 mb-2"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
                    alt=""
                />
                <form onSubmit={submitHandler}>
                    <h3 className="text-lg font-medium mb-2 ">What's your email? </h3>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeee] mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base "
                        placeholder="email@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Enter password </h3>
                    <input
                        className="bg-[#eeee] mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base "
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="password"
                    />
                    <button className="bg-[#111] text-white px-4 py-2 rounded  w-full text-lg placeholder:text-base ">
                        Login
                    </button>

                    <p className="text-center">
                        Join a Clan?
                        <Link className="text-blue-600" to="/captain-signup">
                            Register as Captain
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <Link
                to="/login" className="bg-[#9a8418] flex items-center justify-center text-white mb-4 px-4 py-2 rounded  w-full text-lg placeholder:text-base ">
                    Sign-in as User
                </Link>
            </div>
        </div>
    );
  
}

export default CaptainLogin