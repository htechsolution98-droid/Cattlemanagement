import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlelogout = async () => {
    await axios.post(
      "https://cattlemanagement.runasp.net/gaushala/Auth/Logout",
    );
    localStorage.removeItem("token");
    navigate("/");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* OVERLAY (mobile) */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
    fixed md:static top-0 left-0
    h-screen w-[280px]
    bg-gradient-to-b from-blue-800 via-slate-700 to-indigo-700
    text-white shadow-2xl z-50

    flex flex-col
    overflow-y-auto
    scrollbar-thin scrollbar-thumb-white/30

    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-green-500 shrink-0">
          <h3 className="text-2xl font-bold">Cattle Manager</h3>
          <p className="text-green-200 mt-3">Admin Dashboard</p>
        </div>

        {/* LINKS */}
        <div className="p-3 space-y-1 flex-1">
          <Link
            to="/admin-dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-brands fa-dashcube"></i>
            Dashboard
          </Link>

          <Link
            to="/admin-dashboard/cows"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-cow"></i>
            Manage Cows
          </Link>

          <Link
            to="/admin-dashboard/cow-death"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-skull-crossbones"></i>
            Cow Death
          </Link>

          <Link
            to="/admin-dashboard/stock"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-warehouse"></i>
            Stock Management
          </Link>

          <Link
            to="/admin-dashboard/feed-plan"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-utensils"></i>
            Feed Plan
          </Link>

          <Link
            to="/admin-dashboard/intake"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-spoon"></i>
            Food Intake
          </Link>

          <Link
            to="/admin-dashboard/milk"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-wine-bottle"></i>
            Cow Milk
          </Link>

          <Link
            to="/admin-dashboard/sold"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-dollar-sign"></i>
            Cow Sold
          </Link>

          <Link
            to="/admin-dashboard/treatment"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-hospital"></i>
            Cow Treatment
          </Link>

          <Link
            to="/admin-dashboard/items"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-cube"></i>
            Items
          </Link>

          <Link
            to="/admin-dashboard/orders"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-file-invoice"></i>
            Orders
          </Link>

          <Link
            to="/admin-dashboard/reports"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      no-underline text-white"
          >
            <i className="fa-solid fa-chart-bar"></i>
            Reports
          </Link>

          {/* LOGOUT */}
          <div
            onClick={handlelogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
      hover:bg-white/20 transition duration-300 text-lg font-medium
      cursor-pointer text-white"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <div className="bg-white shadow px-4 py-4 flex items-center gap-3 shrink-0">
          {/* MENU BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 overflow-x-hidden overflow-y-auto min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
