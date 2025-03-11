import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    
    
    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({email, password})
        
        setEmail('');
        setPassword('');
    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 ml-3 mb-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt=""
                />
                <form onSubmit={(e)=>submitHandler(e)}>
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
                        New here
                        <Link className="text-blue-600" to="/signup">
                             Create new Account
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <Link
                to="/captain-login" className="bg-[#567710] flex items-center justify-center text-white mb-4 px-4 py-2 rounded  w-full text-lg placeholder:text-base ">
                    Sign-in as Captain
                </Link>
            </div>
        </div>
    );
}

export default UserLogin;
