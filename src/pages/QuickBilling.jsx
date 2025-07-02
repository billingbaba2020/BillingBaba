import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuickBilling({
  data,
  setData,
  t = true,
  change,
  setChange,
}) {
  const Navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [payment_type, setPaymentType] = useState();
  const [paid, setPaid] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: "",
    done: true,
  });
  // const [totalAmount, setTotalAmount] = useState(0);
  const [billingItems, setBillingItems] = useState([]);
  const [CurrentItems, setCurrentItems] = useState(0);

  function generateUniqueInvoiceNumber(data) {
    const existing = new Set(data.map((item) => item.invoice_number));
    let invoice;
    do {
      invoice = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    } while (existing.has(invoice));
    return invoice;
  }

  const [invoice_number, setInvoice_number] = useState(
    generateUniqueInvoiceNumber(data.Transactions)
  );
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [invoice_date, setInvoice_date] = useState("");
  useEffect(() => {
    const today = new Date();
    setInvoice_date(formatDate(today));
  }, []);

  const handleItemSelect = async (item) => {
    const existingItemIndex = billingItems.findIndex(
      (billingItem) => billingItem.Code === item.Code
    );

    if (existingItemIndex !== -1) {
      // Item exists, increment the quantity
      setBillingItems(billingItems.map((billingItem, index) => {
        if (index === existingItemIndex) {
          let qty = parseInt(billingItem.quantity) + 1;
          let row = {
            ...billingItem,
            profit: parseInt(billingItem.iprofit) * qty,
            quantity: qty,
            descount: parseInt(billingItem.descount_per_unit) * qty,
            tax: billingItem.itax  * qty,
            total: parseInt(billingItem.itotal) * qty,
          };
          return row;
        }
        return billingItem;
      }));
    } else {
      // Item does not exist, add it to the array with a quantity of 1
      setBillingItems([...billingItems, { ...item, quantity: 1 }]);
    }

    // setTotalAmount(totalAmount + item.total);
  };

  const handleChangeItemQty = (code, qty) =>{
    setBillingItems(billingItems.map((billingItem, index) => {
      if (billingItem.Code === code) {
        // let qty = parseInt(billingItem.quantity) + 1;
        let row = {
          ...billingItem,
          profit: parseInt(billingItem.iprofit) * qty,
          quantity: qty,
          descount: parseInt(billingItem.descount_per_unit) * qty,
          tax: parseInt(billingItem.itax) * qty,
          total: parseInt(billingItem.itotal) * qty,
        };
        return row;
        
      }
      return billingItem;
    }));
  }

  const handleRemoveItem = (code) =>{
    setBillingItems(billingItems.filter((billingItem, index) => billingItem.Code !== code));
  }

  const handleIncQty = ()=>{
    if(billingItems[CurrentItems]){
      handleChangeItemQty(billingItems[CurrentItems].Code,parseInt(billingItems[CurrentItems].quantity) + 1 )
      // alert("increased")
    }else{
      alert("No Item Selected")
    }
  }
  
  const handleDecQty =()=>{
    if(billingItems[CurrentItems]){
      if(parseInt(billingItems[CurrentItems].quantity)>1){
        handleChangeItemQty(billingItems[CurrentItems].Code,parseInt(billingItems[CurrentItems].quantity) - 1 )
      }else{
        handleRemoveItem(billingItems[CurrentItems].Code)
      }
      // alert("Decreased")
    }else{
      alert("No Item Selected")
    }
  }


  const SaveBill = () => {
    let billData = {
      name: "harsh",
      phone_no: "12324323123",
      BillingAdd: "add 1",
      ShippingAdd: "add 3",
      invoice_number: "1490210125",
      invoice_date: "2024-09-15",
      state_of_supply: "Delhi",
      payment_type: "credit",
      transactionType: "Sale",
      items: [
        {
          index: 1,
          item: "Kurkure",
          qty: 1,
          unit: "Not Available",
          price_per_unit: "35",
          discount: "5",
          discountPercentage: 0,
          profit: null,
          amount: 30,
          tax: 0,
          taxPercentage: 0,
          item_details: {
            Category: "Food",
            Code: "7707335339429",
            HSN: "12312423",
            Name: "Kurkure",
            Tax: "18",
            asDate: "2024-09-14",
            atPrice: "",
            description: "Oishi",
            discount: "5",
            itemType: "product",
            location: "",
            minToMaintain: 10,
            openingQuantity: "50",
            profit: null,
            purchasePrice: "20",
            salesPrice: "35",
            stock: 49,
            wholeSalePrice: "25",
          },
          profit_per_item: null,
        },
      ],
      round_off: "",
      amount: 30,
      profit: "",
      tax: "0[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]",
      description: "desc",
      pending: 30,
      paid: 0,
      type: "sale",
    };

    if (selectedCustomer.name === "") {
      alert("Please select customer");
    }
    if (billingItems.length < 1) {
      alert("please add items inorder to save bill");
    }
    const totalAmount = billingItems.reduce(
      (total, row) => total + (parseInt(row.total) || 0),
      0
    );
    const profit = billingItems.reduce(
      (total, row) => total + (parseInt(row.profit) || 0),
      0
    );
    const totalTax = billingItems.reduce(
      (total, row) => total + (parseInt(row.tax) || 0),
      0
    );

    let pending = totalAmount - paid;
    if (selectedCustomer) {
      if (pending < selectedCustomer.creditLimit) {
        alert(
          "Customer's Credit Limit Exceeded, Do you wish to continue transaction?"
        );
      }
    }

    const newData = {
      name: selectedCustomer ? selectedCustomer.name : "",
      phone_no: selectedCustomer.phoneNo,
      BillingAdd: selectedCustomer.Add,
      ShippingAdd: "",
      invoice_number: invoice_number ? invoice_number : "",
      invoice_date: invoice_date ? invoice_date : "",
      state_of_supply: selectedCustomer.state,
      payment_type: paid ? "credit" : "cash",
      transactionType: "Sale",
      items: billingItems ? billingItems : "",
      round_off: "",
      amount: totalAmount,
      total: totalAmount,
      profit: profit ? profit : "",
      tax: totalTax,
      description: "",
      pending: paid ? totalAmount - paid : 0,
      paid: paid ? paid : totalAmount,
      type: "sale",
      image: "",
    };

    let newDa = data;

    // UPDATING ITEM's Stock
    newData.items.map((ele) => {
      const foundItem = newDa.items.find((ele1) => ele1.Name === ele.item);
      if (foundItem) {
        foundItem.stock = foundItem.stock
          ? parseInt(foundItem.stock) - parseInt(ele.qty)
          : -parseInt(ele.qty);
      }
    });

    // UPDATING DATA
    newDa.Transactions
      ? newDa.Transactions.push(newData)
      : (newDa.Transactions = [newData]);
    newDa.sales ? newDa.sales.push(newData) : (newDa.sales = [newData]);

    // change everywehre this is used to the sum of sales where payment type is credit
    if (newData.payment_type == "credit") {
      newDa.sale_pending
        ? (newDa.sale_pending += parseFloat(newData.total))
        : (newDa.sale_pending = parseFloat(newData.total));
      newDa.to_collect
        ? (newDa.to_collect += parseFloat(newData.pending))
        : (newDa.to_collect = parseFloat(newData.pending));

      let party = newDa.parties.find(
        (ele, index) =>
          ele.partyName === selectedCustomer.name ||
          ele?.name === selectedCustomer.name
      );

      party?.credit
        ? (newDa.parties.find(
            (ele, index) =>
              ele.partyName === selectedCustomer.name ||
              ele.name === selectedCustomer.name
          ).credit += parseFloat(newData.pending))
        : (newDa.parties.find(
            (ele, index) =>
              ele.partyName === selectedCustomer.name ||
              ele.name === selectedCustomer.name
          ).credit = parseFloat(newData.pending));
    } else {
      console.log("CASH IN HAND INCREASED");
      newDa.cash_in_hands
        ? (newDa.cash_in_hands += parseFloat(newData.total))
        : (newDa.cash_in_hands = parseFloat(newData.total));
      console.log(newDa);
    }
    newDa.total_sales
      ? (newDa.total_sales += parseFloat(newData.total))
      : (newDa.total_sales = parseFloat(newData.total));
    console.log(newData);
    console.log(newDa);
    setData(newDa);
    setChange(!change);
    Navigate("/sale-invoice");
  };

  // ======================= Barcode Locha =====================
  let barcode = "";
  let lastKeyTime = Date.now();
  let [barcodes, setbarcodes] = useState([]);


  useEffect(() => {
    const handleEvent = async (event) => {
      const currentTime = Date.now();
      // Check if the time between keypresses is less than 50ms to determine if it's part of a barcode scan
      if (currentTime - lastKeyTime > 50) {
        barcode = ""; // Reset barcode if too much time has passed
      }
      lastKeyTime = currentTime;
  
      // Filter out non-character keys
      if (event.key.length === 1) {
        barcode += event.key;
      }
  
      if (event.key === "Enter") {
        if (barcode) {
          // setbarcodes([...barcodes, barcode]);
          let item = data.items.find((item, i) => item.Code === barcode);
          if (item) {
            await handleItemSelect({
              item: item.name,
              item_details: item,
              ...item,
              price_per_unit: item.salesPrice,
              unit: item.unit?.primary,
              quantity: 1,
              total: item.salesPrice,
            });
          } else {
            alert("Item not found");
          }
          barcode = ""; // Clear the barcode after processing
        }
      }
    }
    document.addEventListener("keydown", handleEvent);
    return () => {
      document.removeEventListener("keydown", handleEvent)
    }
  }, []);

  // ======================= Shortcuts locha ===================

  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentLen = billingItems.length; // Get the latest length
      // if (event.shiftKey && event.key === "r") {
      if (event.key === "ArrowDown") {
        if (CurrentItems >= currentLen - 1) {
          setCurrentItems(0);
        } else {
          setCurrentItems((prev) => prev + 1);
        }
        // alert(currentLen + " | " + CurrentItems); // Updated length will now be shown
      }
      if (event.key === "ArrowUp") {
        if (CurrentItems <= 0) {
          setCurrentItems(currentLen - 1);
        } else {
          setCurrentItems((prev) => prev - 1);
        }
        // alert(currentLen + " | " + CurrentItems); // Updated length will now be shown
      }
      if (event.key === "+") {
        handleIncQty()
      }
      if (event.key === "-") {
        handleDecQty()
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [billingItems, CurrentItems]);


  return (
    <div id="QuickBilling">
      {/* Left side */}
      <div className="l text-sm">
        <div className="w-[75vw]">
          <div className="relative w-full my-1">
            <input
              type="text"
              placeholder="Search item..."
              className="p-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <ul className="absolute w-full bg-white z-10 shadow-lg rounded-lg overflow-hidden">
                {console.log(data.items)}
                {data.items
                  ?.filter((item, index) =>
                    item.Name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <li
                      key={item.Code}
                      onClick={() => {
                        handleItemSelect({
                          item: item.Name,
                          Name: item.Name,
                          item_details: item,
                          // ...item,
                          itax: (item.Tax / 100) * item.salesPrice,
                          tax: (item.Tax / 100) * item.salesPrice,
                          Code: item.Code,
                          itotal: item.salesPrice,
                          price_per_unit: item.salesPrice,
                          unit: item.unit?.primary,
                          taxPercentage: item.Tax,
                          descount_per_unit: item.discount,
                          descount: item.discount,
                          quantity: 1,
                          profit:item.profit,
                          iprofit:item.profit,
                          total: item.salesPrice,
                        });
                        setSearchTerm("");
                      }}
                      className="flex w-full justify-between items-center p-2 hover:bg-gray-100"
                    >
                      <p>
                        {item.Code} - {item.Name}
                      </p>
                      <p>{item.salesPrice}</p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div className="overflow-x-auto ">
            <table className="min-w-full table-auto border-collapse border border-gray-300 my-1">
              <thead className="">
                <tr className=" bg-gray-100">
                  <th className="p-2 text-sm text-center  border border-gray-300">
                    #
                  </th>
                  <th className="p-2 text-sm text-center border border-gray-300">
                    ITEM CODE
                  </th>
                  <th className="p-2 text-sm w-1/3 text-center border border-gray-300">
                    NAME
                  </th>
                  <th className="p-2 text-sm text-center border border-gray-300">
                    QTY
                  </th>
                  <th className="p-2 text-sm text-center border border-gray-300">
                    Unit
                  </th>
                  <th className="p-2 text-sm text-center border border-gray-300">
                    PRICE / UNIT
                  </th>
                  <th className="p-2 text-sm text-center border border-gray-300">
                    DESCOUNT
                  </th>
                  <th className="p-2 text-sm text-center border border-gray-300">
                    TAX
                  </th>
                  <th className="p-2 text-sm text-center border border-gray-300">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {billingItems.map((item, index) => (
                  <tr
                    key={index}
                    // className={CurrentItems === index ? "selected" : ""}
                    className={`text-center ${
                      CurrentItems === index && "bg-gray-200"
                    }`}
                  >
                    <td className="p-2 text-md text-center border border-gray-300">
                      {index}
                    </td>
                    <td className="p-2 text-md  text-center border border-gray-300">
                      {item.Code}
                    </td>
                    <td className="p-2 w-1/3 text-md text-center border border-gray-300">
                      {item.Name}
                    </td>
                    <td className="p-2 text-md  text-center border border-gray-300">
                      {item.quantity}
                    </td>
                    <td className="p-2 text-md  text-center border border-gray-300">
                      {item.unit || "none"}
                    </td>
                    <td className="p-2 text-md  text-center border border-gray-300">
                      {item.price_per_unit}
                    </td>
                    <td className="p-2 text-md  text-center border border-gray-300 ">
                      {item.descount}
                    </td>
                    <td className="p-2 text-md  text-center border border-gray-300">
                      {item.tax}
                    </td>
                    <td className="p-2 text-md text-center border border-gray-300">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="b">
          <button className="p-2 m-2 bg-blue-200 text-sm flex flex-col items-center justify-center hover:bg-blue-300 rounded shadow" 
          onClick={()=>{if(CurrentItems >= (billingItems.length - 1)){
            setCurrentItems(0)
          }else{
            setCurrentItems(CurrentItems+1)
          }}}
          >
            <span>Navigate up</span><span className="text-gray-500 font-semibold">ArrowUp</span> 
          </button>
          <button className="p-2 m-2 bg-blue-200 text-sm flex flex-col items-center justify-center hover:bg-blue-300 rounded shadow"
            onClick={()=>{if(CurrentItems <= 0){
              setCurrentItems(billingItems.length - 1)
            }else{
              setCurrentItems(CurrentItems-1)
            }}}
          >
            <span>Navigate Down</span><span className="text-gray-500 font-semibold">ArrowDown</span> 
          </button>
          <button className="p-2 m-2 bg-blue-200 text-sm flex flex-col items-center justify-center hover:bg-blue-300 rounded shadow"
            onClick={()=>handleIncQty()}
          >
            <span>Increase Quanitity</span><span className="text-gray-500 font-semibold">' + '</span> 
          </button>
          <button className="p-2 m-2 bg-blue-200 text-sm flex flex-col items-center justify-center hover:bg-blue-300 rounded shadow"
            onClick={()=>handleDecQty()}
          >
            <span>Decrease Quantity</span><span className="text-gray-500 font-semibold">' - '</span> 
          </button>
          {/* <button className="p-2 m-2 bg-blue-200 hover:bg-blue-300 rounded shadow">
            Change Quantity
          </button> */}
          <button className="p-2 m-2 bg-blue-200 text-sm flex flex-col items-center justify-center hover:bg-blue-300 rounded shadow"
            onClick={()=>{if(billingItems[CurrentItems]){
              handleRemoveItem(billingItems[CurrentItems].Code)
          }else{
            alert("No Item Selected")
          }}}
          >
            <span>Remove Item</span><span className="text-gray-500 font-semibold">' - '</span> 
          </button>
          <button className="p-2 m-2 bg-gray-200 hover:bg-blue-300 rounded shadow">
            Item Descount
          </button>
          <button className="p-2 m-2 bg-gray-200 hover:bg-blue-300 rounded shadow">
            Bill Item
          </button>
          <button className="p-2 m-2 bg-gray-200 hover:bg-blue-300 rounded shadow">
            Additionl changes
          </button>
          <button className="p-2 m-2 bg-gray-200 hover:bg-blue-300 rounded shadow">
            Bill discount
          </button>
          <button className="p-2 m-2 bg-gray-200 hover:bg-blue-300 rounded shadow">
            Loyal points
          </button>
          <button className="p-2 m-2 bg-gray-200 hover:bg-blue-300 rounded shadow">
            Remarks
          </button>
        </div>
      </div>
      {/* // Right side */}
      <div className="r text-sm">
        <div className="border border-r-0 border-t-0 border-gray-300 p-2 w-full">
          <h1 className="text-md font-Poppins mb-2 font-semibold">
            Customer details
          </h1>
          <div className="relative w-full">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-"
              placeholder="Search customer..."
              value={selectedCustomer.name}
              onChange={(e) =>
                setSelectedCustomer({ name: e.target.value, done: false })
              }
            />
            {selectedCustomer.name && !selectedCustomer.done && (
              <ul className="absolute top-8 left-0 shadow w-full bg-white">
                {data.parties
                  .filter((customer) =>
                    customer.partyName
                      .toLowerCase()
                      .includes(selectedCustomer?.name?.toLowerCase())
                  )
                  .map((customer) => (
                    <li
                      key={customer.partyName}
                      onClick={() => {
                        setSelectedCustomer({
                          name: customer.partyName,
                          ...customer,
                          done: true,
                        });
                      }}
                      className="p-2 border flex justify-between border-gray-300 hover:bg-gray-200 cursor-pointer"
                    >
                      <h1 className="font-semibold">{customer.partyName}</h1>
                      <h1>credit: {customer.credit}</h1>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <div className="border border-r-0 border-t-0 flex flex-col gap-2 h-full border-gray-300 p-2">
          <h1 className="text-md font-Poppins font-bold">Bill Details</h1>
          <div className="flex justify-between text-sm">
            <h2>Sub Total: </h2>
            <h2>
              {billingItems.reduce(
                (total, row) => total + (parseFloat(row.total) || 0),
                0
              )}
            </h2>
          </div>
          <div className="flex justify-between text-sm">
            <h2>Total Descounts: </h2>
            <h2>
              {billingItems.reduce(
                (total, row) => total + (parseFloat(row.descount) || 0),
                0
              )}
            </h2>
          </div>
          <div className="flex justify-between text-sm">
            <h2>Total Tax: </h2>
            <h2>
              {billingItems.reduce(
                (total, row) => total + (parseFloat(row.tax) || 0),
                0
              )}
            </h2>
          </div>
          <div className="flex border-t border-gray-300 mt-2 pt-2 justify-between">
            <p className="text-sm">
              <h1 className="text-lg font-Poppins font-bold">Total </h1>
              (Items: {billingItems.length}, Quantity:
              {billingItems.reduce(
                (total, row) => total + (parseFloat(row.quantity) || 0),
                0
              )}
              )
            </p>
            <h1 className="text-lg font-Poppins font-bold">
              {billingItems.reduce(
                (total, row) => total + (parseFloat(row.total) || 0),
                0
              )}
            </h1>
          </div>
        </div>
        <div className="border  border-r-0 border-b-0 border-t-0 border-gray-300 p-3 pb-2">
          {selectedCustomer.name !== "" && (
            <>
              <div className="flex my-1 justify-between items-center w-full">
                <p className="text-sm">Phone No</p>
                <p className="font-semibold text-sm">
                  {selectedCustomer.phoneNo}
                </p>
              </div>
              <div className="flex my-1 justify-between items-center w-full">
                <p className="text-sm">Address</p>
                <p className="font-semibold text-sm">{selectedCustomer.Add}</p>
              </div>
              <div className="flex my-1 justify-between items-center w-full">
                <p className="text-sm">State</p>
                <p className="font-semibold text-sm">
                  {selectedCustomer.state}
                </p>
              </div>
            </>
          )}
          <h1 className="text-md font-semibold"> Cash/UPI</h1>
          <div className="flex my-1 justify-between items-center w-full">
            <p className="text-sm">Payment Method</p>
            <select
              name=""
              className="p-2 w-[200px] border border-gray-300 rounded-md"
              id=""
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
            </select>
          </div>
          <div className="flex my-1 justify-between items-center w-full">
            <p className=" text-sm">Amount Recieved</p>
            <input
              name=""
              className="p-2 w-[200px] border border-gray-300 rounded-md"
              id=""
            />
          </div>
          <div className="flex mb-4 text-lg justify-between w-full font-semibold">
            <p className="text-md">Change to return</p>
            <p className="text-md">0</p>
          </div>

          <button
            className="bg-red-500 text-white p-2 font-semibold hover:bg-red-600 hover:border-red-600 border-2 rounded  w-full text-center"
            onClick={() => SaveBill()}
          >
            Save Bill
          </button>
          <button
            className="bg-green-500 text-white p-2 font-semibold hover:bg-green-600 hover:border-green-600 border-2 rounded mt-4 w-full text-center"
            onClick={() => Navigate("/")}
          >
            Partialy Pay
          </button>
        </div>
      </div>
    </div>
  );
}
