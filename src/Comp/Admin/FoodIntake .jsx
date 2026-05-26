import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";

const FoodIntake = () => {
  const [animalType, setAnimalType] = useState("cow");
  const [foodData, setFoodData] = useState([]);

  const navigate = useNavigate();

  // GET DATA
  const getFoodData = async () => {
    const res = await axiosInstance.get(
      `/gaushala/CowFoodIntake/Index?AnimalType=${animalType}`,
    );

    const apiData = Array.isArray(res.data) ? res.data : res.data?.data || [];

    setFoodData([...apiData]);
  };

  useEffect(() => {
    getFoodData();
  }, [animalType]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.post("/gaushala/CowFoodIntake/Delete", {
        Id: id,
      });

      alert("Record Deleted");

      getFoodData();
    } catch (error) {
      console.log(error);

      alert("Delete API Error");
    }
  };

  return (
    <div className="container-fluid p-3 min-vh-100 bg-light">
      {/* HEADER */}
      <div className="bg-white shadow rounded-4 p-3 mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <h3 className="fw-bold text-primary m-0">Cow Food Intake Records</h3>

          <div className="d-flex gap-2 flex-wrap">
            <select
              className="form-select"
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
              style={{ minWidth: "160px" }}
            >
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
            </select>

            <button className="btn btn-primary" onClick={getFoodData}>
              Show
            </button>

            <button
              className="btn btn-success"
              onClick={() => navigate("/admin-dashboard/create-food-intake")}
            >
              + Add New
            </button>
          </div>
        </div>
      </div>

      {/* TABLE WRAPPER (IMPORTANT FIX) */}
      <div className="bg-white shadow rounded-4 p-2">
        {/* SCROLL WRAPPER */}
        <div className="w-full overflow-x-auto">
          <table
            className="table table-bordered align-middle text-center w-full"
            style={{
              tableLayout: "fixed", 
              minWidth: "800px",
            }}
          >
            <thead className="table-dark">
              <tr>
                <th style={{ width: "50px" }}>ID</th>
                <th>Animal Name</th>
                <th>Date</th>
                <th>Morning</th>
                <th>Afternoon</th>
                <th>Evening</th>
                <th>Remark</th>
                <th style={{ width: "120px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {foodData.length > 0 ? (
                foodData.map((item, index) => (
                  <tr key={index}>
                    <td style={{ fontSize: "13px" }}>{index + 1}</td>

                    <td
                      style={{
                        fontSize: "13px",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.AnimalName}
                    </td>

                    <td style={{ fontSize: "13px" }}>{item.RecordDate}</td>

                    <td style={{ fontSize: "13px" }}>{item.MorningFoodKg}</td>

                    <td style={{ fontSize: "13px" }}>{item.AfternoonFoodKg}</td>

                    <td style={{ fontSize: "13px" }}>{item.EveningFoodKg}</td>

                    <td
                      style={{
                        fontSize: "13px",
                        wordBreak: "break-word",
                        maxWidth: "180px",
                      }}
                    >
                      {item.Remark}
                    </td>

                    <td>
                      <div className="d-flex gap-1 justify-content-center flex-wrap">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            navigate("/admin-dashboard/create-food-intake", {
                              state: { editData: item },
                            })
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.Id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-3">
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

export default FoodIntake;
