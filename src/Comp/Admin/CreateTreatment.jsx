import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";

const CreateTreatment = () => {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [animalType, setAnimalType] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [form, setForm] = useState({
    AnimalType: "",
    AnimalId: "",
    TreatmentDate: "",
    DoctorName: "",
    Complain: "",
    TreatmentGiven: "",
    Expense: "",
    Remarks: "",
  });

  const getAnimalsByType = async (typeId) => {
    try {
      const res = await axiosInstance.get(
        `/gaushala/CowTreatment/GetAnimalsByType?animalType=${typeId}`,
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

      setAnimals(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/gaushala/CowTreatment/CreateOrUpdate", form, {
        withCredentials: true,
      });

      alert("Treatment Saved");

      navigate("/admin-dashboard/treatment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2 className="mb-4">Create Treatment</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Animal Type</label>

              <select
                className="form-select"
                value={animalType}
                onChange={(e) => {
                  const value = e.target.value;

                  setAnimalType(value);
                  setSelectedAnimal(null);

                  setForm({
                    ...form,
                    AnimalType: value,
                    AnimalId: "",
                  });

                  getAnimalsByType(value);
                }}
              >
                <option value="All">Select Option</option>
                <option value="cow">Cow</option>
                <option value="buffalo">Buffalo</option>

              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label>Owner Name</label>

              <select
                className="form-select"
                name="AnimalId"
                value={form.AnimalId}
                onChange={(e) => {
                  const id = e.target.value;

                  const animal = animals.find(
                    (item) => item.id.toString() === id,
                  );

                  setSelectedAnimal(animal);

                  setForm({
                    ...form,
                    AnimalId: id,
                  });
                }}
              >
                <option value="">Select Animal</option>

                {animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.registrationNumber || animal.name}
                  </option>
                ))}
              </select>
            </div>
            

            <div className="col-md-4 mb-3">
              <label>Treatment Date</label>


              <input
                type="date"
                className="form-control"
                name="TreatmentDate"
                value={form.TreatmentDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Doctor Name</label>

              <input
                type="text"
                className="form-control"
                name="DoctorName"
                value={form.DoctorName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label>Complain</label>

              <textarea
                className="form-control"
                rows="3"
                name="Complain"
                value={form.Complain}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-md-12 mb-3">
              <label>Treatment Given</label>

              <textarea
                className="form-control"
                rows="3"
                name="TreatmentGiven"
                value={form.TreatmentGiven}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-md-4 mb-3">
              <label>Expense</label>

              <input
                type="number"
                className="form-control"
                name="Expense"
                value={form.Expense}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-8 mb-3">
              <label>Remarks</label>

              <input
                type="text"
                className="form-control"
                name="Remarks"
                value={form.Remarks}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3 mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin-dashboard/treatment")}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTreatment;
