import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/sidebar";
import Dashboard from "./dashboard";
import { getUidFromLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ children, part, subpart, data, setData }) {
  const [toggle, setToggle] = useState(false);
  const [help, sethelp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    let uid = getUidFromLocalStorage();
    // alert(uid);
    if (!uid) {
      Navigate("/landing");
    }
  }, []);
  const pages = [
    { name: "Home", to: "/" },
    { name: "Parties", to: "/" },
    { name: "Items", to: "/" },
    { name: "Quick Billing", to: "/" },
    { name: "Add Purchase", to: "/" },
    { name: "Add Purchase Order", to: "/" },
    { name: "Payment Out", to: "/" },
    { name: "Purchase Bill", to: "/" },
    { name: "Purchase Order", to: "/" },
    { name: "Purchase Return", to: "/" },
    { name: "Add Estimations", to: "/" },
    { name: "Add Payments", to: "/" },
    { name: "Add Sales", to: "/" },
    { name: "Add Sales Order", to: "/" },
    { name: "Delievery Chalan", to: "/" },
    { name: "Estimated Quortation", to: "/" },
    { name: "Payments In", to: "/" },
    { name: "Sales Invoice", to: "/" },
    { name: "Sales Order", to: "/" },
    { name: "Sales return", to: "/" },
    { name: "Add Expense", to: "/" },
    { name: "Add Items", to: "/" },
    { name: "Add Parties", to: "/" },
    { name: "Cash and Bank", to: "/" },
    { name: "Subscription Plan", to: "/" },
    { name: "Dashboard", to: "/" },
    { name: "E-way Bill", to: "/" },
    { name: "Expense", to: "/" },
    { name: "Settings", to: "/" },
    { name: "utils", to: "/" },
  ];
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        sethelp(false);
      }
    };

    if (help) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [help]);
  
  const dropdownRef2 = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setToggle(false)
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div id="Home">
      <Sidebar data={data} part={part} subpart={subpart} />
      <div className="body">
        <div id="nav" className="flex items-center justify-between px-8 py-4 bg-[#fcfcfe]">
  {/* Left: Business Name */}
  <span className="flex items-center text-gray-400 text-lg font-medium">
    <span className="inline-block w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
    {data?.BusinessName || "Enter Business Name"}
  </span>

  {/* Right: Buttons */}
  <div className="flex items-center gap-3">
    <button
      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full transition"
      onClick={() => Navigate("/addsales")}
    >
      <span className="text-xl font-bold">+</span> Add Sale
    </button>
    <button
      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition"
      onClick={() => Navigate("/addPurchase")}
    >
      <span className="text-xl font-bold">+</span> Add Purchase
    </button>
    <button
      className="flex items-center justify-center bg-blue-50 text-blue-500 font-bold w-10 h-10 rounded-full text-xl"
      onClick={() => {/* Add your handler here */}}
    >
      +
    </button>
    <span className="border-l h-6 border-gray-300 mx-2"></span>
    <span className="text-2xl text-gray-400 cursor-pointer">⋮</span>
  </div>
</div>
        <div className="inp">
            {searchTerm && (
              <ul>
                {pages
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <li
                      key={item.itemCode}
                      onClick={() => {
                        Navigate(item.to);
                        setSearchTerm("");
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div className="relative" ref={dropdownRef}>

          {help && (
            <div className="absolute bg-white top-10 flex flex-col shadow-md -translate-x-[20%]">
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Schedule meeting</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Send Email</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Whatsapp</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Live chat</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Report Missing feature</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center bg-gray-200">Ph: 7987016325</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center bg-gray-200">email: billingbabaofficial@gmail.com</span>
              {/* <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200"><span className="font-xs">or contact</span></span> */}

            </div>
          )}
          </div>
          <div className="flex items-center justify-center">
      {/* Sale Button */}
        </div>
        {children}
      </div>
      </div>
  );
}
