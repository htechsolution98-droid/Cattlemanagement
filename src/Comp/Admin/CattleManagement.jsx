import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CattleManagement = () => {
  const [cowList, setCowList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("All");
  const navigate = useNavigate();

  const getAllData = async () => {
    try {
      const res = await axios.get(
        "https://cattlemanagement.runasp.net/gaushala/Cow/CowDetails",
      );

      const apiData = Array.isArray(res.data) ? res.data : res.data?.data || [];

      const localData = JSON.parse(localStorage.getItem("cattleData")) || [];

      const finalData = [...apiData, ...localData];

      setCowList(finalData);
    } catch (error) {
      console.log(error);

      const localData = JSON.parse(localStorage.getItem("cattleData")) || [];

      setCowList(localData);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  const filteredData =
    selectedAnimal === "All"
      ? cowList
      : cowList.filter(
          (item) =>
            item.AnimalType?.toLowerCase() === selectedAnimal.toLowerCase(),
        );

  return (
    <div className="bg-white rounded-3xl shadow-xl  p-4 md:p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <h2 className="text-3xl font-bold text-blue-500">Cattle Management</h2>
        <select
          value={selectedAnimal}
          onChange={(e) => setSelectedAnimal(e.target.value)}
          className="border border-gray-300 p-2 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-purple-700"
        >
          <option value="All">All Animals</option>
          <option value="Cow">Cow</option>
          <option value="Buffalo">Buffalo</option>
        </select>
        <button
          onClick={() => navigate("/cows/create")}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg transition duration-300 hover:scale-105"
        >
          + Add Cattle
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className=" w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-slate-800 to-indigo-700 text-white">
              <th className="p-2 md:p-4  text-left font-semibold">ID</th>
              <th className="p-2 md:p-4 text-left font-semibold">Reg No</th>
              <th className="p-2 md:p-4 text-left font-semibold">Name</th>
              <th className="p-2 md:p-4 text-left font-semibold">
                Animal Type
              </th>
              <th className="p-2 md:p-4 text-left font-semibold">DOB</th>
              <th className="p-2 md:p-4 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-indigo-50 transition duration-300"
                >
                  <td className="p-2 md:p-4 font-semibold text-gray-700">
                    {index + 1}
                  </td>
                  <td className="p-2 md:p-4 font-semibold text-gray-700">
                    {item.RegistrationNo}
                  </td>
                  <td className="p-2 md:p-4 font-semibold text-gray-700">
                    {item.Name}
                  </td>

                  <td className="p-2 md:p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.AnimalType === "Cow"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.AnimalType}
                    </span>
                  </td>

                  <td className="p-2 md:p-4 font-semibold text-gray-700">
                    {item.Dob}
                  </td>

                  <td className="p-2 md:p-4">
                    <div className="flex flex-col md:flex-row gap-2">
                      <button
                        onClick={() =>
                          navigate("/cows/create", {
                            state: {
                              cowData: item,
                              editIndex: index,
                            },
                          })
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl transition duration-300 text-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          const updatedData = cowList.filter(
                            (_, idx) => idx !== index,
                          );

                          setCowList(updatedData);

                          localStorage.setItem(
                            "cattleData",
                            JSON.stringify(updatedData),
                          );
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl transition duration-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CattleManagement;
