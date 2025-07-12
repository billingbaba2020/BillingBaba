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
  Filter,
  Check,
  ChevronDown,
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
  const [todoFilter, setTodoFilter] = useState("all"); // 'all', 'completed', 'pending'
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

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

  // Filtered todo list based on filter selection
  const filteredTodoList = () => {
    if (!taskStatus) return {};
    
    if (todoFilter === "completed") {
      return Object.fromEntries(
        Object.entries(taskStatus).filter(([_, value]) => value)
      );
    } else if (todoFilter === "pending") {
      return Object.fromEntries(
        Object.entries(taskStatus).filter(([_, value]) => !value)
      );
    }
    return taskStatus;
  };

  // Tabs
  const renderTab = () => {
    if (activeTab === "todo")
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3">
            <h3 className="text-lg font-medium">Tasks</h3>
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-3 py-1.5 rounded border border-gray-200"
              >
                <Filter className="w-4 h-4" />
                <span>
                  {todoFilter === "all" ? "All Tasks" : 
                   todoFilter === "completed" ? "Completed" : "Pending"}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setTodoFilter("all");
                        setShowFilterDropdown(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <span>All Tasks</span>
                      {todoFilter === "all" && <Check className="w-4 h-4 text-blue-500" />}
                    </button>
                    <button
                      onClick={() => {
                        setTodoFilter("completed");
                        setShowFilterDropdown(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <span>Completed</span>
                      {todoFilter === "completed" && <Check className="w-4 h-4 text-blue-500" />}
                    </button>
                    <button
                      onClick={() => {
                        setTodoFilter("pending");
                        setShowFilterDropdown(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <span>Pending</span>
                      {todoFilter === "pending" && <Check className="w-4 h-4 text-blue-500" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <TodoList 
            taskStatus={filteredTodoList()} 
            setTaskStatus={setTaskStatus} 
            filter={todoFilter}
          />
        </div>
      );
    if (activeTab === "lowstock")
      return (
        <div>
          <div className="pb-3">
            <h3 className="text-lg flex items-center space-x-2 font-medium">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>Low Stock Alerts</span>
            </h3>
          </div>
          <div className="space-y-2">
            {lowStockItems.length > 0 ? (
              lowStockItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <span className="text-sm text-gray-700">{item.Name}</span>
                  <span className="text-xs font-medium bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full">
                    Stock: {item.stock}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No low stock items</p>
              </div>
            )}
          </div>
        </div>
      );
    if (activeTab === "privacy")
      return (
        <div>
          <div className="pb-3">
            <h3 className="text-lg flex items-center justify-between font-medium">
              Privacy Mode
              <button
                onClick={() => setPrivacyMode(!privacyMode)}
                className="border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg flex items-center space-x-1 text-sm"
              >
                {privacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>Turn {privacyMode ? "Off" : "On"}</span>
              </button>
            </h3>
          </div>
          <div className="py-8">
            {privacyMode ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <EyeOff className="w-16 h-16 text-gray-400 mx-auto" />
                <h2 className="text-2xl font-semibold text-gray-800">Privacy Mode Enabled</h2>
                <p className="text-gray-600">Disable to view your dashboard</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
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
            <h3 className="text-lg font-medium">Follow Us</h3>
          </div>
          <div className="flex space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200">
              <Facebook className="w-5 h-5 text-blue-600" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200">
              <Linkedin className="w-5 h-5 text-blue-700" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200">
              <Twitter className="w-5 h-5 text-sky-500" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200">
              <Instagram className="w-5 h-5 text-pink-600" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200">
              <Youtube className="w-5 h-5 text-red-600" />
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
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
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
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 py-4">
            <button
              className={`text-sm font-medium transition-colors ${
                page === "dashboard" 
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`text-sm font-medium transition-colors ${
                page === "search" 
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setPage("search")}
            >
              Search Product Online
            </button>
            <button
              className={`text-sm font-medium transition-colors ${
                page === "store" 
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setPage("store")}
            >
              My online store
            </button>
            <button
              className={`text-sm font-medium transition-colors ${
                page === "search" 
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setPage("search")}
            >
              Messages
            </button>
          </div>
        </div>
      </div>

      {/* Only show dashboard content if page === "dashboard" */}
      {page === "dashboard" && (
        <>
          {/* Search Bar Section */}
          <div className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center w-full max-w-md">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search Transactions"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Receivable */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Receivable</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹ {toCollect.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-2">You don't have any receivables as of now.</p>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowDown className="w-6 h-6 text-green-500 bg-green-100 rounded-full p-1" />
                  </div>
                </div>
              </div>

              {/* Total Payable */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Payable</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹ {toPay.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      From {data?.purchase?.filter((obj) => obj.payment_type === "credit").length || 0} Party
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowUp className="w-6 h-6 text-red-500 bg-red-100 rounded-full p-1" />
                  </div>
                </div>
              </div>

              {/* Stock Value */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Stock Value</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹ {stockValue.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-2">As of Now</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Package className="w-6 h-6 text-blue-500 bg-blue-100 rounded-full p-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Add padding below Stock Value card */}
            <div className="pb-2"></div>
            
            {/* Side by side layout for Sales Graph and Todo List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Graph - now with proper height and overflow handling */}
                <div className="bg-white rounded-lg shadow-md p-4 h-[400px] min-h-[400px]">
                  <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                  <div className="h-full w-full">
                    {data?.Transactions?.length > 0 ? (
                      <SalesGraph transactions={data.Transactions} />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        No transaction data available
                      </div>
                    )}
                  </div>
                </div>
              {/* Todo List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <div className="flex space-x-1 p-1">
                    <button 
                      onClick={() => setActiveTab("todo")} 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "todo" 
                          ? "bg-blue-100 text-blue-700 font-semibold" 
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      To Do List
                    </button>
                    <button 
                      onClick={() => setActiveTab("lowstock")} 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "lowstock" 
                          ? "bg-blue-100 text-blue-700 font-semibold" 
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Low Stock
                    </button>
                    <button 
                      onClick={() => setActiveTab("privacy")} 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "privacy" 
                          ? "bg-blue-100 text-blue-700 font-semibold" 
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Privacy
                    </button>
                    <button 
                      onClick={() => setActiveTab("social")} 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "social" 
                          ? "bg-blue-100 text-blue-700 font-semibold" 
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Follow Us
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {renderTab()}
                </div>
              </div>
            </div>

            {/* Most Used Reports */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Most Used Reports</h3>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View All
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                  Sale Report
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                  All Transactions
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                  Daybook Report
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                  Party Statement
                </button>
              </div>
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