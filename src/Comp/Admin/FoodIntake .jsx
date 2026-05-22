import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FoodIntake = () => {
  const [animalType, setAnimalType] = useState("cow");

  const [foodData, setFoodData] = useState([]);

  const navigate = useNavigate();

  const getFoodData = async () => {
    try {
      const res = await axios.get(
        `https://cattlemanagement.runasp.net/gaushala/CowFoodIntake/Index?animalType=${animalType}`,
      );

      const apiData = Array.isArray(res.data) ? res.data : res.data?.data || [];

      const localData =
        JSON.parse(localStorage.getItem("foodIntakeData")) || [];

      setFoodData([...apiData, ...localData]);
    } catch (error) {
      console.log(error);

      const localData =
        JSON.parse(localStorage.getItem("foodIntakeData")) || [];

      setFoodData(localData);
    }
  };

  useEffect(() => {
    getFoodData();
  }, [animalType]);

  const handleDelete = (id) => {
    const oldData = JSON.parse(localStorage.getItem("foodIntakeData")) || [];

    const updatedData = oldData.filter((item) => item.id !== id);

    localStorage.setItem("foodIntakeData", JSON.stringify(updatedData));

    setFoodData(updatedData);
  };

  return (
    <div
      className="container-fluid p-2 p-md-4 min-vh-100"
      style={{
        background: "linear-gradient(135deg,#f1f5ff,#fdf2f8,#ecfeff)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="card shadow border-0 rounded-4 p-2 mb-4"
        style={{
          background: "#ffffff",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h2
            className="fw-bold mb-2 p-2"
            style={{
              color: "#4f46e5",
            }}
          >
            Cow Food Intake Records
          </h2>

          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
              style={{
                borderRadius: "12px",
                border: "1px solid #dbeafe",
                padding: "10px",
                minWidth: "180px",
              }}
            >
              <option value="All">Select Option</option>
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
            </select>

            <button
              className="btn btn-success p-2"
              onClick={getFoodData}
              style={{
                borderRadius: "12px",
                width: "150px",
                background: "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                border: "none",
              }}
            >
              Show
            </button>
          </div>

          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/create-food-intake")}
            style={{
              borderRadius: "12px",
              height: "46px",
              background: "linear-gradient(135deg,#06b6d4 0%, #3b82f6 100%)",
              border: "none",
            }}
          >
            + Add New Record
          </button>
        </div>
      </div>

      <div
      className="card shadow border-0 rounded-4 p-2 overflow-hidden"
        style={{
          background: "#ffffff",
        }}
      >
        <div className="table-responsive rounded-4">
          <table
            className="table table-bordered align-middle text-center"
            style={{ overflowX: "auto",}}
          >
            <thead
              style={{
                background: "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
              }}
            >
              <tr>
                <th
                  className="p-2 md:p-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                    color: "white",
                  }}
                >
                  ID
                </th>
                <th
                  className="p-2 md:p-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Animal Name
                </th>
                <th
                  className="p-2 md:p-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Date
                </th>
                <th
                  className="p-2 md:p-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Morning Food(kg)
                </th>
                <th
                  className="p-2 md:p-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Afternoon Food(kg)
                </th>
                <th
                  className="p-2 md:p-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Evening Food(kg)
                </th>
                <th
                  className="p-2 md:p-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Remark
                </th>
                <th
                  className="p-2 md:p-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {foodData.length > 0 ? (
                foodData.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <td
                      className="p-2 md:p-4"
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                      }}
                    >
                      {index + 1}
                    </td>

                    <td
                      className="p-2 md:p-4"
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                      }}
                    >
                      {item.AnimalName}
                    </td>

                    <td
                      className="p-2 md:p-4"
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                      }}
                    >
                      {item.RecordDate}
                    </td>

                    <td
                      className="p-2 md:p-4"
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                      }}
                    >
                      {item.MorningFoodKg}
                    </td>

                    <td
                      className="p-2 md:p-4"
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                      }}
                    >
                      {item.AfternoonFoodKg}
                    </td>

                    <td
                      className="p-2 md:p-4"
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                      }}
                    >
                      {item.EveningFoodKg}
                    </td>

                    <td
                      className="p-2 md:p-4"
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                      }}
                    >
                      {item.Remark}
                    </td>

                    <td className="p-2 md:p-4">
                      <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                        <button
                          className="btn btn-sm text-white px-2"
                          style={{
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg,#f59e0b,#f97316)",
                            border: "none",
                          }}
                          onClick={() =>
                            navigate("/create-food-intake", {
                              state: {
                                editData: item,
                              },
                            })
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm text-white px-3"
                          style={{
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg,#ef4444,#dc2626)",
                            border: "none",
                          }}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Records Found</td>
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
