import React, { useEffect, useMemo, useState } from "react";
import Undone from "../components/undone";
import TodoList from "../components/todoList";
import dev_url from "../url";
import LogIn from "./login";
import AddInfo from "./addInfo";
import { useNavigate } from "react-router-dom";
import OnlineStore from "./OnlineStore";
import CommingSoon from "./commingSoon";
// import { Link } from "react-router-dom";

export default function Dashboard({ data, setData }) {
  const Navigate = useNavigate();

  var [page, setPage] = useState("dashboard");

  const [taskStatus, setTaskStatus] = useState({});
  useEffect(() => {
    if (data?.todo_list) {
      // console.log(data?.todo_list);
      setTaskStatus(data?.todo_list);
    }
    if (data.serverError) {
      alert("server not responding");
    } else if (!data.name) {
      Navigate("/add-info");
    }
  }, [data]);
  // useMemo(() => {
  //   if (data?.todo_list) {
  //     setTaskStatus(data?.todo_list);
  //   }
  //   // console.log('Computing sum...');
  //   // return a + b;
  // }, [data]);
  let uid = data.uid;
  useEffect(() => {
    if (data && Object.keys(taskStatus).length >= 0) {
      // setdata({ ...data, [data.todo_list]: taskStatus });
      let url = dev_url + "update_todo";
      // console.log(data);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: uid, // Modify this if necessary
        },
        body: JSON.stringify({ todo_lists: taskStatus }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("todo pull:", data);
          // alert("done");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [taskStatus]);
  return (
    <div id="Dashboard">
      <div className="topbar">
        <button
          className={page === "dashboard" ? "selected" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>
        {/* <button
          className={page === "overview" ? "selected" : ""}
          onClick={() => setPage("overview")}
        >
          Overview
        </button>
        <button
          className={page === "history" ? "selected" : ""}
          onClick={() => setPage("history")}
        >
          History
        </button> */}
        <button
          className={page === "search" ? "selected" : ""}
          onClick={() => setPage("search")}
        >
          Search Product Online
        </button>
        <button
          className={page === "store" ? "selected" : ""}
          onClick={() => setPage("store")}
        >
          My online store
        </button>
      </div>
      {page === "dashboard" && (
        <div className="content">
          <div className="left">
            <div
              className="tile sale"
              onClick={() => Navigate("/sale-invoice")}
            >
              <div className="top">
                <div className="title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                  </svg>
                  <h1>Sales</h1>
                </div>
                <select name="date" id="">
                  <option value="">Today</option>
                  <option value="">This Week</option>
                  <option value="">This Month</option>
                </select>
              </div>
              <div className="mid">
                <h1>₹ {data?.total_sales}</h1>
                <h2>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z" />
                  </svg>{" "}
                  11.1%
                </h2>
              </div>
              <div className="profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
            </div>
            <div className="tile profit">
              <div className="top">
                <div className="title">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1536 10.1298C19.6443 10.1313 19.1404 10.2892 18.671 10.5941C18.2016 10.899 17.7762 11.345 17.4197 11.9061C17.4094 11.3365 17.3189 10.7772 17.1545 10.267C16.9901 9.75678 16.7558 9.30785 16.4677 8.95133C16.7655 8.58926 17.006 8.12736 17.1709 7.60063C17.3358 7.07391 17.4209 6.49618 17.4197 5.9112C17.4202 4.87657 17.1549 3.8838 16.6818 3.1506C16.2087 2.41741 15.5665 2.00363 14.896 2.00002H4.53567C4.01084 1.99777 3.49856 2.24763 3.06991 2.71492C2.64126 3.18221 2.31748 3.84378 2.14351 4.60783C1.96953 5.37189 1.95398 6.20055 2.099 6.97886C2.24403 7.75717 2.54244 8.44654 2.95285 8.95133C2.65582 9.31637 2.41596 9.78005 2.2511 10.3079C2.08625 10.8357 2.00063 11.4141 2.00063 12C2.00063 12.5859 2.08625 13.1643 2.2511 13.6921C2.41596 14.22 2.65582 14.6836 2.95285 15.0487C2.54227 15.5519 2.24361 16.2401 2.09848 17.0175C1.95334 17.795 1.96896 18.6229 2.14314 19.386C2.31733 20.1491 2.64142 20.8094 3.07026 21.2748C3.49911 21.7403 4.01136 21.9878 4.53567 21.9829H14.896C15.3718 21.9829 15.8379 21.7762 16.2411 21.3866C16.6444 20.997 16.9684 20.4401 17.1761 19.7797C17.532 20.4719 17.9846 21.0312 18.5002 21.4157C19.0158 21.8001 19.581 21.9999 20.1536 22C20.6587 22 21.1589 21.8465 21.6256 21.5482C22.0922 21.25 22.5163 20.8128 22.8734 20.2617C23.2306 19.7105 23.5139 19.0562 23.7072 18.3362C23.9005 17.6161 24 16.8443 24 16.0649C24 15.2855 23.9005 14.5137 23.7072 13.7936C23.5139 13.0736 23.2306 12.4193 22.8734 11.8682C22.5163 11.317 22.0922 10.8799 21.6256 10.5816C21.1589 10.2833 20.6587 10.1298 20.1536 10.1298ZM14.896 20.275H4.53567C4.15991 20.275 3.79955 20.0447 3.53385 19.6347C3.26815 19.2247 3.11888 18.6686 3.11888 18.0888C3.11888 17.509 3.26815 16.953 3.53385 16.543C3.79955 16.133 4.15991 15.9027 4.53567 15.9027H14.896C15.2717 15.9027 15.6321 16.133 15.8978 16.543C16.1635 16.953 16.3128 17.509 16.3128 18.0888C16.3128 18.6686 16.1635 19.2247 15.8978 19.6347C15.6321 20.0447 15.2717 20.275 14.896 20.275ZM14.896 14.1947H4.53567C4.15845 14.1947 3.79667 13.9635 3.52993 13.5519C3.2632 13.1403 3.11334 12.5821 3.11334 12C3.11334 11.4179 3.2632 10.8597 3.52993 10.4481C3.79667 10.0365 4.15845 9.8053 4.53567 9.8053H14.896C15.2732 9.8053 15.635 10.0365 15.9017 10.4481C16.1685 10.8597 16.3183 11.4179 16.3183 12C16.3183 12.5821 16.1685 13.1403 15.9017 13.5519C15.635 13.9635 15.2732 14.1947 14.896 14.1947ZM14.896 8.09736H4.53567C4.15845 8.09736 3.79667 7.86614 3.52993 7.45455C3.2632 7.04296 3.11334 6.48473 3.11334 5.90266C3.11334 5.32059 3.2632 4.76236 3.52993 4.35077C3.79667 3.93918 4.15845 3.70796 4.53567 3.70796H14.896C15.2732 3.70796 15.635 3.93918 15.9017 4.35077C16.1685 4.76236 16.3183 5.32059 16.3183 5.90266C16.3183 6.48473 16.1685 7.04296 15.9017 7.45455C15.635 7.86614 15.2732 8.09736 14.896 8.09736ZM20.1536 20.2921C19.6123 20.2904 19.0834 20.0412 18.6337 19.5761C18.1841 19.111 17.8338 18.4507 17.6271 17.6786C17.4205 16.9066 17.3667 16.0573 17.4726 15.2381C17.5784 14.419 17.8392 13.6665 18.222 13.0759C18.6048 12.4852 19.0925 12.0828 19.6234 11.9194C20.1542 11.756 20.7046 11.839 21.205 12.1579C21.7053 12.4768 22.1332 13.0173 22.4347 13.7111C22.7361 14.4049 22.8976 15.221 22.8987 16.0564C22.8991 16.6128 22.8284 17.1639 22.6906 17.6781C22.5528 18.1923 22.3506 18.6595 22.0956 19.053C21.8406 19.4464 21.5379 19.7584 21.2046 19.971C20.8714 20.1836 20.5142 20.2927 20.1536 20.2921Z"
                      fill="#212934"
                    />
                  </svg>

                  <h1>Profit</h1>
                </div>
                <select name="date" id="">
                  <option value="">Today</option>
                  <option value="">This Week</option>
                  <option value="">This Month</option>
                </select>
              </div>
              <div className="mid">
                <h1>₹ {data?.total_profit}</h1>
                <h2>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z" />
                  </svg>{" "}
                  19.01%
                </h2>
              </div>
              <div className="profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
            </div>
            <div
              className="tile collect"
              onClick={() => Navigate("/sale-invoice")}
            >
              <div className="top">
                <div className="title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                  <div className="">
                    <h1>To Collect</h1>
                    <h2>
                      {data?.sales?.reduce((acc, obj) => acc + obj.pending, 0)
                        ? data.sales.reduce((acc, obj) => acc + obj.pending, 0)
                        : "0"}
                    </h2>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                </svg>
              </div>
              <div className="mid">
                <div className="tile">
                  <p>Rohit Bhatt</p>
                  <p>₹ 200.8</p>
                </div>
                <div className="tile">
                  <p>Natik Shah Bhatt</p>
                  <p>₹ 100.8</p>
                </div>
              </div>
              <div className="profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
            </div>
            <div
              className="tile pay"
              onClick={() => Navigate("/purchase-bill")}
            >
              <div className="top">
                <div className="title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                  <div className="">
                    <h1>To pay</h1>
                    <h2>
                    {data?.purchase?.filter((obj) => obj.payment_type === "credit").reduce((acc, obj) => acc + obj.total, 0)
                        ? data.purchase.filter((obj) => obj.payment_type === "credit").reduce((acc, obj) => acc + obj.total, 0)
                        : "0"}
                    </h2>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                </svg>
              </div>
              <div className="mid">
                <div className="tile">
                  <p>Rohit Bhatt</p>
                  <p>₹ 200.8</p>
                </div>
                <div className="tile">
                  <p>Natik Shah Bhatt</p>
                  <p>₹ 100.8</p>
                </div>
              </div>
              <div className="profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
            </div>
            <div
              className="tile purchase"
              onClick={() => Navigate("/purchase-bill")}
            >
              <div className="top">
                <div className="title">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.707 3.793C13.6143 3.69996 13.5041 3.62617 13.3828 3.57589C13.2614 3.5256 13.1313 3.49981 13 3.5H4C3.73478 3.5 3.48043 3.60536 3.29289 3.79289C3.10536 3.98043 3 4.23478 3 4.5V13.5C3 13.766 3.105 14.02 3.293 14.207L11.293 22.207C11.3857 22.3002 11.4958 22.3741 11.6171 22.4246C11.7385 22.4751 11.8686 22.501 12 22.501C12.1314 22.501 12.2615 22.4751 12.3829 22.4246C12.5042 22.3741 12.6143 22.3002 12.707 22.207L21.707 13.207C21.7999 13.1142 21.8737 13.004 21.924 12.8827C21.9743 12.7614 22.0002 12.6313 22.0002 12.5C22.0002 12.3687 21.9743 12.2386 21.924 12.1173C21.8737 11.996 21.7999 11.8858 21.707 11.793L13.707 3.793ZM12 20.086L5 13.086V5.5H12.586L19.586 12.5L12 20.086Z"
                      fill="#212934"
                    />
                    <path
                      d="M8.49597 10.5C9.32716 10.5 10.001 9.82618 10.001 8.99499C10.001 8.1638 9.32716 7.48999 8.49597 7.48999C7.66478 7.48999 6.99097 8.1638 6.99097 8.99499C6.99097 9.82618 7.66478 10.5 8.49597 10.5Z"
                      fill="#212934"
                    />
                  </svg>

                  <h1>Purchase</h1>
                </div>
                <select name="date" id="">
                  <option value="">Today</option>
                  <option value="">This Week</option>
                  <option value="">This Month</option>
                </select>
              </div>
              <div className="mid">
                <h1>₹ {data?.total_purchase}</h1>
                <p>
                  {data?.total_purchase === 0 &&
                    "You have no purchases for today"}
                </p>
              </div>
              <div className="profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
            </div>
            <div className="tile expense" onClick={() => Navigate("/expenses")}>
              <div className="top">
                <div className="title">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.94411 3.75H14.0561C15.8941 3.75 17.3501 3.75 18.4891 3.903C19.6611 4.061 20.6101 4.393 21.3591 5.141C22.1071 5.89 22.4391 6.839 22.5971 8.011C22.6871 8.684 22.7241 9.467 22.7391 10.374C22.7522 10.45 22.7535 10.5276 22.7431 10.604C22.7501 11.17 22.7501 11.782 22.7501 12.444V12.556C22.7501 14.394 22.7501 15.85 22.5971 16.989C22.4391 18.161 22.1071 19.11 21.3591 19.859C20.6101 20.607 19.6611 20.939 18.4891 21.097C17.3491 21.25 15.8941 21.25 14.0561 21.25H9.94411C8.10611 21.25 6.65011 21.25 5.51111 21.097C4.33911 20.939 3.39011 20.607 2.64111 19.859C1.89311 19.11 1.56111 18.161 1.40311 16.989C1.25011 15.849 1.25011 14.394 1.25011 12.556V12.444C1.25011 11.782 1.25011 11.17 1.25711 10.604C1.24639 10.5276 1.2474 10.4501 1.26011 10.374C1.27611 9.467 1.31311 8.684 1.40311 8.011C1.56111 6.839 1.89311 5.89 2.64111 5.141C3.39011 4.393 4.33911 4.061 5.51111 3.903C6.65111 3.75 8.10611 3.75 9.94411 3.75ZM2.75211 11.25C2.75011 11.638 2.75011 12.054 2.75011 12.5C2.75011 14.407 2.75211 15.762 2.89011 16.79C3.02511 17.795 3.27911 18.375 3.70211 18.798C4.12511 19.221 4.70511 19.475 5.71111 19.61C6.73911 19.748 8.09311 19.75 10.0001 19.75H14.0001C15.9071 19.75 17.2621 19.748 18.2901 19.61C19.2951 19.475 19.8751 19.221 20.2981 18.798C20.7211 18.375 20.9751 17.795 21.1101 16.789C21.2481 15.761 21.2501 14.407 21.2501 12.5C21.2501 12.054 21.2501 11.638 21.2481 11.25H2.75211ZM21.2241 9.75H2.77611C2.79611 9.163 2.83011 8.656 2.89011 8.21C3.02511 7.205 3.27911 6.625 3.70211 6.202C4.12511 5.779 4.70511 5.525 5.71111 5.39C6.73911 5.252 8.09311 5.25 10.0001 5.25H14.0001C15.9071 5.25 17.2621 5.252 18.2901 5.39C19.2951 5.525 19.8751 5.779 20.2981 6.202C20.7211 6.625 20.9751 7.205 21.1101 8.211C21.1701 8.656 21.2041 9.163 21.2241 9.75ZM5.25011 16.5C5.25011 16.3011 5.32912 16.1103 5.46978 15.9697C5.61043 15.829 5.8012 15.75 6.00011 15.75H10.0001C10.199 15.75 10.3898 15.829 10.5304 15.9697C10.6711 16.1103 10.7501 16.3011 10.7501 16.5C10.7501 16.6989 10.6711 16.8897 10.5304 17.0303C10.3898 17.171 10.199 17.25 10.0001 17.25H6.00011C5.8012 17.25 5.61043 17.171 5.46978 17.0303C5.32912 16.8897 5.25011 16.6989 5.25011 16.5ZM11.7501 16.5C11.7501 16.3011 11.8291 16.1103 11.9698 15.9697C12.1104 15.829 12.3012 15.75 12.5001 15.75H14.0001C14.199 15.75 14.3898 15.829 14.5304 15.9697C14.6711 16.1103 14.7501 16.3011 14.7501 16.5C14.7501 16.6989 14.6711 16.8897 14.5304 17.0303C14.3898 17.171 14.199 17.25 14.0001 17.25H12.5001C12.3012 17.25 12.1104 17.171 11.9698 17.0303C11.8291 16.8897 11.7501 16.6989 11.7501 16.5Z"
                      fill="#212934"
                    />
                  </svg>

                  <h1>Expense</h1>
                </div>
                <select name="date" id="">
                  <option value="">Today</option>
                  <option value="">This Week</option>
                  <option value="">This Month</option>
                </select>
              </div>
              <div className="mid">
                <h1>₹ {data?.total_expense}</h1>
              </div>
              <div className="profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
            </div>
            <div className="tile cash">
              <div className="top">
                <div className="title">
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.75 15.125L6.60963 10.7841C7.12563 10.2034 7.75879 9.73865 8.46742 9.42036C9.17604 9.10208 9.94405 8.93751 10.7209 8.9375H11M2.75 26.8125H10.3125L15.8125 22.6875C15.8125 22.6875 16.9262 21.9354 18.5625 20.625C22 17.875 18.5625 13.5217 15.125 15.8125C12.3255 17.6784 9.625 19.25 9.625 19.25"
                      stroke="#212934"
                      strokeWidth="2.0625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 18.5625V9.625C11 8.89565 11.2897 8.19618 11.8055 7.68046C12.3212 7.16473 13.0207 6.875 13.75 6.875H27.5C28.2293 6.875 28.9288 7.16473 29.4445 7.68046C29.9603 8.19618 30.25 8.89565 30.25 9.625V17.875C30.25 18.6043 29.9603 19.3038 29.4445 19.8195C28.9288 20.3353 28.2293 20.625 27.5 20.625H18.5625"
                      stroke="#212934"
                      strokeWidth="2.0625"
                    />
                    <path
                      d="M26.8125 13.7638L26.8263 13.7486M14.4375 13.7638L14.4513 13.7486M20.625 16.5C19.8957 16.5 19.1962 16.2103 18.6805 15.6945C18.1647 15.1788 17.875 14.4793 17.875 13.75C17.875 13.0207 18.1647 12.3212 18.6805 11.8055C19.1962 11.2897 19.8957 11 20.625 11C21.3543 11 22.0538 11.2897 22.5695 11.8055C23.0853 12.3212 23.375 13.0207 23.375 13.75C23.375 14.4793 23.0853 15.1788 22.5695 15.6945C22.0538 16.2103 21.3543 16.5 20.625 16.5Z"
                      stroke="#212934"
                      strokeWidth="2.0625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="">
                    <h1>Cash In hand</h1>
                    <p>₹ 20,738</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                </svg>
              </div>
              <div className="mid">
                <div className="tile">
                  <p>Rohit Bhatt</p>
                  <p>₹ 200.8</p>
                </div>
                <div className="tile">
                  <p>Natik Shah Bhatt</p>
                  <p>₹ 100.8</p>
                </div>
                <div className="profile">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="tile score">
              <div className="top">
                <div className="title">
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_121_2184"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="16"
                      height="19"
                    >
                      <path
                        d="M14.2537 9.09557V5.45586L10.614 1.41174H2.12132C1.90681 1.41174 1.70108 1.49696 1.5494 1.64864C1.39772 1.80033 1.3125 2.00605 1.3125 2.22057V16.7794C1.3125 16.9939 1.39772 17.1996 1.5494 17.3513C1.70108 17.503 1.90681 17.5882 2.12132 17.5882H6.16544"
                        stroke="white"
                        strokeWidth="1.61765"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.8271 14.3528C12.7205 14.3528 13.4448 13.6286 13.4448 12.7352C13.4448 11.8418 12.7205 11.1176 11.8271 11.1176C10.9337 11.1176 10.2095 11.8418 10.2095 12.7352C10.2095 13.6286 10.9337 14.3528 11.8271 14.3528Z"
                        fill="#555555"
                        stroke="white"
                        strokeWidth="1.61765"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.0624 17.5882C15.0624 16.7302 14.7215 15.9073 14.1148 15.3005C13.5081 14.6938 12.6851 14.3529 11.8271 14.3529C10.969 14.3529 10.1461 14.6938 9.53939 15.3005C8.93266 15.9073 8.5918 16.7302 8.5918 17.5882M10.2094 1.41174V5.45586H14.2536"
                        stroke="white"
                        strokeWidth="1.61765"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </mask>
                    <g mask="url(#mask0_121_2184)">
                      <path
                        d="M-2.125 -0.125122H17.2868V19.2866H-2.125V-0.125122Z"
                        fill="black"
                      />
                    </g>
                  </svg>

                  <h1>Staff Score</h1>
                </div>
                <select name="date" id="">
                  <option value="">Today</option>
                  <option value="">This Week</option>
                  <option value="">This Month</option>
                </select>
              </div>
              <div className="mid">
                <div className="tile">
                  <p>{"Pratham"}</p>
                  <p>({"10"})</p>
                </div>
                <div className="tile">
                  <p>{"Sameer"}</p>
                  <p>({"Absent"})</p>
                </div>
                <div className="tile">
                  <p>{"Shubham"}</p>
                  <p>({"17"})</p>
                </div>
                <div className="tile">
                  <p>{"Vikas"}</p>
                  <p>({"5"})</p>
                </div>
                <div className="profile">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="list">
              <div className="title">
                <h1>To Do List</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
              <TodoList taskStatus={taskStatus} setTaskStatus={setTaskStatus} />
            </div>
            <div className="list">
              <div className="title">
                <h1>
                  Stock Value{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                  </svg>
                </h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
              <h1>₹ 695</h1>
            </div>
            <div className="list">
              <div className="title">
                <h1>Low stock alerts</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
              <div className="people">
                <div className="li">
                  <img src="" alt="" />
                  <p>Low Stock</p>
                </div>
                <div className="li">
                  <img src="" alt="" />
                  <p>Low Stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === "overview" && <Undone />}
      {page === "history" && <Undone />}
      {page === "search" && <CommingSoon />}
      {page === "store" && <OnlineStore pr={false} />}
    </div>
  );
}
