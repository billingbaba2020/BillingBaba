import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../components/customInput";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import TextField from "@mui/material/TextField";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function AddParties({ data, setData, change, setChange }) {
  const Navigate = useNavigate();
  // var [toggle, setToggle] = useState(true);
  var [page, setPage] = useState("GST");
  var [partyName, setPartyName] = useState("");
  var [GSTIN, setGSTIN] = useState("");
  var [phoneNo, setPhoneNo] = useState("");
  var [creditLimit, setcreditLimit] = useState("");
  var [creditLimitToggle, setcreditLimitToggle] = useState(false);
  var [GstType, setGstType] = useState("");
  var [state, setState] = useState("");
  var [Email, setEmail] = useState("");
  var [Add, setAdd] = useState("");
  var [groups, setGropus] = useState({ name:"", done: true });
  var [ShippingAdd, setShippingAdd] = useState("");
  var [DisableShippingAdd, setDisabeShippingAdd] = useState(false);
  var [OpeningBalance, setOpeningBalance] = useState("");
  var [asDate, setAsDate] = useState("");
  var [OpeningLoyaltyPoints, setOpeningLoyaltyPoints] = useState("");
  var [asDateL, setAsDateL] = useState("");
  var [AddF1, setAddF1] = useState("");
  var [AddF2, setAddF2] = useState("");
  var [AddF3, setAddF3] = useState("");


  const [GrpPgInps, setGrpPgInps] = useState({ st: false, val: "" });
  var [AddGrp, setAddGrp] = useState(false);
  const AddGrpfn = (grp) => {
    let newDa = data;
    newDa.groups ? newDa.groups.push(grp) : (newDa.groups = [grp]);
    setData(newDa);
    setChange(!change);
    setAddGrp(false);
  };

  const [isFocused, setIsFocused] = useState(false);

  var [OpBalState, setOpBalState] = useState(0);
  var [loading, setLoading] = useState(false);


  const divRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
          setGropus({...groups, done:true}) 
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);


  // var [toggle, set] = useState();
  let uid = data.uid;
  const addPartiesReq = async () => {
    if (!partyName || !phoneNo || !Email) {
      alert("Please fill all the fields");
      return;
    }
    let newData = {
      partyName: partyName ? partyName : "",
      GSTIN: GSTIN ? GSTIN : "",
      phoneNo: phoneNo ? phoneNo : "",
      GstType: GstType ? GstType : "",
      state: state ? state : "",
      Email: Email ? Email : "",
      Add: Add ? Add : "",
      BillingAdd: Add ? Add : "",
      ShippingAdd: ShippingAdd ? ShippingAdd : "",
      OpeningBalance: OpeningBalance
        ? OpBalState == 0
          ? parseInt(OpeningBalance)
          : -parseInt(OpeningBalance)
        : 0,
      asDate: asDate ? asDate : "",
      OpeningLoyaltyPoints: OpeningLoyaltyPoints
        ? parseInt(OpeningLoyaltyPoints)
        : "",
      asDateLoyaltyPoints: asDateL ? asDateL : "",
      AddF1: AddF1 ? AddF1 : "",
      AddF2: AddF2 ? AddF2 : "",
      AddF3: AddF3 ? AddF3 : "",
      transactions: [],
      creditLimit: creditLimit ? parseInt(creditLimit) : 0,
      groups: groups?.name,
      credit: parseInt(OpeningBalance) ? parseInt(OpeningBalance) : 0,
    };

    let newDa = data;
    newDa.parties ? newDa.parties.push(newData) : (newDa.parties = [newData]);

    OpeningBalance && newDa.Transactions
      ? newDa.Transactions.push({
          type: "Opening Balance",
          name: partyName,
          invoice_number: "-",
          invoice_date: new Date(Date.now()).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          date: new Date(Date.now()).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          // date: Date.now(),
          total: parseFloat(OpeningBalance),
          pending: parseFloat(OpeningBalance),
        })
      : (newDa.Transactions = [
          {
            type: "Opening Balance",
            name: partyName,
            date: new Date(Date.now()).toLocaleString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
            amount: parseFloat(OpeningBalance),
          },
        ]);

    console.log(newDa);
    setData(newDa);
    setChange(!change);
    Navigate("/parties");
  };

  if (loading) return <Loader />;
  return (
    <div id="addItem">
      <div className="container">
        <div className="top">
          <div className="l">
            <h1>Add Party</h1>
            {/* <p>Product</p>
            <div
              className={toggle ? "toggle" : "toggle opp"}
              onClick={() => setToggle(!toggle)}
            >
              <div className="button"></div>
            </div>
            <p>service</p> */}
          </div>
          <div className="r">
            <button onClick={() => Navigate("/settings?page=party")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 512 512"
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>
            </button>
            <button onClick={() => Navigate("/parties")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="c1">
          <div className="p1 mb-3">
            {/* <CustomInput
              inputValue={partyName}
              setInputValue={setPartyName}
              placeholder={"Party Name *"}
            /> */}
            <TextField
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    id="outlined-basic"
                    label="*Party Name"
                    variant="outlined"
                  />
            {/* <CustomInput
              inputValue={GSTIN}
              setInputValue={setGSTIN}
              placeholder={"GSTIN"}
            /> */}
            <TextField
                    value={GSTIN}
                    onChange={(e) => setGSTIN(e.target.value)}
                    id="outlined-basic"
                    label="GSTIN"
                    variant="outlined"
                  />
            {/* <CustomInput
              inputValue={phoneNo}
              setInputValue={setPhoneNo}
              placeholder={"Phone Number"}
            /> */}
            <TextField
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                  />
            {/* <button>Select Unit</button> */}
          </div>
            {AddGrp && (

          <div className="fixed top-0 left-0 h-screen z-20 w-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="w-[300px] h-[300px] flex justify-between flex-col items-center bg-white rounded-md shadow-md overflow-hidden">
                <div className="flex justify-between p-3 bg-orange-200 w-full ">
                  <p className="font-semibold">Party group</p>
                  <p
                    onClick={() => setAddGrp(false)}
                    className="cursor-pointer font-bold rounded-full hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                  </p>
                </div>
                <div className="p-3">
                  <p>Enter name of new party group</p>
                  <input
                    type="text"
                    className="p-1 border-b-2 border-gray-400"
                    value={GrpPgInps.val}
                    onChange={(e) => setGrpPgInps({val:e.target.value})}
                  />
                </div>
                <div className="w-full p-3">
                  <button
                    className="bg-blue-400 hover:bg-blue-500 font-semibold w-full text-lg px-3 py-1 rounded-md shadow-md text-white"
                    onClick={() => GrpPgInps?.val?.length > 0 && AddGrpfn(GrpPgInps.val)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            )}
          <div className="flex items-start">
            {
              data.settings?.partyGrouping && (

            <div className="flex flex-col">
              {/* <Autocomplete
                disablePortal
                options={data?.groups.map((unit)=> ({label:unit}))}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Groups" />}
                
                value={groups.name ? groups.name : ""}
                onChange={(event, newValue) =>
                  setGropus({ name: newValue, done: true })
                }
              /> */}
              <Autocomplete
                disablePortal
                options={data?.groups.map((unit) => ({ label: unit })) || []}
                sx={{ width: 220 }}
                renderInput={(params) => <TextField {...params} label="Groups" />}
                value={groups.name ? groups.name : ""}
                onChange={(event, newValue) => setGropus({ name: newValue, done: true })}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.label}
                  </li>
                )}
                ListboxProps={{
                  component: "div",
                  children: [
                    ...(data?.groups.map((unit) => (
                      <li key={unit} onClick={() => setGropus({ name: unit, done: true })}>
                        {unit}
                      </li>
                    )) || []),
                    <li key="add-new" style={{ cursor: "pointer", color: "blue" }} onClick={() => console.log("Add new clicked")}>
                      + Add New
                    </li>,
                  ],
                }}
              />
              <p className="font-semibold text-blue-500 flex gap-1 items-center hover:underline" onClick={()=> setAddGrp(true)}><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-blue-500" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg> <span>Add New group</span></p>
              {/* <TextField
                id="outlined-search"
                value={groups.name ? groups.name : ""}
                onChange={(e) =>
                  setGropus({ name: e.target.value, done: false })
                }
                label="Party Group"
                sx={{
                  background: "white",
                }}
                type="search"
                itemType="number"
              />
              {groups?.name && !groups.done && (
                <ul className="absolute top-[50px] flex flex-col">
                  {data?.groups
                    ?.filter(
                      (e) =>
                        groups?.name
                          ?.toLowerCase()
                          .split(" ")
                          .every((word) => e.toLowerCase().includes(word)),
                      // e.partyName.toLowerCase().includes(SearchQuerry.toLowerCase())
                    )
                    .map((e, index) => (
                      <li
                        className={`tile w-full p-2 z-10 bg-white hover:bg-gray-100 ${
                          groups.name === e ? "bg-gray-200" : ""
                        }`}
                        key={index}
                        onClick={() => setGropus({ name: e, done: true })}
                      >
                        <h1 className="">{e}</h1>
                      </li>
                    ))}
                </ul>
              )} */}
            </div>
              )
            }

<FormControl>
            <InputLabel id="demo-simple-select-label">Under Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Under Group"
              sx={{width:220}}
              // onChange={handleChange}
            >
              <MenuItem value="Current Asset">Current Asset</MenuItem>
              <MenuItem value="Bank Account">Bank Account</MenuItem>
              <MenuItem value="Cash In Hand">Cash In Hand</MenuItem>
              <MenuItem value="Deposit">Deposit</MenuItem>
              <MenuItem value="Loan And Advance">Loan And Advance</MenuItem>
              <MenuItem value="Stock In Hand">Stock In Hand</MenuItem>
            </Select>
            </FormControl>
            {/* <select
              // onChange={(e) => setGstType}
              name=""
              id=""
              className="w-full p-3 rounded-md border-1 border-gray-800"
            >
              <option disabled selected value="">
                Under Group
              </option>
              <option value="Unregistere/Counsumer">Current Asset</option>
              <option value="Registered Business - Regular">
                Bank Account
              </option>
              <option value="Registered Business - Consumer">
                Cash In Hand
              </option>
              <option value="Registered Business - Consumer">Deposit</option>
              <option value="Registered Business - Consumer">
                Loan And Advance
              </option>
              <option value="Registered Business - Consumer">
                Stock In Hand
              </option>
            </select> */}
            <FormControl >
            <InputLabel id="demo-simple-select-label">Party Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Party Category"
              sx={{width:220}}
              // onChange={handleChange}
            >
              <MenuItem value="VIP">VIP</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="RISK">RISK</MenuItem>
              <MenuItem value="Lost">Lost</MenuItem>
            </Select>

      </FormControl>
            {/* <select
              // onChange={(e) => setGstType}
              name=""
              id=""
              className="w-full p-3 rounded-md  border-1 border-gray-800"
            >
              <option disabled selected value="">
                Party Category
              </option>
              <option value="Unregistere/Counsumer">VIP</option>
              <option value="Registered Business - Regular">Regular</option>
              <option value="Registered Business - Consumer">RISK</option>
              <option value="Registered Business - Consumer">Lost</option>
            </select> */}
          </div>
        </div>
        <div className="c2">
          <div className="top t">
            <button
              className={page == "GST" && "active"}
              onClick={() => setPage("GST")}
            >
              GST & Address
            </button>
            <button
              className={page == "Credit" && "active"}
              onClick={() => setPage("Credit")}
            >
              Credit & balance
            </button>
            <button
              className={page == "AddF" && "active"}
              onClick={() => setPage("AddF")}
            >
              Additional Fields
            </button>
          </div>
          {page == "GST" && (
            <div className="p-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <select
                    onChange={(e) => setGstType}
                    name=""
                    id=""
                    className="w-full p-2 border-1 border-gray-800"
                  >
                    <option disabled selected value="">
                      {" "}
                      GST Registration Type
                    </option>
                    <option value="Unregistere/Counsumer">
                      Regular (With GST)
                    </option>
                    <option value="Registered Business - Regular">
                      Composition (With GST)
                    </option>
                    <option value="Registered Business - Consumer">
                      Tax Deductor/Tax Collector (With GST)
                    </option>
                    <option value="Registered Business - Consumer">
                      Unregistered (Without GST)
                    </option>
                    <option value="Registered Business - Consumer">
                      Unknown (Without GST)
                    </option>
                  </select>
                  {/* <CustomInput
                    inputValue={state}
                    setInputValue={setState}
                    placeholder={"State"}
                  /> */}
                  <TextField
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    id="outlined-basic"
                    label="State"
                    variant="outlined"
                  />
                  <TextField
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                  {/* <CustomInput
                    inputValue={Email}
                    setInputValue={setEmail}
                    placeholder={"Email Id"}
                  /> */}
                </div>
                <TextField
                  value={Add}
                  onChange={(e) => setAdd(e.target.value)}
                  id="outlined-multiline-static"
                  label="Billing Address"
                  multiline
                  rows={4}
                  defaultValue=""
                />
                <div className="flex flex-col gap-2">
                  {(!DisableShippingAdd && data.settings?.PartyShippingAdd) && (
                    <TextField
                      value={ShippingAdd}
                      onChange={(e) => setShippingAdd(e.target.value)}
                      id="outlined-multiline-static"
                      label="Shipping Address"
                      multiline
                      rows={4}
                      defaultValue=""
                    />
                  )}
                  {data.settings?.PartyShippingAdd && (

                  <button
                    onClick={() => setDisabeShippingAdd(!DisableShippingAdd)}
                    className={`font-semibold ${DisableShippingAdd ? "text-blue-500 border-blue-500": "text-red-500 border-red-500"} p-2 hover:shadow-md rounded-md border `}
                  >
                    {DisableShippingAdd ? "+ Enable" : "- Disable"} Shipping
                    Address
                  </button>
                  )}
                </div>
              </div>
              {/* <div className="b">
                <CustomInput placeholder={"Purchase Price"} />
                <CustomInput placeholder={"Taxes"} />
              </div> */}
            </div>
          )}
          {page == "Credit" && (
            <div className="flex flex-col">
              <div className="flex p-5">
                <div className="flex flex-col">
                  <CustomInput
                    inputValue={OpeningBalance}
                    setInputValue={setOpeningBalance}
                    placeholder={"Opening balance"}
                  />
                  {OpeningBalance && (
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <input
                            autoComplete="off"
                            type="radio"
                            name="balanceType"
                            id="toPay"
                            onClick={()=>setOpBalState(0)}
                          />
                          <span>To Pay</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <input
                            autoComplete="off"
                            type="radio"
                            name="balanceType"
                            id="toRecieve"
                            onClick={()=>setOpBalState(1)}
                          />
                          <span>To Recieve</span>
                        </div>
                      </div>
                  )}
                </div>
                <input
                  type="date"
                  className="ml-4"
                  onChange={(e) => setAsDate(e.target.value)}
                  id="birthday"
                  name="birthday"
                />
              </div>
              <div className="div s">
                <CustomInput
                  inputValue={OpeningLoyaltyPoints}
                  setInputValue={setOpeningLoyaltyPoints}
                  placeholder={"Opening Loyalty Pts"}
                />
                <input
                  type="date"
                  onChange={(e) => setAsDateL(e.target.value)}
                  id="birthday"
                  name="birthday"
                ></input>
              </div>
              <div
                className="flex items-center px-4 gap-2"
                onClick={() => setcreditLimitToggle(!creditLimitToggle)}
              >
                {/*<input
                  autoComplete="off"
                  type="checkbox"
                  name=""
                  id=""
                  checked={creditLimitToggle}
                /> */}
                <h1>No limit</h1>
                <div
                  className={!creditLimitToggle ? "toggle" : "toggle opp"}
                  onClick={() => {
                    setcreditLimitToggle(!creditLimitToggle)
                  }}
                >
                  <div className="button"></div>
                </div>
                <h1>Custom Credit limit</h1>
              </div>
              {creditLimitToggle && (
                <div className="div">
                  <div className="flex items-center">
                    <CustomInput
                      inputValue={creditLimit}
                      setInputValue={setcreditLimit}
                      placeholder={"Set Credit Limit"}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {page === "AddF" && (
            <div className="flex flex-col gap-2">
              <CustomInput
                inputValue={AddF1}
                setInputValue={setAddF1}
                placeholder={"Additional Field 1"}
              />
              <CustomInput
                inputValue={AddF2}
                setInputValue={setAddF2}
                placeholder={"Additional Field 2"}
              />
              <CustomInput
                inputValue={AddF3}
                setInputValue={setAddF3}
                placeholder={"Additional Field 3"}
              />
            </div>
          )}
        </div>
        <div className="c3">
          <button onClick={() => addPartiesReq()}>Save & New</button>
          <button onClick={() => addPartiesReq()}>Save</button>
        </div>
      </div>
    </div>
  );
}
