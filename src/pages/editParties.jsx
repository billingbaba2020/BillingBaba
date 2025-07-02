import React, { useState } from "react";
import CustomInput from "../components/customInput";
import { useNavigate } from "react-router-dom";
import dev_url from "../url";
import Loader from "./Loader";
import TextField from "@mui/material/TextField";

export default function EditParties({
  data,
  setData,
  change,
  setChange,
  party,
  setToggle,
}) {
  const Navigate = useNavigate();
  // var [toggle, setToggle] = useState(true);
  var [page, setPage] = useState("GST");
  var [partyName, setPartyName] = useState(
    party.partyName ? party.partyName : party.name
  );
  var [GSTIN, setGSTIN] = useState(party.GSTIN);
  var [phoneNo, setPhoneNo] = useState(party.phoneNo);
  var [creditLimit, setcreditLimit] = useState(party.creditLimit);
  var [credit, setcredit] = useState(party.credit);
  var [GstType, setGstType] = useState(party.GstType);
  var [state, setState] = useState(party.state);
  var [Email, setEmail] = useState(party.Email);
  var [Add, setAdd] = useState(party.Add);
  var [groups, setGropus] = useState({ name: party?.group, done: true });
  var [OpeningBalance, setOpeningBalance] = useState(party.OpeningBalance);

    var [OpBalState, setOpBalState] = useState(0);
  var [asDate, setAsDate] = useState(party.asDate);
    var [OpeningLoyaltyPoints, setOpeningLoyaltyPoints] = useState("");
    var [asDateL, setAsDateL] = useState("");
  var [AddF1, setAddF1] = useState(party.AddF1);
  var [AddF2, setAddF2] = useState(party.AddF2);
  var [AddF3, setAddF3] = useState(party.AddF3);
  var [loading, setLoading] = useState(false);
  // var [toggle, set] = useState();
  if (!party) return <h1>Party Not Found</h1>;
  let uid = data.uid;
  const addPartiesReq = async () => {
    let newData = {
      partyName: partyName ? partyName : "",
      GSTIN: GSTIN ? GSTIN : "",
      phoneNo: phoneNo ? phoneNo : "",
      GstType: GstType ? GstType : "",
      state: state ? state : "",
      Email: Email ? Email : "",
      Add: Add ? Add : "",
      OpeningBalance: OpeningBalance ? parseInt(OpeningBalance) : "",
      asDate: asDate ? asDate : "",
      AddF1: AddF1 ? AddF1 : "",
      AddF2: AddF2 ? AddF2 : "",
      AddF3: AddF3 ? AddF3 : "",
      transactions: [],
      creditLimit: parseInt(creditLimit),
      groups: groups?.name,
      // convert openingbalance into integer below
      credit: parseInt(credit),
    };

    let newDa = data;

    console.log(newDa.parties.find((ele) => ele.partyName === party.partyName));
    const index = newDa.parties.findIndex(
      (ele) => ele.partyName === party.partyName
    );
    if (index !== -1) {
      newDa.parties[index] = { ...newDa.parties[index], ...newData };
    }
    console.log(newDa.parties[index]);
    const existingTransaction = newDa.Transactions.find((item) => item.name === partyName);

    if (OpeningBalance) {
      if (existingTransaction) {
        // Update the existing transaction
        existingTransaction.type = "Opening Balance";
        existingTransaction.date = asDate.toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        existingTransaction.state=OpBalState;
        existingTransaction.amount = parseFloat(OpeningBalance);
      } else {
        // Add new transaction if not found
        newDa.Transactions.push({
          type: "Opening Balance",
          name: partyName,
          date: asDate.toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          state:OpBalState,
          amount: parseFloat(OpeningBalance),
        });
      }
    }

    console.log(newDa);
    setData(newDa);
    setChange(!change);
    setToggle(false);
  };

  if (loading) return <Loader />;
  return (
    <div id="addItem">
      <div className="container">
        <div className="top">
          <div className="l">
            <h1>Edit Party</h1>
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
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 512 512"
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>
            </button>
            <button onClick={() => setToggle(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="c1">
          <div className="p1">
            <CustomInput
              inputValue={partyName}
              setInputValue={setPartyName}
              placeholder={"Party Name *"}
            />
            <CustomInput
              inputValue={GSTIN}
              setInputValue={setGSTIN}
              placeholder={"GSTIN"}
            />
            <CustomInput
              inputValue={phoneNo}
              setInputValue={setPhoneNo}
              placeholder={"Phone Number"}
            />
            <CustomInput
              inputValue={credit}
              setInputValue={setcredit}
              placeholder={"Credit amount"}
            />
            {/* <button>Select Unit</button> */}
          </div>
          <div className="relative">
            <TextField
              id="outlined-search"
              value={groups.name ? groups.name : ""}
              onChange={(e) => setGropus({ name: e.target.value, done: false })}
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
                        .every((word) => e.toLowerCase().includes(word))
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
            )}
          </div>
          {/* <div className="p1">
            <select className="box">
              <option selected disabled value="">
                category
              </option>
              <option value="">+ add category</option>
            </select>
            <CustomInput placeholder={"Item Code"} />
          </div> */}
        </div>
        <div className="c2">
          <div className="top t">
            <button
              className={page === "GST" && "active"}
              onClick={() => setPage("GST")}
            >
              GST & Address
            </button>
            <button
              className={page === "Credit" && "active"}
              onClick={() => setPage("Credit")}
            >
              Credit & balance
            </button>
            <button
              className={page === "AddF" && "active"}
              onClick={() => setPage("AddF")}
            >
              Additional Fields
            </button>
          </div>
          {page === "GST" && (
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
                      GST Type
                    </option>
                    <option value="Unregistere/Counsumer">
                      {" "}
                      Unregistere/Counsumer
                    </option>
                    <option value="Registered Business - Regular">
                      {" "}
                      Registered Business - Regular
                    </option>
                    <option value="Registered Business - Consumer">
                      {" "}
                      Registered Business - Consumer
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
                  onAbort={(e) => setAdd(e.target.value)}
                  id="outlined-multiline-static"
                  label="Billing Address"
                  multiline
                  rows={4}
                  defaultValue=""
                />
              </div>
              {/* <div className="b">
                <CustomInput placeholder={"Purchase Price"} />
                <CustomInput placeholder={"Taxes"} />
              </div> */}
            </div>
          )}
          {page === "Credit" && (
            <div className="flex flex-col">
              <div className="div s">
                <div className="flex">
                  <CustomInput
                    inputValue={OpeningBalance}
                    setInputValue={setOpeningBalance}
                    placeholder={"Opening balance"}
                  />
                  {OpeningBalance && (
                    // <select name="" id="">
                    //   <option value="">To Pay</option>
                    //   <option value="">To Recieve</option>
                    // </select>
                    <div className="flex gap-2">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            autoComplete="off"
                            type="radio"
                            name="balanceType"
                            id="toPay"
                            onClick={()=>setOpBalState(0)}
                          />
                          <span>To Pay</span>
                        </div>
                        <div className="flex items-center gap-2">
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
                    </div>
                  )}
                </div>
                <input
                  type="date"
                  value={asDate}
                  onChange={(e) => setAsDate(e.target.value)}
                  id="birthday"
                  name="birthday"
                ></input>
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
              <div className="div">
                <div className="flex flex-col">
                  <CustomInput
                    inputValue={creditLimit}
                    setInputValue={setcreditLimit}
                    placeholder={"Set Credit Limit"}
                  />
                </div>
              </div>
            </div>
          )}
          {page === "AddF" && (
            <div className="div s">
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
