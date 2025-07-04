import React, { useState } from 'react';
import { Search, Plus, Calendar, Download, Filter, Edit, Trash2, Pause, Play, ChevronDown, Users, Building2, CreditCard, TrendingUp, FileText, MapPin, Phone, Mail } from 'lucide-react';
/**
 * @typedef {Object} Business
 * @property {number} id
 * @property {string} name
 * @property {string} phone
 * @property {string} gst
 * @property {'ACTIVE' | 'INACTIVE'} status
 * @property {string} paymentMethod
 * @property {string} enrollmentType
 */

/**
 * @typedef {Object} Employee
 * @property {number} id
 * @property {string} name
 * @property {string} city
 * @property {string} role
 * @property {string} joiningDate
 * @property {number} count
 * @property {number} salary
 */

/**
 * @typedef {Object} Transaction
 * @property {number} id
 * @property {string} businessName
 * @property {number} amount
 * @property {string} date
 * @property {'COMPLETED' | 'PENDING' | 'FAILED'} status
 * @property {string} type
 */

function Superadmin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('business'); 
  const [dateRange, setDateRange] = useState('This Month');

  // Sample data
  const businesses = [
    {
      id: 1,
      name: 'GADA ELECTRONICS',
      phone: '+91 123456789',
      gst: '123456789',
      status: 'ACTIVE',
      paymentMethod: 'CASH',
      enrollmentType: 'SALES TEAM'
    },
    {
      id: 2,
      name: 'ABC MOBILES',
      phone: '+91 808080808',
      gst: 'NA',
      status: 'ACTIVE',
      paymentMethod: 'UPI',
      enrollmentType: 'REFERRAL'
    }
  ];

  const employees = [
    {
      id: 1,
      name: 'RAHUL SHARMA',
      city: 'DELHI',
      role: 'SALES',
      joiningDate: '12-07-2024',
      count: 25,
      salary: 8000
    },
    {
      id: 2,
      name: 'MOHIT GUPTA',
      city: 'MUMBAI',
      role: 'TEAM LEADER',
      joiningDate: '01-01-2023',
      count: 30,
      salary: 15000
    }
  ];

  const transactions = [
    {
      id: 1,
      businessName: 'GADA ELECTRONICS',
      amount: 25000,
      date: '2025-02-15',
      status: 'COMPLETED',
      type: 'Subscription'
    },
    {
      id: 2,
      businessName: 'ABC MOBILES',
      amount: 18000,
      date: '2025-02-14',
      status: 'PENDING',
      type: 'Commission'
    }
  ];

  const stats = {
    totalBusiness: 2750,
    active: 2000,
    inactive: 750,
    pendingRequests: 45,
    totalRevenue: 1250000,
    monthlyGrowth: 12.5,
    totalEmployees: 156,
    activeTransactions: 89
  };

  const ActionButton = ({ type, onClick }) => {
    const config = {
      edit: { icon: Edit, color: 'text-blue-600 hover:text-blue-800', bg: 'hover:bg-blue-50' },
      delete: { icon: Trash2, color: 'text-red-600 hover:text-red-800', bg: 'hover:bg-red-50' },
      pause: { icon: Pause, color: 'text-yellow-600 hover:text-yellow-800', bg: 'hover:bg-yellow-50' },
      play: { icon: Play, color: 'text-green-600 hover:text-green-800', bg: 'hover:bg-green-50' }
    };
    
    const { icon: Icon, color, bg } = config[type];
    
    return (
      <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-all duration-200 ${color} ${bg}`}
      >
        <Icon size={16} />
      </button>
    );
  };

  const StatusBadge = ({ status, type = 'default' }) => {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case 'active':
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'inactive':
        case 'failed':
          return 'bg-red-100 text-red-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
        {status}
      </span>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color, growth }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {growth && (
            <p className={`text-sm mt-1 ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth > 0 ? '+' : ''}{growth}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => { setModalType('business'); setShowAddModal(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>ADD NEW BUSINESS</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Business"
          value={stats.totalBusiness}
          icon={Building2}
          color="bg-blue-500"
          growth={8.2}
        />
        <StatCard
          title="Active"
          value={stats.active}
          icon={Users}
          color="bg-green-500"
          growth={5.4}
        />
        <StatCard
          title="Inactive"
          value={stats.inactive}
          icon={Users}
          color="bg-red-500"
          growth={-2.1}
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}
          icon={TrendingUp}
          color="bg-purple-500"
          growth={stats.monthlyGrowth}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Requests</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">New Business Applications</p>
                <p className="text-sm text-gray-600">12 applications awaiting review</p>
              </div>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Employee Verifications</p>
                <p className="text-sm text-gray-600">8 verifications pending</p>
              </div>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Payment Approvals</p>
                <p className="text-sm text-gray-600">25 payments awaiting approval</p>
              </div>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">25</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-left">
              <FileText className="text-blue-600 mb-2" size={20} />
              <p className="font-medium text-gray-900">Generate Report</p>
              <p className="text-xs text-gray-600">Monthly analytics</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 text-left">
              <Download className="text-green-600 mb-2" size={20} />
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-xs text-gray-600">CSV, Excel formats</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 text-left">
              <Users className="text-purple-600 mb-2" size={20} />
              <p className="font-medium text-gray-900">Team Performance</p>
              <p className="text-xs text-gray-600">View metrics</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200 text-left">
              <TrendingUp className="text-orange-600 mb-2" size={20} />
              <p className="font-medium text-gray-900">Revenue Analysis</p>
              <p className="text-xs text-gray-600">Detailed insights</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by Name/Number/GST number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Between</span>
                <input
                  type="date"
                  defaultValue="2025-02-01"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-sm text-gray-600">To</span>
                <input
                  type="date"
                  defaultValue="2025-02-28"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR. NO.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FIRM DETAILS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST DETAILS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUBSCRIPTION DETAILS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAYMENT SUMMARY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ENROLLMENT DETAILS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businesses.map((business, index) => (
                <tr key={business.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1})</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                        {business.name}
                      </div>
                      <div className="text-sm text-gray-500">{business.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{business.gst}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={business.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{business.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{business.enrollmentType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <ActionButton type="edit" onClick={() => {}} />
                      <ActionButton type="delete" onClick={() => {}} />
                      <ActionButton type="pause" onClick={() => {}} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => { setModalType('employee'); setShowAddModal(true); }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>ADD EMPLOYEE</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by Name/Number/ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Between</span>
                <input
                  type="date"
                  defaultValue="2025-02-01"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-sm text-gray-600">To</span>
                <input
                  type="date"
                  defaultValue="2025-02-28"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR. NO.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMPLOYEE DETAILS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CITY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JOINING DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COUNT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SALARY DETAILS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee, index) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1})</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                      {employee.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    {employee.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.joiningDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    {employee.salary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <ActionButton type="edit" onClick={() => {}} />
                      <ActionButton type="delete" onClick={() => {}} />
                      <ActionButton type="pause" onClick={() => {}} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Revenue Analytics</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}
          icon={TrendingUp}
          color="bg-green-500"
          growth={stats.monthlyGrowth}
        />
        <StatCard
          title="Monthly Revenue"
          value="₹3.2L"
          icon={CreditCard}
          color="bg-blue-500"
          growth={8.5}
        />
        <StatCard
          title="Average Deal Size"
          value="₹18,500"
          icon={Building2}
          color="bg-purple-500"
          growth={4.2}
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.active}
          icon={Users}
          color="bg-orange-500"
          growth={6.8}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{transaction.businessName}</p>
                  <p className="text-sm text-gray-600">{transaction.type} • {transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
                  <StatusBadge status={transaction.status} type="transaction" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subscription Revenue</span>
              <span className="font-semibold text-gray-900">₹8.5L (68%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Commission Revenue</span>
              <span className="font-semibold text-gray-900">₹2.8L (22%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '22%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Other Revenue</span>
              <span className="font-semibold text-gray-900">₹1.2L (10%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AddModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New {modalType === 'business' ? 'Business' : 'Employee'}
          </h3>
          <button
            onClick={() => setShowAddModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          {modalType === 'business' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter GST number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>CASH</option>
                  <option>UPI</option>
                  <option>BANK_TRANSFER</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>SALES</option>
                  <option>TEAM LEADER</option>
                  <option>MANAGER</option>
                  <option>ADMIN</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter salary amount"
                />
              </div>
            </>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add {modalType === 'business' ? 'Business' : 'Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="text-blue-600" size={32} />
                <h1 className="text-2xl font-bold text-gray-900">Super Admin</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Download size={20} />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">SA</span>
              </div>
            </div>
          </div>

          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'DASHBOARD', icon: TrendingUp },
              { id: 'transactions', label: 'TRANSACTIONS', icon: CreditCard },
              { id: 'team', label: 'TEAM', icon: Users },
              { id: 'revenue', label: 'REVENUE', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'team' && renderTeam()}
        {activeTab === 'revenue' && renderRevenue()}
      </div>

      {showAddModal && <AddModal />}
    </div>
  );
}

export default Superadmin;