import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommingSoon from "./commingSoon";

export default function Setting({ data, setData }) {
  const Navigate = useNavigate();
  const [page, setPage] = useState("general");

  // to get url prams
  const [searchParams] = useSearchParams();
  useEffect(()=>{
    setPage(searchParams.get("page")?searchParams.get("page"):"general")
  },[])
  const [popup, setpopup] = useState();

  const [newtax, setNewTax] = useState({ tax: "", taxName: "" });
  const [Lp, setLp] = useState({ lp1: "", Lp2: "" });

  const setTax = () => {
    if (newtax === undefined) return;
    if (data.customTax) {
      setData({ ...data, customTax: [...data.customTax, newtax] });
    } else {
      setData({ ...data, customTax: [newtax] });
    }
  };
  if (!data.settings) {
    setData({
      ...data,
      settings: {
        enablePasscode: false,
        businessCurrency: "",
        maxDecimal: 2,
        tntNum: false,
        estimateQ: true,
        SalePRes: true,
        OtherInc: false,
        fixAsset: false,
        DelChalan: true,
        partyGrouping: false,
        PartyShippingAdd: false,
        partyReminder: false,
        PartyLoyaltyPoints: false,
        itembarcodeScanner: false,
        itemStockMaintainance: true,
        Manifacturing: false,
        enableitem: true,
      },
    });
  }

  return (
    <div id="settings">
      <ul className="sidebar">
        <li className="t">
          <p>SETTINGS</p>{" "}
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
        </li>
        <li
          onClick={() => setPage("general")}
          className={page === "general" && "selected"}
        >
          GENERAL
        </li>
        <li
          onClick={() => setPage("transaction")}
          className={page === "transaction" && "selected"}
        >
          TRANSACTION
        </li>
        <li
          onClick={() => setPage("print")}
          className={page === "print" && "selected"}
        >
          PRINT
        </li>
        <li
          onClick={() => setPage("userM")}
          className={page === "userM" && "selected"}
        >
          USER MANAGEMENT
        </li>
        <li
          onClick={() => setPage("taxes")}
          className={page === "taxes" && "selected"}
        >
          TAXES
        </li>
        <li
          onClick={() => setPage("party")}
          className={page === "party" && "selected"}
        >
          PARTY
        </li>
        <li
          onClick={() => setPage("item")}
          className={page === "item" && "selected"}
        >
          ITEM
        </li>
      </ul>
      <div className="closebtn" onClick={() => Navigate("/")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>
      {page === "general" && (
        <div className="content">
          <div className="tile">
            <h1>Application</h1>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.enablePasscode}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enablePasscode: !data.settings?.enablePasscode,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Enable Passcode</span>
            </div>
            <div>
              <span>Business Currency</span>{" "}
              <select name="" id="">
                <option value="₹">₹ (Rs)</option>
                <option value="$">$</option>
              </select>
            </div>
            <div>
              <span>Max decimal place</span> <input autoComplete="off" type="number" />
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.TntNum}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      TntNum: !data.settings?.TntNum,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>TNT Number (Unavilable)</span>
            </div>
          </div>

          <div className="tile">
            <h1>
              <input autoComplete="off" type="checkbox"
                checked={data.settings?.multifirm}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      multifirm: !data.settings?.multifirm,
                    },
                  })
                } 
                name="" id="" />
              Multi Firm
            </h1>
            <p>Enable or disable creation & useage multiple companies</p>
          </div>
          <div className="tile">
            <h1>Backup & History</h1>
            <p>Auto backup permanent in web version</p>
            <div>
              <input autoComplete="off" type="checkbox" name="" checked disabled id="" />{" "}
              <span>Auto Backup</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.transactionhistory}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      transactionhistory: !data.settings?.transactionhistory,
                    },
                  })
                }
                disabled
                name=""
                id=""
              />{" "}
              <span>Transaction History (unavailable in beta)</span>
            </div>
          </div>
          <div className="tile">
            <h1>More Transactions</h1>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.estmateQ}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      estmateQ: !data.settings?.estmateQ,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Estimate/Quotation</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.saleOrder}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      saleOrder: !data.settings?.saleOrder,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Sale/Purchase Order</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.otherIncome}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      otherIncome: !data.settings?.otherIncome,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Other Income (unavailable)</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.fixedAssets}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      fixedAssets: !data.settings?.fixedAssets,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Fixed Assets (FA) (unavailable)</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.chalan}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      chalan: !data.settings?.chalan,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Delivery Challan</span>
            </div>
          </div>
          <div className="tile">
            <h1>Stock Transfer Between Store</h1>
            <p>
              Manage all your stores/godowns and transfer stock seamlessly
              between them. Using this feature, you can transfer stock between
              stores/godowns and manage your inventory more efficiently.
            </p>
            <br />
            <p>Multi store feature unavailable</p>
          </div>
          <div className="tile">
            <h1>Customize Your View</h1>
            <p>
              Specific for application, for web you can zoom in and out with
              `ctrl` + `+` (disabled in web)
            </p>
            <div className="">
              <input
                className="range"
                type="range"
                min={0}
                max={300}
                step={10}
                value={100}
                disabled
                // onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
      {page === "transaction" && (
        <div className="content">
          <div className="tile">
            <h1>Transaction header</h1>
            <div>
              <input autoComplete="off" type="checkbox" name="" checked id="" />{" "}
              <span>Invoice/Bill No</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" name="" id="" />{" "}
              <span>Add Time on transation (unavailable)</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" checked name="" id="" />{" "}
              <span>Cash Sale By Default</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" checked name="" id="" />{" "}
              <span>Billing Name of Parties</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" disabled name="" id="" />{" "}
              <span>Customer P.O. Details on Transactions (unavailable)</span>
            </div>
          </div>

          <div className="tile">
            <h1>Items Table</h1>
            {/* <p>Currenly Unavilable</p> */}
            <div>
              <input autoComplete="off" type="checkbox" name="" checked id="" />{" "}
              <span>Inclusive/Exclusive Tax on Rate(Price/Unit)</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" name="" checked id="" />{" "}
              <span>Display Purchase Price of Items</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" disabled name="" id="" />{" "}
              <span>Show last 5 Sale Price of Items (unavailable)</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" checked name="" id="" />{" "}
              <span>Free Item Quantity</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" checked name="" id="" /> <span>Count</span>
            </div>
          </div>

          <div className="tile">
            <h1>More Transactions Features</h1>
            <div>
              <input autoComplete="off" type="checkbox" checked name="" id="" /> <span>Quick Entry</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" disabled name="" id="" />{" "}
              <span>Do not Show Invoice Preview</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" disabled name="" id="" />{" "}
              <span>Enable Passcode for transaction edit/delete</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" name="" id="" />{" "}
              <span>Discount During Payments</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox"  name="" id="" />{" "}
              <span>Delivery Challan</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" checked name="" id="" />{" "}
              <span>Link Payments to Invoices</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" checked name="" id="" />{" "}
              <span>Due Dates and Payment Terms</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" disabled name="" id="" />{" "}
              <span>Show Profit while making Sale Invoice</span>
            </div>
          </div>
          <div className="tile">
            <h1>Taxes, Discount & Totals</h1>
            {/* <p>Auto backup permanent in web version</p> */}
            <div>
              <input autoComplete="off" type="checkbox" name="" checked disabled id="" />{" "}
              <span>Transaction wise Tax</span>
            </div>
            <div>
              <input autoComplete="off" type="checkbox" checked name="" id="" />{" "}
              <span>Transaction wise Discount</span>
            </div>
          </div>
          {/* <div className="tile">
            <h1>Stock Transfer Between Store</h1>
            <p>
              Manage all your stores/godowns and transfer stock seamlessly
              between them. Using this feature, you can transfer stock between
              stores/godowns and manage your inventory more efficiently.
            </p>
            <br />
            <p>Multi store feature unavailable</p>
          </div>
          <div className="tile">
            <h1>Customize Your View</h1>
            <p>
              Specific for application, for web you can zoom in and out with
              `ctrl` + `+`
            </p>
            <div className="">
              <input
                className="range"
                type="range"
                min={0}
                max={300}
                step={10}
                value={100}
                disabled
                // onChange={handleChange}
              />
            </div>
          </div> */}
        </div>
      )}
      {page === "print" && (
        <div className="content">
          <div className="tile">
            <h1>Print & Invoice</h1>
            <p>
              Note: Multi Design feature will be Available in upcoming updates.
            </p>
          </div>
        </div>
      )}
      {page === "userM" && (
        <div className="content">
          <div className="tile">
            <h1>User Management</h1>
            <p>
              Note: Billing Baba does not support multi - user access on the
              same device. Please logout to switch users
            </p>
          </div>
        </div>
      )}
      {page === "taxes" && (
        <div className="content">
          {popup === "addTax" && (
            <div className="popup">
              <div className="flex flex-col bg-white justify-center items-center gap-1 rounded-md p-2">
                <h1 className="font-semibold text-center">Add Custom Tax Rate</h1>
                <input
                  type="text"
                  placeholder="tax name"
                  value={newtax.taxName ? newtax.taxName : ""}
                  className="p-1 px-2 border-b"
                  onChange={(e) =>
                    setNewTax({ ...newtax, taxName: e.target.value })
                  }
                  name=""
                  id=""
                />
                <input
                  type="number"
                  placeholder="Rate %"
                  value={newtax.tax ? newtax.tax : ""}
                  className="p-1 px-2 border-b"
                  onChange={(e) =>
                    setNewTax({ ...newtax, tax: e.target.value })
                  }
                  name=""
                  id=""
                />
                <button onClick={() => setTax()} className="p-1 px-3 w-full rounded-md bg-orange-500 text-white">
                  Add Tax
                </button>
                <button onClick={() => setpopup()}  className="p-1 px-3 w-full rounded-md bg-gray-500 text-white">Cancel</button>
              </div>
            </div>
          )}
          {/* <div className="m-3">

          </div> */}

          <div className="m-3 p-3 w-full pt-6">
            <h1 className="font-semibold flex justify-between gap-2 mb-3 items-center w-1/2 pb-1 border-b border-gray-500">
            <span className="text-xl">
              Tax Rates
            </span>
              <button onClick={() => setpopup("addTax")} className=" py-1 hover:underline">Add New</button>
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-2 w-1/2 font-semibold">
                <span className="flex-1 flex justify-center">Name</span>
                <span className="flex-1 flex justify-center">value (%)</span>
                <span className="flex-1 flex justify-center">Action</span>
              </div>
            {data.tax?.map((element, index) => (
              <div className="flex justify-between gap-2 w-1/2">
                <span className="flex-1 flex justify-center">
                  {element.name}
                </span>
                <span className="flex-1 flex justify-center">{element.value} %</span>
                <button className="flex-1 flex justify-center" onClick={()=> setData({...data, tax: data.tax.filter((e, i) => i !== index)})} > <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hover:fill-gray-400" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
              </div>
            ))}
            </div>
          </div>

          {/* <div className="tile">
            <h1>
              Add New Tax Group <button>+</button>
            </h1>
            <div>
              <input autoComplete="off" type="checkbox" name="" checked id="" />{" "}
              <span>Inclusive/Exclusive Tax on Rate(Price/Unit)</span>
            </div>
          </div> */}
        </div>
      )}
      {page === "party" && (
        <div className="content">
          <div className="tile">
            <h1>Party Settings</h1>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.partyGrouping}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      partyGrouping: !data.settings?.partyGrouping,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Party Grouping</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.PartyShippingAdd}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      PartyShippingAdd: !data.settings?.PartyShippingAdd,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Shipping Address</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.partyReminder}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      partyReminder: !data.settings?.partyReminder,
                    },
                  })
                }
                disabled
                name=""
                id=""
              />{" "}
              <span>Enable Payment Reminder (unavailable)</span>
            </div>
          </div>

          <div className="tile">
            <h1>Enable Loyalty Points</h1>
            <div className="flex">
              <input
                type="checkbox"
                checked={data.settings?.PartyLoyaltyPoints}
                onChange={() =>{
                  if (data.settings?.amountToLoyaltyPt && data.settings?.loyaltyPtToAmount){
                    console.log(".")
                  }else{
                    setpopup("addLoyaltyPts")
                  }
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      PartyLoyaltyPoints: !data.settings?.PartyLoyaltyPoints,
                    },
                  })
                }
                }
              />
              <span>Enable Loyalty Points</span>
            </div>
              {data.settings?.PartyLoyaltyPoints && (
                <button className="px-3 py-1 rounded-md bg-gray-100" onClick={()=> {
                  setLp({lp1: data.settings?.amountToLoyaltyPt, Lp2:data.settings?.loyaltyPtToAmount})
                  setpopup("addLoyaltyPts")
                }}>
                  Change Loyalty points converstions
                </button>
               ) 
              }
          </div>
          {popup === "addLoyaltyPts" && (
            <div className="popup">
              <div className="flex flex-col bg-white justify-center items-center gap-1 rounded-md p-2">
                <h1 className="font-semibold text-center">Loyalty points Converstions</h1>

                <p>When rewarding points for transation</p>
                <div className="flex gap-2 items-center">
                <span>1 loyalty point = </span>
                  <input
                    type="text"
                    placeholder="Amount"
                    value={Lp.Lp2 ? Lp.Lp2 : ""}
                    className="p-1 px-2 border-b"
                    onChange={(e) =>
                      setLp({ ...Lp, Lp2: e.target.value })
                    }
                    name=""
                    id=""
                  />
                </div>
                <p>When redeeming/using points</p>
                <div className="flex gap-2 items-center">
                <span>1 loyalty point = </span>
                <input
                  type="text"
                  placeholder="Amount"
                  value={Lp.lp1 ? Lp.lp1 : ""}
                  className="p-1 px-2 border-b"
                  onChange={(e) =>
                    setLp({ ...Lp, lp1: e.target.value })
                  }
                  name=""
                  id=""
                />
                </div>
                <button onClick={() => {
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      amountToLoyaltyPt: Lp.lp1, 
                      loyaltyPtToAmount: Lp.Lp2,
                    },
                  });
                  setpopup();
                }} className="p-1 px-3 w-full rounded-md bg-orange-500 text-white">
                  Save Changes
                </button>
                <button onClick={() => setpopup()}  className="p-1 px-3 w-full rounded-md bg-gray-500 text-white">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
      {page === "item" && (
        <div className="content">
          <div className="tile">
            <h1>Item Settings</h1>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.enableitem || true}
                disabled
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      enableitem: !data.settings?.enableitem,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Enable Item</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.itembarcodeScanner}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      itembarcodeScanner: !data.settings?.itembarcodeScanner,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Barcode Scanner</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.itemStockMaintainance || true}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      itemStockMaintainance: !data.settings?.itemStockMaintainance,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Stock Maintainance</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.Manifacturing}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      Manifacturing: !data.settings?.Manifacturing,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Manifacturig</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.lowStockDialogue}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      lowStockDialogue: !data.settings?.lowStockDialogue,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Low stock Dialogue</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.ItemUnits}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      ItemUnits: !data.settings?.ItemUnits,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Item Units</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.itemCategory}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      itemCategory: !data.settings?.itemCategory,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Item Category</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.itemwiseDiscount}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      itemwiseDiscount: !data.settings?.itemwiseDiscount,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>item wise Discount</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.size}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      size: !data.settings?.size,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Size</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.MfgDate}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      MfgDate: !data.settings?.MfgDate,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Manifacturing date</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.ExpiringDate}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      ExpiringDate: !data.settings?.ExpiringDate,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Expiring date</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.ModelNum}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      ModelNum: !data.settings?.ModelNum,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Model number</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.BatchNum}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      BatchNum: !data.settings?.BatchNum,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Batch number</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.description}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      description: !data.settings?.description,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Description</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.MRP}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      MRP: !data.settings?.MRP,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>MRP</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={data.settings?.WholeSale}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      WholeSale: !data.settings?.WholeSale,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Whole Sale</span>
            </div>
            {data.settings?.WholeSale && (

            <div>
              <input
                type="checkbox"
                checked={data.settings?.WholeSaleMin}
                onChange={() =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      WholeSaleMin: !data.settings?.WholeSaleMin,
                    },
                  })
                }
                name=""
                id=""
              />{" "}
              <span>Whole Sale Minimum Qty</span>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
