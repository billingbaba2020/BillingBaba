import React, { useEffect, useState } from "react";
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
  return (
    <div id="Home">
      <Sidebar data={data} part={part} subpart={subpart} />
      <div className="body">
        <div id="nav">
          <div className="inp">
            <input
              type="text"
              className="searchbar"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
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
          <div className="relative">

          <button onClick={()=>sethelp(!help)} className="text-nowrap font-semibold px-2 text-blue-600 hover:underline">Need Help?</button>
          {help && (
            <div className="absolute bg-white top-10 flex flex-col shadow-md -translate-x-[10%]">
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Schedule meeting</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Send Email</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Whatsapp</span>
              <span className="p-2 border border-gray-200 text-nowrap text-center hover:bg-gray-200">Live chat</span>
            </div>
          )}
          </div>

          <button className="addSale" onClick={() => Navigate("/addsales")}>
            Add Sale <span>{"+"}</span>
          </button>
          <button className="purchase" onClick={() => Navigate("/addPurchase")}>
            Add Purchase <span>{"+"}</span>
          </button>
          <button className="addMore" onClick={() => setToggle(!toggle)}>
            Add More <span>{"+"}</span>
            <div className={toggle ? "drop active" : "drop"}>
              <button onClick={() => Navigate("/addsales")}>Add Sales</button>
              <button onClick={() => Navigate("/addpurchase")}>
                Add Purchase
              </button>
              <button onClick={() => Navigate("/AddParties")}>
                Add Parties
              </button>
              <button onClick={() => Navigate("/add-items")}>Add Items</button>
              <button onClick={() => Navigate("/add-sales-order")}>
                Add Sales Orders
              </button>
              <button onClick={() => Navigate("/add-purchase-order")}>
                Add Purchase Orders
              </button>
              <button onClick={() => Navigate("/quick-billing")}>
                Quick Billing
              </button>
              {/* <div className="l">

              </div>
              <div className="r">
                <button>-</button>
                <button>-</button>
              </div> */}
            </div>
          </button>
        </div>
        {children}
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}
