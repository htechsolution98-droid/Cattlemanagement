import axiosInstance from "./api/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Sellrecord = () => {
  const [sellcow, setSellcow] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ================= GET SOLD DATA =================
  const getSoldData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/gaushala/CowSold/Index", {
        withCredentials: true,
      });

      console.log("getSoldData status:", res.status);
      console.log("getSoldData data:", res.data);

      let apiData = [];

      // CASE 1 - XML converted to JSON by interceptor
      if (res.data?.CowSoldViewModel) {
        apiData = Array.isArray(res.data.CowSoldViewModel)
          ? res.data.CowSoldViewModel
          : [res.data.CowSoldViewModel];
      }
      // CASE 2 - Direct array
      else if (Array.isArray(res.data)) {
        apiData = res.data;
      }
      // CASE 3 - Nested
      else if (Array.isArray(res.data?.data)) {
        apiData = res.data.data;
      }
      // CASE 4 - Single object
      else if (
        typeof res.data === "object" &&
        res.data !== null &&
        !Array.isArray(res.data)
      ) {
        // Check if it has known fields
        if (res.data.Id || res.data.Name) {
          apiData = [res.data];
        }
      }

      console.log("Final sell data:", apiData);
      setSellcow(apiData);
    } catch (error) {
      console.log("getSoldData ERROR:", error.response?.status, error.message);
      if (error.message !== "SESSION EXPIRED") {
        alert("Failed to load sold records");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSoldData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-3 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
          Cow Sold Records
        </h1>

        <button
          onClick={() => navigate("/admin-dashboard/sold/create")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-xl font-semibold"
        >
          + Add Record
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Animal Name</th>
                <th className="p-3 text-left">Animal Type</th>
                <th className="p-3 text-left">Sold Date</th>
                <th className="p-3 text-left">Sold Price</th>
                <th className="p-3 text-left">Buyer Name</th>
                <th className="p-3 text-left">Phone</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-5 text-blue-500 font-bold"
                  >
                    Loading...
                  </td>
                </tr>
              ) : sellcow.length > 0 ? (
                sellcow.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-slate-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item?.Name || "-"}</td>
                    <td className="p-3">{item?.AnimalType || "-"}</td>
                    <td className="p-3">
                      {item?.SoldDate
                        ? new Date(item.SoldDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3">₹ {item?.SoldPrice || "-"}</td>
                    <td className="p-3">{item?.SoldPersonName || "-"}</td>
                    <td className="p-3">{item?.SoldPersonPhoneNo || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-5 text-gray-500">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sellrecord;
