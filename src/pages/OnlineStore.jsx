import React, { useState, useEffect } from 'react';
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
  LogOut
} from 'lucide-react';
import {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout
} from '../firebase'; // Import Firebase functions
import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {'OPEN' | 'DELIVERED' | 'PENDING'} status
 * @property {number} items
 * @property {number} value
 * @property {string} time
 * @property {string} date
 */

function OnlineStore() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalOrderValue, setTotalOrderValue] = useState(0);
  const [storeViews, setStoreViews] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch orders and user data from Firebase
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchStoreData(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const fetchStoreData = async (userId) => {
    try {
      // Set up real-time listener for orders
      const ordersQuery = collection(db, 'users', userId, 'orders');
      const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
        
        // Calculate total order value
        const totalValue = ordersData.reduce((sum, order) => sum + order.value, 0);
        setTotalOrderValue(totalValue);
      });

      // Fetch store stats (simplified example)
      const statsDoc = await getDocs(collection(db, 'users', userId, 'stats'));
      if (!statsDoc.empty) {
        const statsData = statsDoc.docs[0].data();
        setStoreViews(statsData.views || 0);
        setTotalItems(statsData.totalItems || 0);
      }

      setLoading(false);
      return () => {
        unsubscribeOrders();
      };
    } catch (error) {
      console.error("Error fetching store data:", error);
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.newUser) {
        // New user - initialize their store data
        await initializeStoreData(result.data.uid);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const initializeStoreData = async (userId) => {
    try {
      // Add default stats
      await addDoc(collection(db, 'users', userId, 'stats'), {
        views: 0,
        totalItems: 0
      });
      
      // Add sample orders
      const sampleOrders = [
        {
          status: "OPEN",
          items: 1,
          value: 20.00,
          time: "12:48 am",
          date: "14 March"
        },
        {
          status: "OPEN",
          items: 2,
          value: 40.00,
          time: "12:54 am",
          date: "14 March"
        }
      ];
      
      for (const order of sampleOrders) {
        await addDoc(collection(db, 'users', userId, 'orders'), order);
      }
    } catch (error) {
      console.error("Error initializing store data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to Your Store Dashboard</h1>
          <p className="text-gray-600 mb-8 text-center">
            Sign in to manage your online store and view analytics.
          </p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const openOrders = orders.filter(order => order.status === 'OPEN').length;
  const deliveredOrders = orders.filter(order => order.status === 'DELIVERED').length;
  const todaysSale = orders
    .filter(order => order.date === new Date().toLocaleDateString())
    .reduce((sum, order) => sum + order.value, 0);

  const chartData = [0, 1, 0, 2, 1, 0, 1]; // Sample data - would come from Firebase in real OnlineStore
  const maxValue = Math.max(...chartData);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">My Online Store</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-800">
                  {user.displayName ? user.displayName.charAt(0) : 'U'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Store Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'ST'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user.displayName || `${user.email}'s Store`}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {user.email}
                </p>
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="text-sm">https://nazdikwala.in/store/ddstock</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {user.uid.substring(0, 5)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
              <p className="text-xs text-gray-500 mt-1">Total order value</p>
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
          </div>

          {/* Open Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Open Orders</h3>
              <Clock className="text-orange-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-6">{openOrders}</p>
            <div className="space-y-3">
              {orders.filter(o => o.status === 'OPEN').slice(0, 2).map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">Order #{index + 1}</span>
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
              <h3 className="text-gray-600 text-sm font-medium">Store Views</h3>
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
            <p className="text-3xl font-bold text-gray-900 mb-2">{orders.length}</p>
            <p className="text-sm text-gray-600">Orders delivered: {deliveredOrders}</p>
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
                  <p className="text-sm text-gray-600">Total Items: {totalItems}</p>
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
                  <p className="text-sm text-gray-600">Orders: {orders.length}</p>
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
      </div>
    </div>
  );
}

export default OnlineStore;