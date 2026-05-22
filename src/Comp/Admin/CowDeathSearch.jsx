import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const CowDeathSearch = () => {
  const [regNo, setRegNo] = useState("");
  const [cow, setCow] = useState(null);

  const navigate = useNavigate();

  const searchCow = async () => {
    const res = await axios.get(
      `https://cattlemanagement.runasp.net/gaushala/CowDeath/Create?registrationNo=${regNo}`,
    );

    console.log("API RESPONSE:", res.data);

    let apiData = res.data?.data || res.data;

    if (Array.isArray(apiData) && apiData.length > 0) {
      setCow(apiData[0]);
      return;
    }

    if (apiData && apiData.RegistrationNo) {
      setCow(apiData);
      return;
    }

    const localData = JSON.parse(localStorage.getItem("cattleData")) || [];

    const foundCow = localData.find(
      (item) =>
        item.RegistrationNo?.toLowerCase().trim() ===
        regNo.toLowerCase().trim(),
    );

    if (foundCow) {
      setCow(foundCow);
    } else {
      setCow(null);
      alert("Animal not found");
    }
  };
  return (
    <div className="p-5 min-h-screen">
      <div className=" rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-500 text-white px-3 py-4 text-2xl font-bold">
          Select Animal For Death Recording
        </div>
        <div className="p-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Registration Number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="border w-full p-3 rounded-4 shadow-sm"
            />

            <button
              onClick={searchCow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-4"
            >
              Search
            </button>
          </div>
          {cow && (
            <div className="mt-6 border border-red-100 rounded-4  p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-xl transition duration-300">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-circle bg-red-100 flex items-center justify-center">
                  <i className="fa-solid fa-cow text-danger fs-2"></i>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-600 mb-2">
                    {cow.Name}
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-pill fw-semibold">
                      Reg No : {cow.RegistrationNo}
                    </span>

                    <span
                      className={`px-3 py-2 rounded-pill fw-semibold ${
                        cow.AnimalType === "Cow"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cow.AnimalType}
                    </span>

                    <span className="bg-gray-100 text-dark px-3 py-2 rounded-pill fw-semibold">
                      DOB : {cow.Dob}
                    </span>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() =>
                  navigate("/cowdeath/record", {
                    state: cow,
                  })
                }
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-5 py-3 rounded-4 fw-bold shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-skull-crossbones me-2"></i>
                Record Death
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CowDeathSearch;
