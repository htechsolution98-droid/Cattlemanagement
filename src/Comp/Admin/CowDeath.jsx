import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CowDeath = () => {
  const [deaths, setDeaths] = useState([]);
  const navigate = useNavigate();

  const getDeaths = async () => {
    try {
      const res = await axios.get(
  "https://cattlemanagement.runasp.net/gaushala/CowDeath/Record",
  {
    withCredentials: true
  }
);

      console.log("API Response:", res.data);

      const result = res.data?.data || res.data?.$values || res.data || [];

      setDeaths(Array.isArray(result) ? result : []);
    } catch (error) {
      console.log("API Error:", error);
      setDeaths([]);
    }
  };
  useEffect(() => {
  getDeaths();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-wide">
            ☠ Death Records
          </h1>

          <p className="text-gray-600 mt-2 text-lg font-medium">
            Manage all dead animal records
          </p>
        </div>

        <button
          onClick={() => navigate("/cowdeath/search")}
          className="bg-slate-500 hover:bg-black text-white px-3 py-3 rounded-2xl shadow-xl text-lg font-bold transition duration-300"
        >
          + Add Record
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="bg-slate-900 text-white px-4 py-4 text-2xl font-bold tracking-wide">
          Animal Death History
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr className="text-slate-800 text-lg">
                <th className="p-2  md:p-4 text-left">Id</th>
                <th className="p-2  md:p-4 text-left">Cow Name</th>
                <th className="p-2  md:p-4 text-left">Registration No</th>
                <th className="p-2  md:p-4 text-left">Animal Type</th>
                <th className="p-2  md:p-4 text-left">Death Date</th>
                <th className="p-2  md:p-4 text-left">Reason</th>
                <th className="p-2  md:p-4 text-left">Disposal</th>
              </tr>
            </thead>

            <tbody>
              {deaths.length > 0 ? (
                deaths.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-b hover:bg-slate-50 transition duration-200"
                  >
                    <td className="p-3">{item.id || item.Id}</td>
                    <td className="p-3">{item.cowName || item.CowName}</td>
                    <td className="p-3">
                      {item.registrationNo || item.RegistrationNo}
                    </td>
                    <td className="p-3">{item.animalType ||item.AnimalType}</td>
                    <td className="p-3">{item.deathDate ||item.DeathDate}</td>
                    <td className="p-3">{item.reason ||item.Reason}</td>
                    <td className="p-3">{item.disposalMethod||item.DisposalMethod}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-16 text-gray-500 text-2xl font-semibold"
                  >
                    No Death Records Found
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

export default CowDeath;
