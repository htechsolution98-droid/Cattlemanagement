import axiosInstance from "./api/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CattleManagement = () => {
  const [cowList, setCowList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("All");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // ================= GET ALL DATA =================
  const getAllData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await axiosInstance.get("/gaushala/Cow/Index");

      console.log("FULL API RESPONSE =>", res);
      console.log("RESPONSE DATA =>", res.data);

      let apiData = [];

      // CASE 1 => Direct Array
      if (Array.isArray(res.data)) {
        apiData = res.data;
      }

      // CASE 2 => JSON Object
      else if (Array.isArray(res.data?.data)) {
        apiData = res.data.data;
      }

      // CASE 3 => XML Converted Object
      else if (res.data?.CowViewModel) {
        apiData = Array.isArray(res.data.CowViewModel)
          ? res.data.CowViewModel
          : [res.data.CowViewModel];
      }

      // CASE 4 => Single Object
      else if (typeof res.data === "object") {
        apiData = [res.data];
      }

      console.log("FINAL DATA =>", apiData);

      setCowList(apiData);
    } catch (error) {
      console.log("GET ERROR =>", error);

      if (error.response) {
        console.log("STATUS =>", error.response.status);
        console.log("ERROR DATA =>", error.response.data);
      }

      setErrorMessage("Failed To Load Data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  // ================= FILTER =================
  const filteredData =
    selectedAnimal === "All"
      ? cowList
      : cowList.filter(
          (item) =>
            item?.AnimalType?.toLowerCase() ===
            selectedAnimal.toLowerCase()
        );

  // ================= REMOVE =================
  const handleRemove = (index) => {
    const updatedData = cowList.filter((_, idx) => idx !== index);

    setCowList(updatedData);

    localStorage.setItem(
      "cattleData",
      JSON.stringify(updatedData)
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-gray-100">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <h2 className="text-3xl font-bold text-blue-500">
          Cattle Management
        </h2>

        {/* FILTER */}
        <select
          value={selectedAnimal}
          onChange={(e) => setSelectedAnimal(e.target.value)}
          className="border border-gray-300 p-2 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-purple-700"
        >
          <option value="All">All Animals</option>
          <option value="Cow">Cow</option>
          <option value="Buffalo">Buffalo</option>
        </select>

        {/* ADD BUTTON */}
        <button
          onClick={() =>
            navigate("/admin-dashboard/cows/create")
          }
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg transition duration-300 hover:scale-105"
        >
          + Add Cattle
        </button>
      </div>

      {/* ================= ERROR ================= */}
      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-4 font-semibold">
          {errorMessage}
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-slate-800 to-indigo-700 text-white">
              <th className="p-2 md:p-4 text-left font-semibold">
                ID
              </th>

              <th className="p-2 md:p-4 text-left font-semibold">
                Reg No
              </th>

              <th className="p-2 md:p-4 text-left font-semibold">
                Name
              </th>

              <th className="p-2 md:p-4 text-left font-semibold">
                Animal Type
              </th>

              <th className="p-2 md:p-4 text-left font-semibold">
                DOB
              </th>

              <th className="p-2 md:p-4 text-left font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {/* LOADING */}
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-blue-500 font-bold"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-indigo-50 transition duration-300"
                >
                  {/* ID */}
                  <td className="p-2 md:p-4 font-semibold text-gray-700">
                    {index + 1}
                  </td>

                  {/* REGISTRATION */}
                  <td className="p-2 md:p-4 font-semibold text-gray-700">
                    {item?.RegistrationNo || "-"}
                  </td>

                  {/* NAME */}
                  <td className="p-2 md:p-4 font-semibold text-gray-700">
                    {item?.Name || "-"}
                  </td>

                  {/* TYPE */}
                  <td className="p-2 md:p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item?.AnimalType === "Cow"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item?.AnimalType || "-"}
                    </span>
                  </td>

                  {/* DOB */}
                  <td className="p-2 md:p-4 font-semibold text-gray-700">
                    {item?.Dob
                      ? new Date(item.Dob).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* ACTION */}
                  <td className="p-2 md:p-4">
                    <div className="flex flex-col md:flex-row gap-2">
                      {/* VIEW */}
                      <button
                        onClick={() =>
                          navigate(
                            "/admin-dashboard/cows/create",
                            {
                              state: {
                                cowData: item,
                                editIndex: index,
                              },
                            }
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl transition duration-300 text-sm"
                      >
                        View
                      </button>

                      {/* REMOVE */}
                      <button
                        onClick={() => handleRemove(index)}
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
                  colSpan="6"
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