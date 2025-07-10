import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SortableTable from "../../components/Tables";

export default function PurchaseOrder({ data, setData, change, setChange }) {
  var [page, setPage] = useState("saleOrder");
  let columns = [
    { key: "invoice_date", label: "Date",type:"string" },
    { key: "name", label: "Party Name" ,type:"string"},
    { key: "invoice_number", label: "Chalan Number",type:"number" },
    { key: "due_date", label: "Due Date",type:"string" },
    { key: "total", label: "Total" ,type:"number"},
    { key: "pending", label: "Pending" ,type:"number"},
    { key: "status", label: "status",type:"string" },
    { key: "action", label: "Action" ,type:"string"},
    { key: "DropDown", label: "-" },
  ];
  var sendingArray = data?.Transactions?.filter(
         (ele) => ele.type === "Purchase order"
    )?.map((ele) => {
    return {
      ...ele,
      invoice_date: new Date(ele.invoice_date).toLocaleDateString(),
      due_date: new Date(ele.due_date).toLocaleDateString(),
      status:ele.status? ele.status:"open",
      action:(<button className=" py-1 px-3 bg-gray-200 shadow-md text-blue-600">
           Convert to sale
      </button>),
      menuItem: [
        { label: "print" },
        { label: "forward" },
        { label: "generate Invoice" },
        { label: "recieve payment" },
        { label: "View/Edit" },
        { label: "cancel" },
        { label: "Delete" },
        { label: "Duplicate" },
        { label: "Print" },
      ],
    };
  });
  const Navigate = useNavigate();
  return (
    <div id="sale-Order">
      <div className="topbar">
        <button className="selected" onClick={() => setPage("saleOrder")}>
          Purchase Order
        </button>
      </div>
      {data?.Transactions?.filter((ele) => ele.type === "Purchase order") ? (
        <div id="saleInvoice">
          {data && (
            <div className="">
                <div className="flex justify-between p-4 rounded-md bg-gray-100 items-center">
                  <h1>TRANSACTIONS</h1>
                  <div className="flex gap-2">
                    <div className="flex border border-gray-700 rounded-full px-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                      </svg>
                      <input autoComplete="off" type="" className="bg-transparent" />
                    </div>
                  <button className="px-2 py-1 rounded-full font-semibold text-white bg-blue-500 ml-2" onClick={() => Navigate("/add-purchase-order")}>
                     + Add Purchase Order
            </button>
                  </div>
                </div>

                <SortableTable data={sendingArray} columns={columns} />
              </div>
          )}
        </div>
      ) : (
        <div className="service">
          <img src="./assets/bill.jpg" alt="" />
          <p>
            Make & share purchase orders with your parties & convert them to
            purchase bill instantly.
          </p>
          <button onClick={() => Navigate("/add-purchase-order")}>
            Add Your First Purchase Order
          </button>
        </div>
      )}
    </div>
  );
}
