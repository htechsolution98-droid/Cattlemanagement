import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handlelogout = async () => {
    await axios.post(
      "https://cattlemanagement.runasp.net/gaushala/Auth/Logout",
    );

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div>
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* TOTAL COWS */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center shadow-md">
            <i className="fa-solid fa-cow text-4xl text-white"></i>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-800">27</h2>
            <p className="text-gray-500 text-lg mt-1">Total Cows</p>
          </div>
        </div>

        {/* MILK */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
            <i className="fa-solid fa-wine-bottle text-4xl text-white"></i>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-800">150 L</h2>

            <p className="text-gray-500 text-lg mt-1">Milk Production</p>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Quick Actions</h2>

          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* CARD */}
          <Link
            to="/admin-dashboard/cows"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-indigo-500 hover:to-purple-600 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-cow text-4xl text-indigo-600 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Manage Cows
            </span>
          </Link>

          <Link
            to="/admin-dashboard/cow-death"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-pink-500 hover:to-rose-500 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-cart-shopping text-4xl text-pink-600 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Food Purchase
            </span>
          </Link>

          <Link
            to="/admin-dashboard/stock"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-cyan-500 hover:to-blue-500 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-warehouse text-4xl text-cyan-600 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Stock
            </span>
          </Link>

          <Link
            to="/admin-dashboard/feed-plan"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-yellow-400 hover:to-orange-500 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-utensils text-4xl text-yellow-500 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Cow Food
            </span>
          </Link>

          <Link
            to="/admin-dashboard/intake"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-green-500 hover:to-emerald-600 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-spoon text-4xl text-green-600 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Food Intake
            </span>
          </Link>

          <Link
            to="/admin-dashboard/milk"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-blue-500 hover:to-indigo-600 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-wine-bottle text-4xl text-blue-600 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Cow Milk
            </span>
          </Link>

          <Link
            to="/admin-dashboard/sold"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-emerald-500 hover:to-teal-600 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-dollar-sign text-4xl text-emerald-600 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Cow Sold
            </span>
          </Link>

          <Link
            to="/admin-dashboard/treatment"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-red-500 hover:to-pink-600 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-hospital text-4xl text-red-500 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Treatment
            </span>
          </Link>

          <Link
            to="/admin-dashboard/reports"
            className="bg-gradient-to-br from-white to-gray-50 hover:from-violet-500 hover:to-purple-600 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 no-underline border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-chart-bar text-4xl text-violet-600 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Reports
            </span>
          </Link>

          {/* LOGOUT */}
          <div
            onClick={handlelogout}
            className="bg-gradient-to-br from-white to-gray-50 hover:from-red-500 hover:to-rose-600 group rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:-translate-y-2"
          >
            <i className="fa-solid fa-right-from-bracket text-4xl text-red-500 group-hover:text-white transition"></i>

            <span className="text-gray-700 font-semibold text-lg group-hover:text-white transition text-center">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
