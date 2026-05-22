import axiosInstance from "./api/axiosInstance"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Sellrecord = () => {
  const [sellcow, setSellcow] = useState([]);
  const navigate = useNavigate();

  // ...existing code...
  const getSoldData = async () => {
    try {
      const res = await axiosInstance.get("/gaushala/CowSold/Index", {
        withCredentials: true,
      });

      console.log("getSoldData response", res.status, res.request?.responseURL, res.headers, res.data);

      if (res.status === 302 || (typeof res.data === "string" && res.data.trim().startsWith("<"))) {
        throw new Error("Server returned redirect or HTML instead of JSON. Check auth/endpoint.");
      }

      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setSellcow(data);
    } catch (error) {
      console.log("getSoldData error", error?.response?.status, error?.response?.data || error.message);

      const localData = JSON.parse(localStorage.getItem("soldData")) || [];
      setSellcow(localData);
    }
  };
// ...existing code...

  useEffect(() => {
    getSoldData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-3 md:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
          Cow Sold Records
        </h1>

        <button
          onClick={() => navigate("/sold/create")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Record
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Id</th>
                <th className="p-3 text-left">Animal Name</th>
                <th className="p-3 text-left">Animal Type</th>
                <th className="p-3 text-left">Sold Date</th>
                <th className="p-3 text-left">Sold Price</th>
                <th className="p-3 text-left">Person Name</th>
              </tr>
            </thead>

            <tbody>
              {sellcow.length > 0 ? (
                sellcow.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.Id}</td>
                    <td className="p-3">{item.Name}</td>
                    <td className="p-3">{item.AnimalType}</td>
                    <td className="p-3">{item.SoldDate}</td>
                    <td className="p-3">{item.SoldPrice}</td>
                    <td className="p-3">{item.SoldPersonName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-5">
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
