import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [captainData, setCaptainData] = useState({});

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const navigate = useNavigate();


  const submitHandler = async(e) => {

    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`, captainData
    );
    if (response.status === 201) {
      const data = response.data.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }


    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");

  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 ml-3 mb-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2 ">
            What's our Captain's Name?
          </h3>
          <div className="flex gap-2 mb-4">
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
          <h3 className="text-lg font-medium mb-2 ">
            What's our Captain's Email?
          </h3>
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

        <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
        <div className="flex gap-2 mb-4">
            <input
                required
                type="text"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="bg-[#eeee] px-4 py-2 rounded border w-1/2 text-lg placeholder:text-base"
                placeholder="Vehicle Color"
            />
            <input
                required
                type="text"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="bg-[#eeee] px-4 py-2 rounded border w-1/2 text-lg placeholder:text-base"
                placeholder="License Plate"
            />
        </div>
        <div className="flex gap-2 mb-4">
            <input
                required
                type="number"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className="bg-[#eeee] px-4 py-2 rounded border w-1/2 text-lg placeholder:text-base"
                placeholder="Seating Capacity"
            />
            <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-[#eeee] px-4 py-2 rounded border w-1/2 text-lg"
            >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="moto">Moto</option>
                <option value="auto">Auto</option>
            </select>
        </div>
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
        <p className="text-left text-[10px]">
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages,
          including by automated means,
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup;
