import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";

const CreateFoodIntake = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const editData = location.state?.editData;

  const [animalList, setAnimalList] = useState([]);

  const [form, setForm] = useState(
    editData || {
      AnimalID: "",
      AnimalName: "",
      AnimalType: "cow",
      RecordDate: "",
      MorningFoodKg: "",
      AfternoonFoodKg: "",
      EveningFoodKg: "",
      Remark: "",
    },
  );

  const getAnimals = async (type) => {
    try {
      const res = await axiosInstance.get(
        `/gaushala/CowFoodIntake/GetAnimalsByType?animalType=${type}`,
      );

      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

      setAnimalList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnimals(form.AnimalType);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnimalSelect = (e) => {
    const selectedId = e.target.value;

    const selectedAnimal = animalList.find(
      (item) => (item.id || item.Id) == selectedId,
    );

    setForm({
      ...form,

      AnimalID: selectedId,

      AnimalName:
        selectedAnimal?.name ||
        selectedAnimal?.Name ||
        selectedAnimal?.animalName ||
        selectedAnimal?.AnimalName ||
        "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        Id: editData?.Id || 0,

        AnimalId: form.AnimalID,

        AnimalName: form.AnimalName,

        AnimalType: form.AnimalType,

        RecordDate: form.RecordDate,

        MorningFoodKg: form.MorningFoodKg,

        AfternoonFoodKg: form.AfternoonFoodKg,

        EveningFoodKg: form.EveningFoodKg,

        Remark: form.Remark,
      };

      console.log("SAVE PAYLOAD:", payload);

      const res = await axiosInstance.post(
        "/gaushala/CowFoodIntake/Save",
        payload,
      );

      console.log("SAVE RESPONSE:", res.data);

      alert(
        editData
          ? "Food Intake Updated Successfully"
          : "Food Intake Saved Successfully",
      );

      navigate("/admin-dashboard/intake");
    } catch (error) {
      console.log(error);

      alert("Save API Error");
    }
  };
  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f1f5ff,#fdf2f8,#ecfeff)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div
            className="card border-0 shadow-lg overflow-hidden"
            style={{
              borderRadius: "30px",
              background: "#fff",
            }}
          >
            <div
              className="text-white p-3"
              style={{
                background:
                  "linear-gradient(135deg,#667eea 0%, #764ba2 50%, #ff758c 100%)",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-white d-flex justify-content-center align-items-center"
                  style={{
                    width: "70px",
                    height: "50px",
                    borderRadius: "18px",
                    fontSize: "30px",
                  }}
                >
                  🐄
                </div>

                <div>
                  <h2 className="fw-bold mb-1">
                    {editData ? "Edit Food Intake" : "Add Food Intake"}
                  </h2>

                  <p className="mb-0 opacity-75">
                    Manage Daily Animal Food Intake
                  </p>
                </div>
              </div>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSave}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold mb-2 text-secondary ms-2">
                      Animal Type
                    </label>

                    <select
                      className="form-select form-select-lg shadow-sm"
                      name="AnimalType"
                      value={form.AnimalType}
                      onChange={(e) => {
                        handleChange(e);
                        getAnimals(e.target.value);
                      }}
                      style={{
                        borderRadius: "14px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                      }}
                    >
                      <option value="All">Select Option</option>
                      <option value="cow">Cow</option>
                      <option value="buffalo">Buffalo</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold mb-2 text-secondary ms-2">
                      Select Animal
                    </label>

                    <select
                      className="form-select form-select-lg shadow-sm"
                      value={form.AnimalID}
                      onChange={handleAnimalSelect}
                      style={{
                        borderRadius: "14px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                      }}
                    >
                      <option value="">-- Select Animal --</option>

                      {animalList.map((item, index) => (
                        <option key={index} value={item.id || item.Id}>
                          {item.name ||
                            item.Name ||
                            item.animalName ||
                            item.AnimalName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 mb-4">
                    <label className="fw-semibold mb-2 text-secondary ms-2">
                      Record Date
                    </label>

                    <input
                      type="date"
                      className="form-control form-control-lg shadow-sm"
                      name="RecordDate"
                      value={form.RecordDate}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "14px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                      }}
                    />
                  </div>

                  <div className="col-md-4 mb-4">
                    <label className="fw-semibold mb-2 text-secondary ms-2">
                      Morning Food (Kg)
                    </label>

                    <input
                      type="number"
                      className="form-control form-control-lg shadow-sm ms-2"
                      name="MorningFoodKg"
                      value={form.MorningFoodKg}
                      onChange={handleChange}
                      required
                      placeholder="Enter Morning Food"
                      style={{
                        borderRadius: "14px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                      }}
                    />
                  </div>

                  <div className="col-md-4 mb-4">
                    <label className="fw-semibold mb-2 text-secondary ms-2">
                      Afternoon Food (Kg)
                    </label>

                    <input
                      type="number"
                      className="form-control form-control-lg shadow-sm"
                      name="AfternoonFoodKg"
                      value={form.AfternoonFoodKg}
                      onChange={handleChange}
                      placeholder="Enter Afternoon Food"
                      style={{
                        borderRadius: "14px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                      }}
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold mb-2 text-secondary ms-2">
                      Evening Food (Kg)
                    </label>

                    <input
                      type="number"
                      className="form-control form-control-lg shadow-sm"
                      name="EveningFoodKg"
                      value={form.EveningFoodKg}
                      onChange={handleChange}
                      required
                      placeholder="Enter Evening Food"
                      style={{
                        borderRadius: "14px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="fw-semibold mb-2 text-secondary ms-2">
                      Animal Name
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg shadow-sm"
                      name="AnimalName"
                      value={form.AnimalName}
                      onChange={handleChange}
                      placeholder="Enter Animal Name"
                      required
                      style={{
                        borderRadius: "14px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                      }}
                    />
                  </div>

                  {/* REMARK */}
                  <div className="col-md-12 mb-4">
                    <label className="fw-semibold mb-2 text-secondary">
                      Remark
                    </label>

                    <textarea
                      rows="4"
                      className="form-control form-control-lg shadow-sm"
                      name="Remark"
                      value={form.Remark}
                      onChange={handleChange}
                      placeholder="Write Something..."
                      style={{
                        borderRadius: "14px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                        resize: "none",
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-3 mt-3">
                  <button
                    type="button"
                    className="btn px-2 py-2 fw-semibold"
                    style={{
                      borderRadius: "14px",
                      background: "#f1f5f9",
                      color: "#334155",
                      border: "none",
                    }}
                    onClick={() => navigate("/admin-dashboard/intake")}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn text-white px-2 py-2 fw-semibold border-0"
                    style={{
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg,#667eea 0%, #764ba2 50%, #ff758c 100%)",
                    }}
                  >
                    {editData ? "Update Record" : "Save Record"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFoodIntake;
