import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


function CaptainSignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [captainData, setCaptainData] = useState({})
    
    
    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({
          fullname:{
            firstName, lastName
          },
          email, 
          password})
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
            <img
                    className="w-16 ml-3 mb-2"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
                    alt=""
                />
                <form onSubmit={(e)=>submitHandler(e)}>
                    <h3 className="text-lg font-medium mb-2 ">What's our Captain's  Name?</h3>
                    <div className='flex gap-2 mb-4'>
                    <input
                        required
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-[#eeee] px-4 py-2 rounded border w-1/2 text-lg placeholder:text-base "
                        placeholder="firstname "
                    />
                    <input
                        required
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-[#eeee]  px-4 py-2 rounded border w-1/2 text-lg placeholder:text-base "
                        placeholder="lastname"
                    />
                    </div>
                    <h3 className="text-lg font-medium mb-2 ">What's our Captain's Email?</h3>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeee] mb-4 px-4 py-2 rounded border w-full text-lg placeholder:text-base "
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
                    <button className="bg-[#111] text-white px-4 py-2 rounded  w-full text-lg  ">
                        Register
                    </button>

                    <p className="text-center">
                        Already have an account?
                        <Link className="text-blue-600" to="/captain-login">
                             Login
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <p className='text-left text-[10px]'>
                By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means,
                </p>
            </div>
        </div>
    );
}

export default CaptainSignup