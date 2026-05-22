import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateCow = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
const location = useLocation();

const editData = location.state?.cowData;
const editIndex = location.state?.editIndex;
  const [form, setForm] = useState(editData||{
    Name: "",
    RegistrationNo:"",
    AnimalType: "",
    Dob: "",
    PurchaseDate: "",
    PurchaseFrom: "",
    PurchaseAddress: "",
    MobileNo: "",
    PurchasePrice: "",
    GovernmentTagNo: "",
    Gender: "Female",
    FatherName: "",
    MotherName: "",
    FatherFatherName: "",
    FatherMotherName: "",
    MotherFatherName: "",
    MotherMotherName: "",
    IsActiveForMilk: false,
    FirstImageFile: null,
    SecondImageFile: null,
  });

  const [recordsList, setRecordsList] = useState([]);
  const [record, setRecord] = useState({
    HeatComingDate: "",
    AIDate: "",
    AIBull: "",
    Bull: "",
    Doctor: "",
    PregCheck: "",
    PregnancyStatus: "",
    DeliveryDate: "",
    CalfName: "",
    Remark: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleRecordChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecord({
      ...record,
      [name]: type === "radio" ? value : value,
    });
  };

  const handleAddRecordTable = () => {
    setRecordsList([...recordsList, record]);
    setRecord({
      HeatComingDate: "",
      AIDate: "",
      AIBull: "",
      Bull: "",
      Doctor: "",
      PregCheck: "",
      PregnancyStatus: "",
      DeliveryDate: "",
      CalfName: "",
      Remark: "",
    });
    setShowModal(false);
  };

  const handleSubmitAllData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("ReproductionRecords", JSON.stringify(recordsList));

      await axios.post(
        "https://cattlemanagement.runasp.net/gaushala/Cow/Create",
        formData,
      );

      // NEW DATA OBJECT
      const newCattle = {
        id: Date.now(),
        ...form,
        ReproductionRecords: recordsList,
      };
const existingData =
  JSON.parse(localStorage.getItem("cattleData")) || [];

if (editData) {
  existingData[editIndex] = {
    ...form,
    id: editData.id,
    ReproductionRecords: recordsList,
  };

  localStorage.setItem(
    "cattleData",
    JSON.stringify(existingData),
  );
} else {
  const newCattle = {
    id: Date.now(),
    ...form,
    ReproductionRecords: recordsList,
  };

  const updatedData = [...existingData, newCattle];

  localStorage.setItem(
    "cattleData",
    JSON.stringify(updatedData),
  );
}
      alert("Cattle created successfully!");

      navigate("/admin-dashboard/cows");
    } catch (error) {
      console.log(error);
      alert("Error saving data");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-lg p-4 rounded-4 shadow-lg border border-white">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-14 h-14 rounded-4 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-cow text-white fs-3"></i>
        </div>

        <div>
          <h2 className="m-0 fw-bold text-dark">Create Cattle</h2>
          <p className="text-muted m-0 small">
            Add new cow / buffalo information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmitAllData}>
        {/* SECTION 1: Cow Master */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3 shadow-lg border-0 overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 border border-primary fs-5 text-white px-4 py-3">
            <strong>Cow Master</strong>
          </div>
          <div className="card-body row text-muted">
            <div className="col-md-3 mb-2 ms-4 mt-2">
              <label className="form-label small fw-bold ms-2 ">Cow Id</label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2"
                value="(new)"
                disabled
              />
            </div>
            <div className="col-md-3 mb-2 mt-2">
              <label className="form-label small fw-bold ms-2">Name</label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2"
                name="Name"
                value={form.Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-2 mt-2">
              <label className="form-label small fw-bold ms-2">
                Animal Type
              </label>
              <select
                className="form-select border-0 shadow-sm rounded-4 py-2"
                name="AnimalType"
                value={form.AnimalType}
                onChange={handleChange}
              >
                <option value="Cow">Cow</option>
                <option value="Buffalo">Buffalo</option>
              </select>
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-4  mb-3">
                Reg No.
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 ms-3"
                name="RegistrationNo"
                value={form.RegistrationNo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Cow Info */}
        <div className="card mb-4 border-primary">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 fs-5 text-white px-4 py-3">
            <strong>Cow Info (DOB / Purchase / Images / Genealogy)</strong>
          </div>
          <div className="card-body row text-muted">
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">Dob</label>
              <input
                type="date"
                className="form-control border-0 shadow-sm rounded-4 py-2"
                name="Dob"
                value={form.Dob}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Purchase Date
              </label>
              <input
                type="date"
                className="form-control border-0 shadow-sm rounded-4 py-2"
                name="PurchaseDate"
                value={form.PurchaseDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Purchase From
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="PurchaseFrom"
                value={form.PurchaseFrom}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Purchase Address
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="PurchaseAddress"
                value={form.PurchaseAddress}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">Mobile No</label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2"
                name="MobileNo"
                 value={form.MobileNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Purchase Price
              </label>
              <input
                type="number"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="PurchasePrice"
                value={form.PurchasePrice}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Government Tag No
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="GovernmentTagNo"
                value={form.GovernmentTagNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2"> Image</label>
              <input
                type="file"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="FirstImageFile"
                value={form.FirstImageFile}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold d-block ms-2">
                Gender
              </label>
              <div className="form-check form-check-inline mt-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Male"
                  checked={form.Gender === "Male"}
                  onChange={handleChange}
                />{" "}
                <span className="small">Male</span>
              </div>
              <div className="form-check form-check-inline mt-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Female"
                  checked={form.Gender === "Female"}
                  onChange={handleChange}
                />{" "}
                <span className="small">Female</span>
              </div>
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Father Name
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="FatherName"
                value={form.FatherName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Mother Name
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="MotherName"
                 value={form.MotherName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Father Father Name
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="FatherFatherName"
                 value={form.FatherFatherName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Father Mother Name
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="FatherMotherName"
                 value={form.FatherMotherName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Mother Father Name
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="MotherFatherName"
                 value={form.MotherFatherName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Mother Mother Name
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2 "
                name="MotherMotherName"
                 value={form.MotherMotherName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mt-2 form-check ms-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="IsActiveForMilk"
                checked={form.IsActiveForMilk}
                onChange={handleChange}
              />
              <label className="form-check-label small fw-bold">
                Is Active for Milk
              </label>
            </div>
          </div>
        </div>

        <div className="card mb-4 border-primary">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 border border-primary fs-5 text-white d-flex justify-content-between align-items-center py-1">
            <strong>Reproduction / AI / Delivery</strong>
            <button
              type="button"
              className="btn btn-sm btn-light fw-bold text-info p-2 me-3"
              onClick={() => setShowModal(true)}
            >
              + Add Record
            </button>
          </div>
          <div className="card-body p-0 table-responsive">
            <table className="table table-bordered m-0 text-center small align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Heat</th>
                  <th>AI</th>
                  <th>AI Bull</th>
                  <th>Bull</th>
                  <th>Doctor</th>
                  <th>Preg. Check</th>
                  <th>Pregnancy Status</th>
                  <th>Delivery</th>
                  <th>Calf</th>
                  <th>Remark</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recordsList.map((rec, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{rec.HeatComingDate}</td>
                    <td>{rec.AIDate}</td>
                    <td>{rec.AIBull}</td>
                    <td>{rec.Bull}</td>
                    <td>{rec.Doctor}</td>
                    <td>{rec.PregCheck}</td>
                    <td>{rec.PregnancyStatus}</td>
                    <td>{rec.DeliveryDate}</td>
                    <td>{rec.CalfName}</td>
                    <td>{rec.Remark}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger py-0"
                        onClick={() =>
                          setRecordsList(
                            recordsList.filter((_, idx) => idx !== i),
                          )
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mb-5">
          <button
            type="button"
            className="btn btn-secondary px-4"
            onClick={() => navigate("/admin-dashboard/cows")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3 rounded-3 fw-bold shadow-lg border-0"
          >
            💾 Save
          </button>
        </div>
      </form>

      {showModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-gradient-to-r from-indigo-600 to-purple-600 border border-primary fs-5 text-white d-flex justify-content-end py-3">
                <h5 className="modal-title small fw-bold">
                  Add Reproduction Record
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body row g-2 text-muted small">
                <div className="col-md-6">
                  <label className="fw-bold">Heat Coming Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="HeatComingDate"
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">AI Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="AIDate"
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">AI Bull Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="AIBull"
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Bull Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="Bull"
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Doctor Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="Doctor"
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Pregnancy Check Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="PregCheck"
                    onChange={handleRecordChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-bold d-block">Pregnancy Status</label>
                  <div className="form-check form-check-inline mt-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="PregnancyStatus"
                      value="Positive"
                      onChange={handleRecordChange}
                    />{" "}
                    Positive
                  </div>
                  <div className="form-check form-check-inline mt-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="PregnancyStatus"
                      value="Negative"
                      onChange={handleRecordChange}
                    />{" "}
                    Negative
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="fw-bold">Delivery Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="DeliveryDate"
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Calf Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="CalfName"
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="fw-bold">Remark</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="2"
                    name="Remark"
                    onChange={handleRecordChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer py-1">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={handleAddRecordTable}
                >
                  Add Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCow;
