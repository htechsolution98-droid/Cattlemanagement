import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";
import { useNavigate } from "react-router";

const TreatmentList = () => {
  const [treatments, setTreatments] = useState([]);
  const [animalType, setAnimalType] = useState("cow");
  const navigate = useNavigate();
  const getTreatments = async () => {
    const res = await axiosInstance.get('/gaushala/CowTreatment/Index', {
      withCredentials: true,
    });
    console.log(res.data);
    setTreatments(res.data || []);
  };
  useEffect(() => {
    getTreatments(animalType);
  }, []);
  return (
    <div className="container p-2">
      <div className="d-flex p-2 justify-content-between align-items-center mb-4">
        <h2>Animal Treatments</h2>

        <div className="flex gap-3">
          <select
            className="form-select"
            value={animalType}
            onChange={(e) => {
              setAnimalType(e.target.value);
              getTreatments(e.target.value);
            }}
          >
            <option value="all">Select Animal</option>
            <option value="cow">Cow</option>
            <option value="buffalo">Buffalo</option>
          </select>

          <button
            className="btn btn-success p-2 " style={{width:"100pxs"}}
            onClick={() => navigate("/admin-dashboard/create-treatment")}
          >
            Create Treatment
          </button>
        </div>
      </div>

      <div className="card p-3">
        <table className="table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Animal</th>
              <th>Date</th>
              <th>Complain</th>
              <th>Doctor</th>
              <th>Expense</th>
            </tr>
          </thead>

          <tbody>
            {treatments.length > 0 ? (
              treatments.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    {item.registrationNumber || item.cowRegistrationNumber}
                  </td>
                  <td>
                    {item.animalType || item.AnimalType}
                  </td>
                  <td>{item.treatmentDate}</td>

                  <td>{item.complain}</td>

                  <td>{item.doctorName}</td>

                  <td>{item.expense}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreatmentList;
