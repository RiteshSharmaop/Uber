import React, { useEffect, useRef, useState } from "react";
import {useGSAP} from "@gsap/react"
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'

function Home() {
  const [pickup , setPickup] = useState('')
  const [destination , setDestination] = useState('')
  const [panelOpen , setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)


  const submitHandler = (e) => {
    e.preventDefault();
  };
  
  
  useGSAP(()=>{
    if(panelOpen){
      gsap.to(panelRef.current, {
        height:'70%'
      })
      gsap.to(panelCloseRef.current,{
        opacity: 1
      })
    }else {
      gsap.to(panelRef.current, {
        height:'0%'
      })
      gsap.to(panelCloseRef.current,{
        opacity: 0
      })
    }
  },[panelOpen])

  return (
    <div className="h-screen relative">
      <img
        className="w-17 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uberimage"
        srcset=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt=""
          srcset=""
        />
      </div>

      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={()=>{
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={()=>{
                setPanelOpen(true);
              }}
              value= {pickup}
              onChange={(e)=>{
                setPickup(e.target.value)
              }
              }
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up Location "
            />
            <input
              onClick={()=>{
                setPanelOpen(true);
              }}
              value= {destination}
              onChange={(e)=>{
                setDestination(e.target.value)
              }
            }
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination "
            />
          </form>
        </div>
        <div 
        ref={panelRef}
         className="h-0 bg-red-500 opacity-0  "></div>
      </div>
    </div>
  );
}

export default Home;
