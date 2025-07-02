import React, { useState } from 'react';
import { 
  Share2, 
  Settings, 
  Eye, 
  Edit3,
  Package,
  ShoppingCart,
  BarChart3,
  ChevronRight,
  Clock,
  CheckCircle,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Search,
  Filter,
  ChevronDown,
  Plus,
  MoreHorizontal,
  CreditCard,
  Banknote,
  X,
  Save,
  Trash2,
  Edit,
  FileText,
  User,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const CashAndBanks = () => {
  const [orders] = useState([
    {
      id: "Order #1",
      status: "OPEN",
      items: 1,
      value: 20.00,
      time: "12:48 am",
      date: "14 March"
    },
    {
      id: "Order #2", 
      status: "OPEN",
      items: 2,
      value: 40.00,
      time: "12:54 am",
      date: "14 March"
    }
  ]);

  const [cashTransactions, setCashTransactions] = useState([
    {
      id: '1',
      type: 'Purchase',
      name: 'ram',
      date: '20/03/2024',
      time: '12:31 AM',
      amount: 5000.00,
      isPositive: false,
      description: 'Raw materials purchase',
      reference: 'PUR-001',
      customerDetails: {
        phone: '+91 9876543210',
        email: 'ram@supplier.com',
        address: '123 Industrial Area, Mumbai'
      }
    },
    {
      id: '2',
      type: 'Sale',
      name: 'NAITIK',
      date: '29/08/2024',
      time: '02:07 AM',
      amount: 1000.00,
      isPositive: true,
      description: 'Product sale',
      reference: 'SAL-002',
      customerDetails: {
        phone: '+91 9876543211',
        email: 'naitik@customer.com',
        address: '456 Residential Area, Delhi'
      }
    }
  ]);

  const [chequeTransactions, setChequeTransactions] = useState([
    {
      id: '1',
      type: 'Sale',
      name: 'CORPORATE CLIENT',
      date: '15/03/2024',
      time: '10:30 AM',
      amount: 25000.00,
      isPositive: true,
      description: 'Bulk order payment',
      reference: 'CHQ-001',
      customerDetails: {
        phone: '+91 9876543212',
        email: 'corporate@client.com',
        address: '789 Business District, Bangalore'
      },
      chequeDetails: {
        chequeNumber: 'CHQ123456',
        bankName: 'HDFC Bank',
        chequeDate: '15/03/2024',
        status: 'Cleared'
      }
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Calculate financial metrics
  const totalOrderValue = orders.reduce((sum, order) => sum + order.value, 0);
  const openOrders = orders.filter(order => order.status === 'OPEN').length;
  const storeViews = 34;
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.status === 'DELIVERED').length;
  const totalItems = 17;
  const todaysSale = orders
    .filter(order => order.date === new Date().toLocaleDateString())
    .reduce((sum, order) => sum + order.value, 0);

  const cashInHand = cashTransactions.reduce((total, transaction) => {
    return total + (transaction.isPositive ? transaction.amount : -transaction.amount);
  }, 3565.00);

  const chequeInHand = chequeTransactions.reduce((total, transaction) => {
    return total + (transaction.isPositive ? transaction.amount : -transaction.amount);
  }, 18500.00);

  const chartData = [0, 1, 0, 2, 1, 0, 1];
  const maxValue = Math.max(...chartData);

  // Helper functions
  const getTransactionColor = (type, isPositive) => {
    if (type === 'Purchase' || type === 'Expense' || type === 'Payment Made') return 'text-red-600';
    if (type === 'Sale' || type === 'Sale Order' || type === 'POS Sale' || type === 'Payment Received') return 'text-green-600';
    return 'text-gray-600';
  };

  const getTransactionIconColor = (type) => {
    switch (type) {
      case 'Purchase': return 'text-red-500';
      case 'Sale': return 'text-green-500';
      case 'Sale Order': return 'text-blue-500';
      case 'POS Sale': return 'text-purple-500';
      case 'Expense': return 'text-orange-500';
      case 'Payment Received': return 'text-emerald-500';
      case 'Payment Made': return 'text-rose-500';
      default: return 'text-gray-500';
    }
  };

  const getChequeStatusColor = (status) => {
    switch (status) {
      case 'Cleared': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Bounced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = (transactions) => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (transaction.reference && transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesFilter;
    });
  };

  const handleAddTransaction = (type, formData) => {
    const newTransaction = {
      id: Date.now().toString(),
      type: formData.type,
      name: formData.name,
      date: new Date(formData.date).toLocaleDateString('en-GB'),
      time: new Date().toLocaleTimeString('en-US', { hour12: true }),
      amount: parseFloat(formData.amount),
      isPositive: ['Sale', 'Sale Order', 'POS Sale', 'Payment Received'].includes(formData.type),
      description: formData.description,
      reference: formData.reference,
      customerDetails: {
        phone: formData.phone,
        email: formData.email,
        address: formData.address
      }
    };

    if (type === 'cheque') {
      newTransaction.chequeDetails = {
        chequeNumber: formData.chequeNumber,
        bankName: formData.bankName,
        chequeDate: formData.chequeDate,
        status: formData.chequeStatus || 'Pending'
      };
    }

    if (type === 'cash') {
      setCashTransactions([newTransaction, ...cashTransactions]);
    } else {
      setChequeTransactions([newTransaction, ...chequeTransactions]);
    }

    setShowAddModal(false);
  };

  const TransactionTable = ({ transactions, type }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {type === 'cash' ? (
              <Banknote className="text-green-600" size={24} />
            ) : (
              <CreditCard className="text-blue-600" size={24} />
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900 uppercase">
                {type} IN HAND
              </h2>
              <p className="text-2xl font-bold text-red-600 mt-1">
                ₹ {(type === 'cash' ? cashInHand : chequeInHand).toLocaleString()}.00
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={16} />
            Adjust {type === 'cash' ? 'Cash' : 'Cheque'}
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4">TRANSACTIONS</h3>
        
        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Sale">Sale</option>
            <option value="Purchase">Purchase</option>
            <option value="Sale Order">Sale Order</option>
            <option value="POS Sale">POS Sale</option>
            <option value="Expense">Expense</option>
            <option value="Payment Received">Payment Received</option>
            <option value="Payment Made">Payment Made</option>
          </select>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 uppercase tracking-wide pb-3">
          <div className="col-span-2 flex items-center gap-2">
            TYPE
            <Filter size={14} />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            NAME
            <Filter size={14} />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            DATE
            <ChevronDown size={14} />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            AMOUNT
            <Filter size={14} />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            REFERENCE
          </div>
          {type === 'cheque' && (
            <div className="col-span-1 flex items-center gap-2">
              STATUS
            </div>
          )}
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {filteredTransactions(transactions).map((transaction, index) => (
          <div key={transaction.id} className={`grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
            <div className="col-span-2 flex items-center gap-2">
              <span className={`${getTransactionIconColor(transaction.type)} text-lg`}>
                ●
              </span>
              <span className="text-sm font-medium text-gray-900">{transaction.type}</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-gray-900">{transaction.name}</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-gray-600">{transaction.date}, {transaction.time}</span>
            </div>
            <div className="col-span-2">
              <span className={`text-sm font-semibold ${getTransactionColor(transaction.type, transaction.isPositive)}`}>
                {transaction.isPositive ? '+' : '-'} ₹ {transaction.amount.toLocaleString()}.00
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-gray-600">{transaction.reference || '-'}</span>
            </div>
            {type === 'cheque' && (
              <div className="col-span-1">
                {transaction.chequeDetails?.status && (
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getChequeStatusColor(transaction.chequeDetails.status)}`}>
                    {transaction.chequeDetails.status}
                  </span>
                )}
              </div>
            )}
            <div className="col-span-1 flex justify-end gap-1">
              <button 
                onClick={() => {
                  setSelectedTransaction(transaction);
                  setShowDetailsModal(true);
                }}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="View Details"
              >
                <Eye size={14} />
              </button>
              <button 
                // onClick={() => setEditingTransaction(transaction)}
                className="text-gray-600 hover:text-gray-800 p-1"
                title="Edit"
              >
                <Edit size={14} />
              </button>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AddTransactionModal = ({ isOpen, onClose, type }) => {
    const [formData, setFormData] = useState({
      type: 'Sale',
      name: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      reference: '',
      phone: '',
      email: '',
      address: '',
      chequeNumber: '',
      bankName: '',
      chequeDate: '',
      chequeStatus: 'Pending'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddTransaction(type, formData);
      setFormData({
        type: 'Sale',
        name: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        reference: '',
        phone: '',
        email: '',
        address: '',
        chequeNumber: '',
        bankName: '',
        chequeDate: '',
        chequeStatus: 'Pending'
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Add {type === 'cash' ? 'Cash' : 'Cheque'} Transaction
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type *</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Sale">Sale</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Sale Order">Sale Order</option>
                  <option value="POS Sale">POS Sale</option>
                  <option value="Expense">Expense</option>
                  <option value="Payment Received">Payment Received</option>
                  <option value="Payment Made">Payment Made</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter description"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter reference number"
              />
            </div>

            {/* Customer Details */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Customer/Supplier Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address"
                  rows={2}
                />
              </div>
            </div>

            {/* Cheque Details */}
            {type === 'cheque' && (
              <div className="border-t pt-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Cheque Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cheque Number</label>
                    <input
                      type="text"
                      value={formData.chequeNumber}
                      onChange={(e) => setFormData({...formData, chequeNumber: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="CHQ123456"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="HDFC Bank"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cheque Date</label>
                    <input
                      type="date"
                      value={formData.chequeDate}
                      onChange={(e) => setFormData({...formData, chequeDate: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.chequeStatus}
                      onChange={(e) => setFormData({...formData, chequeStatus: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Cleared">Cleared</option>
                      <option value="Bounced">Bounced</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
    if (!isOpen || !transaction) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Transaction Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">Transaction Type</label>
                <div className="flex items-center gap-2">
                  <span className={`${getTransactionIconColor(transaction.type)} text-lg`}>
                    ●
                  </span>
                  <span className="text-lg font-medium text-gray-900">{transaction.type}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                <span className={`text-lg font-bold ${getTransactionColor(transaction.type, transaction.isPositive)}`}>
                  {transaction.isPositive ? '+' : '-'} ₹ {transaction.amount.toLocaleString()}.00
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <span className="text-gray-900">{transaction.name}</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">Date & Time</label>
                <span className="text-gray-900">{transaction.date}, {transaction.time}</span>
              </div>
            </div>

            {transaction.reference && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">Reference Number</label>
                <span className="text-gray-900">{transaction.reference}</span>
              </div>
            )}

            {transaction.description && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <span className="text-gray-900">{transaction.description}</span>
              </div>
            )}

            {/* Customer Details */}
            {transaction.customerDetails && (
              <div className="border-t pt-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <User size={20} />
                  Customer/Supplier Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transaction.customerDetails.phone && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <Phone size={14} />
                        Phone
                      </label>
                      <span className="text-gray-900">{transaction.customerDetails.phone}</span>
                    </div>
                  )}
                  
                  {transaction.customerDetails.email && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <Mail size={14} />
                        Email
                      </label>
                      <span className="text-gray-900">{transaction.customerDetails.email}</span>
                    </div>
                  )}
                </div>
                
                {transaction.customerDetails.address && (
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin size={14} />
                      Address
                    </label>
                    <span className="text-gray-900">{transaction.customerDetails.address}</span>
                  </div>
                )}
              </div>
            )}

            {/* Cheque Details */}
            {transaction.chequeDetails && (
              <div className="border-t pt-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard size={20} />
                  Cheque Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transaction.chequeDetails.chequeNumber && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Cheque Number</label>
                      <span className="text-gray-900">{transaction.chequeDetails.chequeNumber}</span>
                    </div>
                  )}
                  
                  {transaction.chequeDetails.bankName && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Bank Name</label>
                      <span className="text-gray-900">{transaction.chequeDetails.bankName}</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {transaction.chequeDetails.chequeDate && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Cheque Date</label>
                      <span className="text-gray-900">{transaction.chequeDetails.chequeDate}</span>
                    </div>
                  )}
                  
                  {transaction.chequeDetails.status && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getChequeStatusColor(transaction.chequeDetails.status)}`}>
                        {transaction.chequeDetails.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 pt-6 border-t mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // setEditingTransaction(transaction);
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Edit size={16} />
              Edit Transaction
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">My Online Store</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Share2 size={16} />
              Share Online Store
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('cash')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'cash'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Banknote size={16} />
              Cash Management
            </button>
            <button
              onClick={() => setActiveTab('cheque')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'cheque'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <CreditCard size={16} />
              Cheque Management
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <>
            {/* Store Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    DD
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">DD STOCK</h2>
                    <p className="text-gray-500 text-sm mb-2">Add description</p>
                    <div className="flex items-center gap-2 text-blue-600">
                      <span className="text-sm">https://nazdikwala.in/store/ddstock</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">23656</span>
                    </div>
                    <button className="text-blue-600 text-sm hover:text-blue-700 mt-1">
                      Get your own Website
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Eye size={16} />
                    Force Sync Up
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Eye size={16} />
                    Preview
                  </button>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit3 size={16} />
                    Edit Store Info
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Order Value Received */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-medium">Order Value Received</h3>
                  <DollarSign className="text-green-500" size={20} />
                </div>
                <div className="mb-4">
                  <p className="text-3xl font-bold text-gray-900">₹ {totalOrderValue.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1">Order value converted to Sale</p>
                  <p className="text-xs text-gray-500">₹ 0.00</p>
                </div>
                
                {/* Mini Chart */}
                <div className="flex items-end gap-1 h-12 mb-2">
                  {chartData.map((value, index) => (
                    <div key={index} className="flex-1 bg-gray-100 rounded-sm relative">
                      <div 
                        className="bg-green-500 rounded-sm transition-all duration-300"
                        style={{ 
                          height: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%`,
                          minHeight: value > 0 ? '4px' : '0px'
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Report: From 02 May to 09 May</p>
              </div>

              {/* Open Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-medium">Open Orders</h3>
                  <Clock className="text-orange-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-6">{openOrders}</p>
                <div className="space-y-3">
                  {orders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{order.id}</span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{order.time}, {order.date}</p>
                        <p className="text-sm font-medium">{order.items} items • ₹ {order.value.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Store View */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-medium">Store View</h3>
                  <Eye className="text-blue-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-4">{storeViews}</p>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <Share2 size={14} />
                  Share Store
                </button>
              </div>

              {/* Total Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
                  <ShoppingCart className="text-purple-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{totalOrders}</p>
                <p className="text-sm text-gray-600">Orders delivered: {deliveredOrders} Order</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Manage Items */}
                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <Package className="text-orange-600" size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">Manage Items</h4>
                      <p className="text-sm text-gray-600">Total Items added: {totalItems}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                </button>

                {/* Manage Orders */}
                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <ShoppingCart className="text-red-600" size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">Manage Orders</h4>
                      <p className="text-sm text-gray-600">Order delivered to date: {deliveredOrders}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                </button>

                {/* Store Reports */}
                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <BarChart3 className="text-blue-600" size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">Store Reports</h4>
                      <p className="text-sm text-gray-600">Today's Sale: ₹ {todaysSale.toFixed(2)}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'cash' && (
          <TransactionTable transactions={cashTransactions} type="cash" />
        )}

        {activeTab === 'cheque' && (
          <TransactionTable transactions={chequeTransactions} type="cheque" />
        )}
      </div>

      {/* Modals */}
      <AddTransactionModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        type={activeTab === 'cash' ? 'cash' : 'cheque'} 
      />
      
      <TransactionDetailsModal 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        transaction={selectedTransaction} 
      />
    </div>
  );
};

export default CashAndBanks;