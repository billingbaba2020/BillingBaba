import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown";
import EditParties from "./editParties";
import SortableTable from "../components/Tables";
import { Autocomplete, TextField } from "@mui/material";

export default function Parties({ data, setData, change, setChange }) {
  const Navigate = useNavigate();
  const [selectedParty, setSelectedParty] = useState(null);
  const [TransactionSearc, setTransactionSearch] = useState("");
  const [search, setSearch] = useState(false);
  const [impPtDrp, setimpPtDrp] = useState(false);
  const [page, setPage] = useState("parties");
  const [toggleParties, setToggle] = useState(false);
  const [SearchQuerry, setSearchQuerry] = useState("");

  const [GrpPg, setGrpPg] = useState(0);
  const [GrpPgInps, setGrpPgInps] = useState({ st: false, val: "" });
  var [inactivePg, setinactivePg] = useState(false);

  const divRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setSearch(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Grp Page
  const AddGrp = (grp) => {
    let newDa = data;
    newDa.groups ? newDa.groups.push(grp) : (newDa.groups = [grp]);
    setData(newDa);
    setChange(!change);
    setGrpPg(0);
  };

  const MoveToGrp = (pt) => {
    let newDa = data;
    let party = newDa.parties.find((par) => par.partyName == pt);
    if (party) {
      party.group = selectedParty;
      setData(newDa);
      setChange(!change);
    } else {
      alert("Party not found");
    }
    setGrpPg(0);
  };

  // parties part
  const handlePartySelect = (party) => {
    setSelectedParty(party);
  };
  const handlePartyRemove = (party) => {
    let newDa = data;
    newDa.parties = newDa.parties.filter(
      (ele) => ele.partyName !== party.partyName
    );
    console.log(newDa);
    setData(newDa);
    setChange(!change);
    setSelectedParty();
  };
  // parties edit
  if (toggleParties)
    return (
      <EditParties
        data={data}
        setData={setData}
        setToggle={setToggle}
        party={selectedParty}
        change={change}
        setChange={setChange}
      />
    );

  var columns;
  var sendingArray;
  if (selectedParty) {
    if (page == "parties") {
      columns = [
        { key: "type", label: "Type",type:"transaction type"  },
        { key: "invoice_date", label: "Invoice Date",type:"string" },
        { key: "invoice_number", label: "Invoice Number",type:"number" },
        { key: "total", label: "Total",type:"number" },
        { key: "pending", label: "Pending",type:"number" },
        { key: "DropDown", label: "-" },
      ];
      sendingArray = data?.Transactions?.map((item, originalIndex) => ({
        ...item,
        originalIndex,
      }))
        .filter(
          (item) =>
            item.name === selectedParty?.partyName ||
            item.name?.includes(selectedParty?.partyName?.toLowerCase()) ||
            (item.partyName
              ?.toLowerCase()
              .includes(selectedParty?.partyName.toLowerCase()) &&
              item.payment_type
                ?.toLowerCase()
                .includes(TransactionSearc.toLowerCase()))
        )
        .map((ele) => {
          return {
            ...ele,
            pending: !Number.isNaN(ele.pending)
              ? ele.pending
              : ele.total - ele.paid,
            total: ele.amount ? ele.amount : ele.total,
            invoice_date: new Date(ele.invoice_date).toLocaleDateString(),
            menuItem:
              ele.type === "Opening Balance"
                ? [
                    // { label: "View" },
                    {
                      label: "Delete",
                      action: () => {
                        console.log("works");
                      },
                    },
                    { label: "Recieve payment" },
                  ]
                : ele.type == "Sale"
                ? [
                    { label: "View/Edit" },
                    { label: "Cancel Invoice" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Preview as delivery chalan" },
                    { label: "Convert to Return" },
                    { label: "Recieve Payment" },
                    { label: "View History" },
                  ]
                : ele.type == "Estimate" || ele.type == "Sale Estimation"
                ? [
                    { label: "View/Edit" },
                    { label: "Cancel Invoice" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Convert to Sale" },
                    { label: "Convert to Sale Order" },
                  ]
                : ele.type == "Delivery Chalan"
                ? [
                    { label: "View/Edit" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Print" },
                    { label: "Convert to Sale" },
                  ]
                : ele.type == "Sale Order"
                ? [
                    { label: "View/Edit" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Print" },
                    { label: "Convert to Sale" },
                  ]
                : ele.type == "Sale Return" || ele.type == "Credit Note"
                ? [
                    { label: "View/Edit" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Print" },
                    { label: "Make Payment" },
                    { label: "View History" },
                  ]
                : ele.type == "Purchase"
                ? [
                    { label: "View/Edit" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Print" },
                    { label: "Convert to Return" },
                    { label: "Make Payment" },
                    { label: "View History" },
                  ]
                : ele.type == "Purchase Order"
                ? [
                    { label: "View/Edit" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Print" },
                    { label: "Convert to Purchase" },
                  ]
                : ele.type == "Purchase Return" || ele.type == "Debit Note"
                ? [
                    { label: "View/Edit" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Print" },
                    { label: "Recieve Payments" },
                  ]
                : ele.type == "Payments Out"
                ? [
                    { label: "View/Edit" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Print" },
                  ]
                : ele.type == "Payments In"
                ? [
                    { label: "View/Edit" },
                    { label: "Delete" },
                    { label: "Duplicate" },
                    { label: "Open PDF" },
                    { label: "Preview" },
                    { label: "Print" },
                  ]
                : [{ label: "View/Edit" }, { label: "Delete" }],
          };
        });
    } else if (page === "groups") {
      columns = [
        { key: "partyName", label: "Party Name",type:"string" },
        { key: "credit", label: "Credit",type:"number" },
      ];
      sendingArray = data?.parties?.filter(
        (item) => item.group === selectedParty
      );
    }
  }
  return (
    <div className="">
      <div className="topbar">
        <button
          className={page === "parties" ? "selected" : ""}
          onClick={() => {
            setPage("parties");
            setSelectedParty();
            setSearch(false)
          }}
        >
          Parties
        </button>
        {data.settings?.partyGrouping && (
        <button
          className={page === "groups" ? "selected" : ""}
          onClick={() => {
            setPage("groups");
            setSelectedParty();
            setSearch(false)
          }}
        >
          Groups
        </button>
        )}
        {data.settings?.PartyLoyaltyPoints && (
        <button
          className={page === "loyalty" ? "selected" : ""}
          onClick={() => {
            setPage("loyalty");
            setSelectedParty();
            setSearch(false)
          }}
        >
          Loyalty points
        </button>
        )}
      </div>

      {page == "parties" ? (
        <div id="parties">
          <div className="left">
            {search ? (
              <div className="flex p-2 relative"  ref={divRef} >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-[20px]  mx-2"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <input
                  type="text"
                  name=""
                  id=""
                  value={SearchQuerry}
                  onChange={(e) => setSearchQuerry(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-700"
                />
                <button onClick={() => setSearch(!search)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-[20px] mx-2"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="top">
                <div className="bg-orange-400 rounded-md px-2 py-1 rounded-md text-white fill-white text-sm">
                  <button onClick={() => Navigate("/AddParties")}>
                    Add Party +
                  </button>
                  <button
                    className="relative"
                    onClick={() => setimpPtDrp(!impPtDrp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                    {impPtDrp && (
                      <button
                        className="absolute top-[20px] font-semibold left-0 p-2 bg-slate-200 text-black w-[180px] rounded-md shadow-md hover:bg-gray-300 no-wrap"
                        onClick={() => Navigate("/import-parties")}
                      >
                        Import Parties
                      </button>
                    )}
                  </button>
                </div>

                <div
                  onClick={() => setSearch(!search)}
                  // className="bg-transparent p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[20px]  mx-2"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </div>
              </div>
            )}
            <div className="content text-sm">
              <div className="head">
                <h2>Name</h2>
                <h2>Amount</h2>
              </div>
              {SearchQuerry && search
                ? data?.parties
                    ?.filter(
                      (e) =>
                        SearchQuerry.toLowerCase()
                          .split(" ")
                          .every((word) =>
                            e.partyName.toLowerCase().includes(word)
                          )
                    )
                    .map((party, index) => (
                      <div
                        className={`tile relative w-full ${
                          selectedParty === party ? "selected" : ""
                        }`}
                        key={index}
                        onClick={() => handlePartySelect(party)}
                      >
                        <h1 className="">{party.partyName}</h1>
                        <div className="">
                          <p
                            className={`${
                              party.type === "credit"
                                ? "text-green-600"
                                : party.type === "debit"
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            ₹{" "}
                            {party.credit
                              ? party.credit < 0
                                ? party.credit / -1
                                : party.credit
                              : data?.sales
                                  ?.filter(
                                    (item) => item.name === party.partyName
                                  )
                                  .reduce((acc, obj) => acc + obj.pending, 0)}
                          </p>
                          {/* <Dropdown menuItems={["View/Edit", "Delete"]}> */}

                          <h2 className="hovEle">{party.partyName} - {party.credit}</h2>
                          <Dropdown
                            menuItems={[
                              {
                                label: "View/Edit",
                                action: () => setToggle(true),
                              },
                              {
                                label: "Delete",
                                action: () => handlePartyRemove(party),
                              },
                            ]}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 512"
                            >
                              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                            </svg>
                          </Dropdown>
                        </div>
                        {/* Toggle Switch */}
                        <label
  style={{
    position: "relative",
    display: "inline-block",
    width: "36px",
    height: "20px",
    marginLeft: "10px",
    verticalAlign: "middle"
  }}
>
  <input
    type="checkbox"
    checked={party.active ?? true}
    onChange={(e) => {
      const newData = { ...data };
      newData.parties = newData.parties.map((p, i) =>
        i === index ? { ...p, active: e.target.checked } : p
      );
      setData(newData);
      setChange(!change);
    }}
    onClick={e => e.stopPropagation()}
    style={{
      opacity: 0,
      width: 0,
      height: 0,
      position: "absolute"
    }}
  />
  <span
    style={{
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: party.active ?? true ? "#4ade80" : "#ccc",
      transition: ".4s",
      borderRadius: "20px"
    }}
  >
    <span
      style={{
        position: "absolute",
        content: '""',
        height: "16px",
        width: "16px",
        left: party.active ?? true ? "18px" : "2px",
        bottom: "2px",
        backgroundColor: "white",
        transition: ".4s",
        borderRadius: "50%",
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
      }}
    />
  </span>
</label>
                      </div>
                    ))
                : data?.parties?.map((party, index) => (
                    <div
                      className={`tile ${
                        selectedParty === party ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => handlePartySelect(party)}
                    >
                      <h1>{party.partyName}</h1>
                      {/* <h1>{party.partyName}</h1> */}
                      <h2 className="hovEle">{party.partyName}</h2>
                      <div className="">
                        <p
                          className={`${
                            party.credit !== undefined && party.credit !== null
                              ? Number(party.credit) > 0
                                ? "text-green-600"
                                : Number(party.credit) < 0
                                ? "text-red-600"
                                : ""
                              : ""
                          }`}
                        >
                          ₹{" "}
                          {party.credit
                            ? party.credit < 0
                              ? party.credit / -1
                              : party.credit
                            : data?.Transactions?.filter(
                                (item) => item.name === party.partyName
                              ).reduce((acc, obj) => acc + obj.amount, 0)}
                        </p>
                        {/* <Dropdown menuItems={["View/Edit", "Delete"]}> */}
                        <Dropdown
                          menuItems={[
                            {
                              label: "View/Edit",
                              action: () => setToggle(true),
                            },
                            {
                              label: "Delete",
                              action: () => handlePartyRemove(party),
                            },
                          ]}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 512"
                          >
                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                          </svg>
                        </Dropdown>
                      </div>
                      {/* Toggle Switch */}
                      <label
  style={{
    position: "relative",
    display: "inline-block",
    width: "36px",
    height: "20px",
    marginLeft: "10px",
    verticalAlign: "middle"
  }}
>
  <input
    type="checkbox"
    checked={party.active ?? true}
    onChange={(e) => {
      const newData = { ...data };
      newData.parties = newData.parties.map((p, i) =>
        i === index ? { ...p, active: e.target.checked } : p
      );
      setData(newData);
      setChange(!change);
    }}
    onClick={e => e.stopPropagation()}
    style={{
      opacity: 0,
      width: 0,
      height: 0,
      position: "absolute"
    }}
  />
  <span
    style={{
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: party.active ?? true ? "#4ade80" : "#ccc",
      transition: ".4s",
      borderRadius: "20px"
    }}
  >
    <span
      style={{
        position: "absolute",
        content: '""',
        height: "16px",
        width: "16px",
        left: party.active ?? true ? "18px" : "2px",
        bottom: "2px",
        backgroundColor: "white",
        transition: ".4s",
        borderRadius: "50%",
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
      }}
    />
  </span>
</label>
                    </div>
                  ))}
            </div>
          </div>
          {inactivePg && (
            <PartyList
              data={data}
              setData={setData}
              change={change}
              setChange={setChange}
              setClose={setinactivePg}
            />
          )}
          <div className="right">
            {selectedParty ? (
              <div className="rounded-md bg-gray-100 mb-2 p-3">
                <h1 className="text-xl font-semibold flex justify-between items-center w-full mb-2">
                  {selectedParty.partyName}
                  <div className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-5 w-5"
                    >
                      <path d="M160 368c26.5 0 48 21.5 48 48l0 16 72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6L448 368c8.8 0 16-7.2 16-16l0-288c0-8.8-7.2-16-16-16L64 48c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l96 0zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-21.3 0-6.4 0-.3 0-4 0-48-48 0-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L208 492z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-5 w-5"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-5 w-5"
                    >
                      <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
                    </svg>
                  </div>
                </h1>
                <div className="flex justify-between w-full text-sm">
                  <div className="flex flex-col justify-between items-start gap-2">
                    <p>
                      Phone Number:{" "}
                      <span className="font-semibold">
                        {selectedParty.phoneNo}
                      </span>
                    </p>
                    <p>
                      Email:{" "}
                      <span className="font-semibold">
                        {selectedParty.Email}
                      </span>
                    </p>
                    <p>
                      Credit Limit:{" "}
                      <span className="font-semibold">
                        {selectedParty.creditLimit}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-end gap-2">
                    <p>
                      Address:{" "}
                      <span className="font-semibold">{selectedParty.Add}</span>
                    </p>
                    <p>
                      GSTIN:{" "}
                      <span className="font-semibold">
                        {selectedParty.GSTIN}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>
                      Active: 
                      </span>
                      <input type="checkbox" name="" id="" />
                    </p>

                  </div>
                </div>
                {/* <div className="flex gap-3">
                  <button
                    className="text-blue-500 font-semibold hover:text-blue-700 text-sm mt-2"
                    onClick={() => setToggle(true)}
                  >
                    Edit Party Details
                  </button>
                  <button
                    className="text-red-500 font-semibold hover:text-red-600 text-sm mt-2"
                    onClick={() => handlePartyRemove(selectedParty)}
                  >
                    Remove Party
                  </button>
                </div> */}
              </div>
            ) : (
              <div className="flex rounded-md bg-gray-100 mb-2 p-3 justify-between">
                <h1>No Party Selected</h1>
              </div>
            )}
            {/* // <div className="content">
              //   <div className="t">
              //     <h1>TRANSACTIONS</h1>
              //     <div className="search">
              //       <svg
              //         xmlns="http://www.w3.org/2000/svg"
              //         viewBox="0 0 512 512"
              //       >
              //         <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              //       </svg>
              //       <input
              //         type=""
              //         value={TransactionSearc}
              //         onChange={(e) => setTransactionSearch(e.target.value)}
              //       />
              //     </div>
              //   </div> */}
            {selectedParty && (
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
                      <input
                        type=""
                        className="bg-transparent"
                        value={TransactionSearc}
                        onChange={(e) => setTransactionSearch(e.target.value)}
                      />
                    </div>
                    {/* <button
                      className="px-3 rounded-full bg-blue-500 hover:to-blue-400 text-white"
                      onClick={() => Navigate("/addsales")}
                    >
                      + Add Sale
                    </button> */}
                  </div>
                </div>

                <SortableTable data={sendingArray} columns={columns} />
              </div>
            )}
          </div>
        </div>
      ) : page == "groups" ? (
        <div id="parties">
          <div className="left text-sm">
            {search ? (
              <div className="flex p-2 relative"  ref={divRef} >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-[20px]  mx-2"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <input
                  type="text"
                  name=""
                  id=""
                  value={SearchQuerry}
                  onChange={(e) => setSearchQuerry(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-700"
                />
                <button onClick={() => setSearch(!search)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-[20px] mx-2"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="top">
                <div className="bg-orange-400 rounded-md px-2 py-1 rounded-md text-white fill-white text-sm">
                  <button onClick={() => setGrpPg(1)}>Add Groups +</button>
                </div>

                <div
                  onClick={() => setSearch(!search)}
                  // className="bg-transparent p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[20px]  mx-2"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </div>
              </div>
            )}
            <div className="content">
              <div className="head">
                <h2>Name</h2>
              </div>
              {SearchQuerry && search
                ? data?.groups
                    ?.filter(
                      (e) =>
                        SearchQuerry.toLowerCase()
                          .split(" ")
                          .every((word) => e.toLowerCase().includes(word))
                    )
                    .map((e, index) => (
                      <div
                        className={`tile relative w-full ${
                          selectedParty === e ? "selected" : ""
                        }`}
                        key={index}
                        onClick={() => handlePartySelect(e)}
                      >
                        <h1 className="">{e}</h1>
                      </div>
                    ))
                : data?.groups?.map((party, index) => (
                    <div
                      className={`tile ${
                        selectedParty === party ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => handlePartySelect(party)}
                    >
                      <h1>{party}</h1>
                      <Dropdown
                            menuItems={[
                              {
                                label: "Delete",
                                action: () => {
                                  let newDa = data;
                                  newDa.groups = newDa.groups.filter(
                                    (ele) => ele !== party
                                  );
                                  console.log(newDa);
                                  setData(newDa);
                                  setChange(!change);
                                  setSelectedParty();
                                },
                              },
                            ]}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 512"
                            >
                              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                            </svg>
                          </Dropdown>
                    </div>
                  ))}
            </div>
          </div>
          {GrpPg === 1 && (
            <div className="fixed top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="w-[300px] h-[300px] flex justify-between flex-col items-center bg-white rounded-md shadow-md overflow-hidden">
                <div className="flex justify-between p-3 bg-orange-200 w-full ">
                  <p className="font-semibold">Party group</p>
                  <p
                    onClick={() => setGrpPg(0)}
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
                    onClick={() => GrpPgInps?.val?.length > 0 && AddGrp(GrpPgInps.val)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          {GrpPg === 2 && (
            <div className="fixed top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="w-[300px] max-h-[400px] flex justify-between flex-col items-center bg-white rounded-md shadow-md overflow-hidden">
                <div className="flex justify-between p-3 bg-orange-200 w-full font-semibold">
                  <p>Parties</p>
                  <p onClick={() => setGrpPg(0)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                  </p>
                </div>
                <div className="p-3">
                  <p className="p-1 font-semibold">Add Party to Group</p>
                  <Autocomplete
                                        disablePortal
                                        options={data?.parties.map((unit)=> ({label:unit.partyName}))}
                                        sx={{ width: 250 }}
                                        renderInput={(params) => <TextField {...params} label="Parties" />}
                                        
                                        value={GrpPgInps.val}
                    onChange={(event, newValue) =>
                      setGrpPgInps({ st: false, val: newValue })
                    }
                                      />
                </div>

                <div className="w-full p-3">
                  <button
                    className="bg-blue-400 w-full font-semibold text-lg px-3 py-1 rounded-md shadow-md text-white"
                    onClick={() => GrpPgInps.st && MoveToGrp(GrpPgInps.val)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="right">
            {selectedParty ? (
              <div className="rounded-md bg-gray-100 mb-2 p-3">
                <div className="flex justify-between w-full items-center">
                  <h1 className="text-lg font-semibold">{selectedParty}</h1>
                  <button
                    className="text-blue-500 font-semibold hover:text-blue-700 text-lg"
                    onClick={() => setGrpPg(2)}
                  >
                    Move To This Group
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex rounded-md bg-gray-100 mb-2 p-3 justify-between">
                <h1>No Party Selected</h1>
              </div>
            )}
            {selectedParty && (
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
                      <input
                        type=""
                        className="bg-transparent"
                        value={TransactionSearc}
                        onChange={(e) => setTransactionSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <SortableTable data={sendingArray} columns={columns} />
              </div>
            )}
          </div>
        </div>
      ) : (page == "loyalty") ? (
        <div id="parties">
          <div className="right">
            <div className="rounded-lg my-2 flex gap-1 mb-4">
              <p className="px-3 py-1 text-white rounded-lg text-center bg-blue-400  text-md">
              <span className="font-bold">{data.parties.filter(
          (ele1) => ele1.PartyLoyaltyPoints
        ).reduce((acc, obj) => acc + parseInt(obj.PartyLoyaltyPoints), 0)}</span> - total reward points awarded
              </p>
              <p className="px-3 py-1 text-white rounded-lg text-center bg-red-400  text-md">
              <span className="font-bold">{data.parties.filter(
          (ele1) => ele1.PartyLoyaltyPoints
        ).reduce((acc, obj) => acc + parseInt(obj.PartyLoyaltyPoints), 0)}</span> - Ammount Given as discount
              </p>
              <p className="px-3 py-1 text-white rounded-lg text-center bg-green-400  text-md">
              <span className="font-bold">{data.parties.filter(
          (ele1) => ele1.PartyLoyaltyPoints
        ).length}</span> - Parties with active Points
              </p>
            </div>
            <div className="flex items-center bg-gray-100 py-1 rounded-sm">
              <span className="flex-1 text-center font-semibold">Party</span>
              <span className="flex-1 text-center font-semibold">Available loyalty points</span>
              <span className="flex-1 text-center font-semibold">Action</span>
            </div>
            {data.parties.map((party, index) => (
              <div
                className={`flex items-center`}
                key={index}
              >
                <h1 className="flex-1 text-center">{party.partyName}</h1>
                <h1 className="text-red-500 flex-1 text-center">{party.PartyLoyaltyPoints? party.PartyLoyaltyPoints: 0}</h1>
                <div className="flex justify-center gap-2 flex-1 my-1">
                  <button className="p-1 px-3 hover:bg-blue-500 rounded-md bg-blue-400 text-white">Add Points</button>
                  <button className="p-1 px-3 hover:bg-blue-500 rounded-md bg-blue-400 text-white">Remove Points</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>No page selected</h1>
      )}
    </div>
  );
}

const PartyList = ({ data, setData, change, setChange, setClose }) => {
  const [selectedParties, setSelectedParties] = useState([]);

  const handleSelect = (partyName) => {
    setSelectedParties((prevSelected) => {
      if (prevSelected.includes(partyName)) {
        return prevSelected.filter((name) => name !== partyName);
      } else {
        return [...prevSelected, partyName];
      }
    });
  };

  const handleAdd = () => {
    const updatedParties = data.parties.map((party) => {
      if (selectedParties.includes(party.partyName)) {
        return { ...party, state: "inactive" };
      }
      return party;
    });

    console.log(updatedParties);


    setSelectedParties([]); // Clear the selection after updating
  };

  return (
    <div>
      <h3>Select Parties</h3>
      <ul>
        {data.parties.map((party) => (
          <li key={party.partyName}>
            <label>
              <input
                type="checkbox"
                checked={selectedParties.includes(party.partyName)}
                onChange={() => handleSelect(party.partyName)}
              />
              {party.partyName}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
