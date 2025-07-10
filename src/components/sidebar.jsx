import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Banknote,
  BarChart3,
  RefreshCw,
  Wrench,
  Settings,
  Crown,
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  User,
  Building2,
  Menu,
  X
} from "lucide-react";

export default function Sidebar({ part, subpart, data = null }) {
  const Navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (part === "sale") {
      setIsDropdownOpen("sales");
    }
  }, [part]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Home",
      icon: Home,
      path: "/",
      active: part === "dashboard"
    },
    {
      id: "parties",
      label: "Parties",
      icon: Users,
      path: "/parties",
      active: part === "parties",
      hasAdd: true,
      addPath: "/AddParties"
    },
    {
      id: "items",
      label: "Items",
      icon: Package,
      path: "/items",
      active: part === "items",
      hasAdd: true,
      addPath: "/add-items"
    },
    {
      id: "sale",
      label: "Sale",
      icon: DollarSign,
      active: part === "sale",
      hasDropdown: true,
      dropdownId: "sales",
      children: [
        { label: "Sale Invoice", path: "/sale-invoice", subpart: "sale-invoice" },
        { label: "Estimation", path: "/estimation", subpart: "estimation", condition: data?.settings?.estmateQ },
        { label: "Payment In", path: "/payment-in", subpart: "payment-in" },
        { label: "Sales Order", path: "/sales-order", subpart: "sales-order", condition: data?.settings?.saleOrder },
        { label: "Delivery Chalan", path: "/delivery-chalan", subpart: "delivery-chalan", condition: data?.settings?.chalan },
        { label: "Sales Return", path: "/sales-return", subpart: "sales-return" }
      ]
    },
    {
      id: "purchase",
      label: "Purchase & Expense",
      icon: ShoppingCart,
      active: part === "purchase",
      hasDropdown: true,
      dropdownId: "purchase",
      children: [
        { label: "Purchase Bill", path: "/purchase-bill", subpart: "purchase-bill" },
        { label: "Purchase Order", path: "/purchase-order", subpart: "purchase-order" },
        { label: "Payment Out", path: "/payment-out", subpart: "payment-out" },
        { label: "Purchase Return", path: "/purchase-return", subpart: "purchase-return" }
      ]
    },
    {
      id: "billing",
      label: "Grow Your Business",
      icon: TrendingUp,
      path: "/quick-billing",
      active: part === "billing"
    },
    {
      id: "cashAndBank",
      label: "Cash & Bank",
      icon: Banknote,
      path: "/cash-and-bank",
      active: part === "cashAndBank",
      hasDropdown: true,
      dropdownId: "cash",
      children: [
        { label: "Coming Soon", path: "/cash-and-bank", subpart: "cash-and-bank" }
      ]
    },
    {
      id: "report",
      label: "Reports",
      icon: BarChart3,
      path: "/report",
      active: part === "report"
    },
    {
      id: "sync-n-share",
      label: "Sync, Share & Backup",
      icon: RefreshCw,
      hasDropdown: true,
      dropdownId: "sync",
      children: [
        { label: "Sync & Share", path: "/sync-n-share", subpart: "sync-n-share" },
        { label: "Backup/Restore", path: "/backup-n-restore", subpart: "backup-n-restore" },
        { label: "My Online Store", path: "/my-online-store", subpart: "my-online-store" }
      ]
    },
    {
      id: "utils",
      label: "Utilities",
      icon: Wrench,
      active: part === "utils",
      hasDropdown: true,
      dropdownId: "utils",
      children: [
        { label: "Generate Barcode", path: "/barcodeMaker", subpart: "generate-barcode" },
        { label: "Import Items", path: "/import-items", subpart: "import-items" },
        { label: "Bulk Update Items", path: "/bulk-update-items", subpart: "bulk-update-items" },
        { label: "Import Parties", path: "/import-parties", subpart: "import-parties" },
        { label: "Verify My Data", path: "/check-data", subpart: "verify-my-data" },
        { label: "Export Items", path: "/export-items", subpart: "export-items" }
      ]
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/settings",
      active: part === "settings"
    },
    {
      id: "superadmin",
      label: "Plans & Pricing",
      icon: Crown,
      path: "/superadmin",
      active: part === "superadmin"
    }
  ];

  const handleDropdownToggle = (dropdownId) => {
    if (isCollapsed) return; // Don't open dropdowns when collapsed
    setIsDropdownOpen(isDropdownOpen === dropdownId ? "" : dropdownId);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setIsDropdownOpen(""); // Close all dropdowns when collapsing
    }
  };

  const renderMenuItem = (item) => {
    const IconComponent = item.icon;
    const isOpen = !isCollapsed && isDropdownOpen === item.dropdownId;

    if (item.hasDropdown) {
      return (
        <div key={item.id} className="mb-1">
          <button
            onClick={() => handleDropdownToggle(item.dropdownId)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left text-gray-300 hover:bg-slate-700 hover:text-white transition-colors rounded-lg group ${
              item.active ? 'bg-slate-700 text-white' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <IconComponent className="w-5 h-5" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </div>
            {!isCollapsed && (isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            ))}
          </button>
          
          {/* Dropdown Menu */}
          <div className={`overflow-hidden transition-all duration-200 ${isOpen && !isCollapsed ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-8 mt-1 space-y-1">
              {item.children?.map((child) => {
                if (child.condition === false) return null;
                return (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={`block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors ${
                      subpart === child.subpart ? 'text-white bg-slate-700' : ''
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={item.id} className="mb-1">
        <Link
          to={item.path}
          className={`flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors rounded-lg group ${
            item.active ? 'bg-slate-700 text-white' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <IconComponent className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </div>
          {item.hasAdd && !isCollapsed && (
            <Link
              to={item.addPath}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600 rounded transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Plus className="w-4 h-4" />
            </Link>
          )}
        </Link>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full bg-slate-800 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-white">Menu</h2>
        )}
        <button
          onClick={handleToggleCollapse}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-gray-300" />
          ) : (
            <X className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Open Anything (Ctrl+F)"
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Collapsed Search Icon */}
      {isCollapsed && (
        <div className="p-4 border-b border-slate-700 flex justify-center">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>

      {/* Trial Banner */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-4 mb-4">
            <div className="text-white">
              <p className="text-sm font-medium mb-1">4 days Free Trial left</p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                <div className="bg-white h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <button
                onClick={() => Navigate("/check-plan")}
                className="w-full bg-white text-orange-600 font-medium py-2 px-4 rounded-md text-sm hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span>Get Vyapar Gold</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Trial Icon */}
      {isCollapsed && (
        <div className="p-4 border-t border-slate-700 flex justify-center">
          <button
            onClick={() => Navigate("/check-plan")}
            className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg hover:opacity-80 transition-opacity"
          >
            <Crown className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {/* Company Profile */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={() => Navigate("/profile")}
          className={`w-full flex items-center space-x-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">
                  {data?.BusinessName || "Business Name"}
                </p>
                <p className="text-xs text-gray-400">My Company</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}