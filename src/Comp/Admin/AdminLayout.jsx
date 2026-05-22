import axios from "axios";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handlelogout = async () => {
    await axios.post(
      "https://cattlemanagement.runasp.net/gaushala/Auth/Logout",
    );

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
       <div className="w-full md:w-[280px] bg-gradient-to-b from-blue-800 via-slate-700 to-indigo-700 text-white shadow-2xl">
        <div className="p-6 border-b border-green-500">
          <h2 className="text-3xl font-bold">Cattle Manager</h2>
          <p className="text-green-200 mt-3">Admin Dashboard</p>
        </div>

        <div  className="p-3 space-y-2">
          <Link
            to="/admin-dashboard"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-brands fa-dashcube"></i>
            Dashboard
          </Link>

          <Link
            to="/admin-dashboard/cows"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-cow"></i>
            Manage Cows
          </Link>

          <Link
            to="/admin-dashboard/cow-death"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-skull-crossbones"></i>
            Cow Death
          </Link>

          <Link
            to="/admin-dashboard/stock"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-warehouse"></i>
            Stock Management
          </Link>

          <Link
            to="/admin-dashboard/feed-plan"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-utensils"></i>
            Feed Plan
          </Link>

          <Link
            to="/admin-dashboard/intake"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-spoon"></i>
            Food Intake
          </Link>

          <Link
            to="/admin-dashboard/milk"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-wine-bottle"></i>
            Cow Milk
          </Link>

          <Link
            to="/admin-dashboard/sold"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-dollar-sign"></i>
            Cow Sold
          </Link>

          <Link
            to="/admin-dashboard/treatment"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-hospital"></i>
            Cow Treatment
          </Link>

          <Link
            to="/admin-dashboard/items"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-cube"></i>
            Items
          </Link>

          <Link
            to="/admin-dashboard/orders"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-file-invoice"></i>
            Orders
          </Link>

          <Link
            to="/admin-dashboard/reports"
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-chart-bar"></i>
            Reports
          </Link>

          <div
            onClick={handlelogout}
            className="flex items-center fs-5 gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300 text-lg font-medium no-underline text-white"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">
        {/* TOPBAR */}
       <div className="bg-white/50 backdrop-blur-md shadow-md px-4 md:px-8 py-5 flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

          <div className="flex items-center gap-6 text-gray-700 font-semibold">
            <div className="flex items-center gap-2 hover:text-green-700 cursor-pointer">
              <i className="fa-solid fa-bell"></i>
              Alerts
            </div>

            <div className="flex items-center gap-2 hover:text-green-700 cursor-pointer">
              <i className="fa-solid fa-gear"></i>
              Settings
            </div>
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
