import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Package,
  Receipt,
  Wallet,
  AlertTriangle,
  Eye,
  EyeOff,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  ArrowDown,
  ArrowUp,
  Search,
  BarChart3,
} from "lucide-react";
import TodoList from "../components/todoList";
import Undone from "../components/undone";
import OnlineStore from "./OnlineStore";
import CommingSoon from "./commingSoon";
import SalesGraph from "./SalesGraph";
import dev_url from "../url";
export default function Dashboard({ data, setData }) {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [privacyMode, setPrivacyMode] = useState(false);
  const [activeTab, setActiveTab] = useState("todo");
  const [taskStatus, setTaskStatus] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data?.todo_list) setTaskStatus(data.todo_list);
    if (data.serverError) alert("server not responding");
    else if (!data.name) navigate("/add-info");
  }, [data, navigate]);

  let uid = data.uid;
  useEffect(() => {
    if (data && Object.keys(taskStatus).length >= 0) {
      let url = dev_url + "update_todo";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: uid,
        },
        body: JSON.stringify({ todo_lists: taskStatus }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [taskStatus]);

  // Metrics
  const salesAmount =
    data?.Transactions?.filter((item) => item.type === "sale").reduce((acc, obj) => acc + obj.amount, 0) || 0;
  const netProfit = data?.sales?.reduce((acc, obj) => acc + (obj.profit || 0), 0) || 0;
  const toCollect =
    data?.to_collect ||
    data?.sales?.reduce((acc, obj) => acc + obj.pending, 0) ||
    0;
  const toPay =
    data?.purchase
      ?.filter((obj) => obj.payment_type === "credit")
      .reduce((acc, obj) => acc + obj.total, 0) || 0;
  const stockValue =
    data?.items
      ?.filter((ele) => ele.stock > 0)
      .reduce((acc, obj) => acc + parseInt(obj.purchasePrice) * obj.stock, 0) || 0;
  const lowStockItems =
    data?.items?.filter((ele) => ele.stock < (ele.minToMaintain || 10)) || [];

  // Tabs
  const renderTab = () => {
    if (activeTab === "todo")
      return <TodoList taskStatus={taskStatus} setTaskStatus={setTaskStatus} />;
    if (activeTab === "lowstock")
      return (
        <div>
          <div className="pb-3">
            <h3 className="text-lg flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>Low Stock Alerts</span>
            </h3>
          </div>
          <div className="space-y-2">
            {lowStockItems.length > 0 ? (
              lowStockItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm text-gray-700">{item.Name}</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {item.stock}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No low stock items</p>
            )}
          </div>
        </div>
      );
    if (activeTab === "privacy")
      return (
        <div>
          <div className="pb-3">
            <h3 className="text-lg flex items-center justify-between">
              Privacy Mode
              <button
                onClick={() => setPrivacyMode(!privacyMode)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                {privacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                Turn {privacyMode ? "Off" : "On"}
              </button>
            </h3>
          </div>
          <div>
            {privacyMode ? (
              <div className="flex flex-col items-center justify-center">
                <EyeOff className="w-16 h-16 text-gray-400 mx-auto" />
                <h2 className="text-2xl font-semibold text-gray-800">Privacy Mode Enabled</h2>
                <p className="text-gray-600">Disable to view your dashboard</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Eye className="w-16 h-16 text-gray-400 mx-auto" />
                <h2 className="text-2xl font-semibold text-gray-800">Privacy Mode Disabled</h2>
                <p className="text-gray-600">Enable to hide your dashboard</p>
              </div>
            )}
          </div>
        </div>
      );
    if (activeTab === "social")
      return (
        <div>
          <div className="pb-3">
            <h3 className="text-lg">Follow Us</h3>
          </div>
          <div className="flex space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2">
              <Facebook className="w-4 h-4 text-blue-600" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2">
              <Linkedin className="w-4 h-4 text-blue-700" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2">
              <Twitter className="w-4 h-4 text-sky-500" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2">
              <Instagram className="w-4 h-4 text-pink-600" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2">
              <Youtube className="w-4 h-4 text-red-600" />
            </a>
          </div>
        </div>
      );
    return null;
  };

  // Privacy overlay
  if (privacyMode) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <EyeOff className="w-16 h-16 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-800">Privacy Mode Enabled</h2>
          <p className="text-gray-600">Disable to view your dashboard</p>
          <button
            onClick={() => setPrivacyMode(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Disable Privacy Mode
          </button>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar Navigation */}
      <div className="topbar flex gap-2 px-4 py-2 bg-white border-b mb-2">
        <button
          className={page === "dashboard" ? "selected font-semibold text-blue-600 underline" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>
        {/* 
        <button
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
        </button>
        */}
        <button
          className={page === "search" ? "selected font-semibold text-blue-600 underline" : ""}
          onClick={() => setPage("search")}
        >
          Search Product Online
        </button>
        <button
          className={page === "store" ? "selected font-semibold text-blue-600 underline" : ""}
          onClick={() => setPage("store")}
        >
          My online store
        </button>
      </div>

      {/* Only show dashboard content if page === "dashboard" */}
      {page === "dashboard" && (
        <>
          {/* Dashboard Header and Content */}
          <div className="bg-white shadow-sm border-b py-3 px-4 flex items-center justify-between">
            <div className="flex items-center w-full max-w-md">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search Transactions"
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Top Cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Total Receivable */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Receivable</p>
                    <p className="text-2xl font-bold text-gray-900">₹ {toCollect.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">You don't have any receivables as of now.</p>
                  </div>
                  <ArrowDown className="w-6 h-6 text-green-500 bg-green-100 rounded-full p-1" />
                </div>
              </div>
              {/* Total Payable */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Payable</p>
                    <p className="text-2xl font-bold text-gray-900">₹ {toPay.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      From {data?.purchase?.filter((obj) => obj.payment_type === "credit").length || 0} Party
                    </p>
                  </div>
                  <ArrowUp className="w-6 h-6 text-red-500 bg-red-100 rounded-full p-1" />
                </div>
              </div>
              {/* Stock Value */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Stock Value</p>
                    <p className="text-2xl font-bold text-gray-900">₹ {stockValue.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">As of Now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Graph Section */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-lg font-semibold">Total Sale</h3>
                <select defaultValue="month" className="w-32 border-blue-200 focus:border-blue-500">
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="h-56 flex flex-col justify-center items-center">
                <p className="text-2xl font-bold text-gray-900 mb-2">₹ {salesAmount.toLocaleString()}</p>
                <div className="w-full h-32 bg-gray-100 rounded flex items-end">
                  {/* Placeholder for graph */}
                  <div className="w-full text-center text-gray-400">
                    <SalesGraph transactions={data.Transactions} />
                  </div>
                </div>
              </div>
            </div>

            {/* Most Used Reports */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-3 overflow-x-auto">
                <button className="whitespace-nowrap">Sale Report</button>
                <button className="whitespace-nowrap">All Transactions</button>
                <button className="whitespace-nowrap">Daybook Report</button>
                <button className="whitespace-nowrap">Party Statement</button>
              </div>
              <button className="text-blue-600">View All</button>
            </div>

            {/* Tabs for extra widgets */}
            <div className="w-full">
              <div className="flex space-x-2 mb-4">
                <button value="todo" onClick={() => setActiveTab("todo")} className={`px-4 py-2 rounded-md ${activeTab === "todo" ? "bg-blue-100 text-blue-800 font-semibold" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>To Do List</button>
                <button value="lowstock" onClick={() => setActiveTab("lowstock")} className={`px-4 py-2 rounded-md ${activeTab === "lowstock" ? "bg-blue-100 text-blue-800 font-semibold" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Low Stock</button>
                <button value="privacy" onClick={() => setActiveTab("privacy")} className={`px-4 py-2 rounded-md ${activeTab === "privacy" ? "bg-blue-100 text-blue-800 font-semibold" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Privacy</button>
                <button value="social" onClick={() => setActiveTab("social")} className={`px-4 py-2 rounded-md ${activeTab === "social" ? "bg-blue-100 text-blue-800 font-semibold" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Follow Us</button>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md">{renderTab()}</div>
            </div>
          </div>
        </>
      )}

      {/* Other pages */}
      {page === "overview" && <Undone />}
      {page === "history" && <Undone />}
      {page === "search" && <CommingSoon />}
      {page === "store" && <OnlineStore pr={false} />}
    </div>
  );
}