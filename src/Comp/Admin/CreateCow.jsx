import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "./api/axiosInstance";

const CreateCow = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const editData = location.state?.cowData;
  const editIndex = location.state?.editIndex;

  const [form, setForm] = useState(
    editData || {
      Id: 0,
      CowId: 0,
      Name: "",
      RegistrationNo: "",
      CreatedAt: "",
      AnimalType: "Cow",
      IsSold: false,
      SoldDate: "",
      SoldPrice: "",
      SoldPersonName: "",
      SoldPersonAddress: "",
      SoldPersonPhoneNo: "",
      Dob: "",
      PurchaseDate: "",
      PurchaseFrom: "",
      PurchaseAddress: "",
      MobileNo: "",
      PurchasePrice: "",
      GovernmentTagNo: "",
      FatherName: "",
      MotherName: "",
      FatherFatherName: "",
      FatherMotherName: "",
      MotherFatherName: "",
      MotherMotherName: "",
      Gender: "Female",
      IsActiveForMilk: false,
      FirstImagePath: "",
      SecondImagePath: "",
      FirstImageFile: null,
      SecondImageFile: null,
      reproJson: "",
    },
  );

  const [recordsList, setRecordsList] = useState(
    editData?.ReproRecords || editData?.ReproductionRecords || [],
  );

  const [record, setRecord] = useState({
    ReproId: 0,
    CowId: 0,
    HeatComingDate: "",
    AIDate: "",
    AIBullName: "",
    BullName: "",
    DrName: "",
    PregnancyCheckDate: "",
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

  const handleRecordChange = async (e) => {
    const { name, value } = e.target;

    setRecord((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "PregnancyStatus") {
      try {
        console.log(`Pregnancy Status Changed to: ${value}. Calling API...`);
        const response = await axiosInstance.get("/gaushala/Cow/Pregnant");
        console.log("Pregnant API Response:", response.data);
      } catch (error) {
        console.error("Error calling Pregnant API:", error);
        alert("Error fetching data from pregnant API");
      }
    }
  };

  const handleAddRecordTable = () => {
    setRecordsList([...recordsList, record]);
    setRecord({
      ReproId: 0,
      CowId: 0,
      HeatComingDate: "",
      AIDate: "",
      AIBullName: "",
      BullName: "",
      DrName: "",
      PregnancyCheckDate: "",
      PregnancyStatus: "",
      DeliveryDate: "",
      CalfName: "",
      Remark: "",
    });
    setShowModal(false);
  };

  const handleDeleteCattle = async () => {
    if (!editData || !editData.Id) return;

    const confirmDelete = window.confirm(`? ${form.Name || ""}`);
    if (!confirmDelete) return;

    try {
      await axiosInstance.post("/gaushala/Cow/Delete", { id: editData.Id });

      const existingData = JSON.parse(localStorage.getItem("cattleData")) || [];
      const updatedData = existingData.filter((_, idx) => idx !== editIndex);
      localStorage.setItem("cattleData", JSON.stringify(updatedData));

      alert("Cattle deleted successfully!");
      navigate("/admin-dashboard/cows");
    } catch (error) {
      console.error(error);
      alert("Error deleting record");
    }
  };

const handleSubmitAllData = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    // Edit time only send Id
    if (editData?.Id) {
      formData.append("Id", editData.Id);
    }

    // Basic Info
    formData.append("Name", form.Name || "");
    formData.append("RegistrationNo", form.RegistrationNo || "");
    formData.append("AnimalType", form.AnimalType || "Cow");

    if (form.CreatedAt) {
      formData.append("CreatedAt", new Date(form.CreatedAt).toISOString());
    }

    // Sold Info
    formData.append("IsSold", form.IsSold ? "true" : "false");

    if (form.IsSold) {
      if (form.SoldDate) formData.append("SoldDate", form.SoldDate);
      formData.append("SoldPrice", Number(form.SoldPrice || 0));
      formData.append("SoldPersonName", form.SoldPersonName || "");
      formData.append("SoldPersonAddress", form.SoldPersonAddress || "");
      formData.append("SoldPersonPhoneNo", form.SoldPersonPhoneNo || "");
    }

    // Purchase Info
    if (form.Dob) formData.append("Dob", form.Dob);
    if (form.PurchaseDate) formData.append("PurchaseDate", form.PurchaseDate);

    formData.append("PurchaseFrom", form.PurchaseFrom || "");
    formData.append("PurchaseAddress", form.PurchaseAddress || "");
    formData.append("MobileNo", form.MobileNo || "");
    formData.append("PurchasePrice", Number(form.PurchasePrice || 0));
    formData.append("GovernmentTagNo", form.GovernmentTagNo || "");

    // Family Info
    formData.append("FatherName", form.FatherName || "");
    formData.append("MotherName", form.MotherName || "");
    formData.append("FatherFatherName", form.FatherFatherName || "");
    formData.append("FatherMotherName", form.FatherMotherName || "");
    formData.append("MotherFatherName", form.MotherFatherName || "");
    formData.append("MotherMotherName", form.MotherMotherName || "");
    formData.append("Gender", form.Gender || "Female");
    formData.append("IsActiveForMilk", form.IsActiveForMilk ? "true" : "false");

    // Images
    if (form.FirstImageFile instanceof File) {
      formData.append("FirstImageFile", form.FirstImageFile);
    }

    if (form.SecondImageFile instanceof File) {
      formData.append("SecondImageFile", form.SecondImageFile);
    }

    // Reproduction Records
    const reproData = recordsList.map((item) => {
      const obj = {
        ReproId: Number(item.ReproId || 0),
        CowId: Number(item.CowId || 0),
        AIBullName: item.AIBullName || "",
        BullName: item.BullName || "",
        DrName: item.DrName || "",
        PregnancyStatus: item.PregnancyStatus || "",
        CalfName: item.CalfName || "",
        Remark: item.Remark || "",
      };

      if (item.HeatComingDate) obj.HeatComingDate = item.HeatComingDate;
      if (item.AIDate) obj.AIDate = item.AIDate;
      if (item.PregnancyCheckDate) obj.PregnancyCheckDate = item.PregnancyCheckDate;
      if (item.DeliveryDate) obj.DeliveryDate = item.DeliveryDate;

      return obj;
    });

    formData.append("reproJson", JSON.stringify(reproData));

    // Debug
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axiosInstance.post("/gaushala/Cow/Save", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("SUCCESS =>", response.data);

    const savedCow = response.data?.data || response.data;

    const generatedId = savedCow?.Id || savedCow?.CowId || savedCow?.id;

    setForm((prev) => ({
      ...prev,
      Id: generatedId || prev.Id,
    }));

    alert("Cattle Saved Successfully");
    navigate("/admin-dashboard/cows");
  } catch (error) {
    console.log("SAVE ERROR =>", error);
    console.log("STATUS =>", error.response?.status);
    console.log("ERROR DATA =>", error.response?.data);
    console.log("ERRORS =>", error.response?.data?.errors);

    alert(
      error.response?.data?.message ||
        JSON.stringify(error.response?.data?.errors) ||
        "Error while saving cattle"
    );
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-lg p-4 rounded-4 shadow-lg border border-white">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-14 h-14 rounded-4 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-cow text-white fs-3"></i>
        </div>
        <div>
          <h2 className="m-0 fw-bold text-dark">
            {editData ? "Edit Cattle" : "Create Cattle"}
          </h2>
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
              <label className="form-label small fw-bold ms-2">Cow Id</label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2"
                value={form.Id || "(new)"}
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
              <label className="form-label small fw-bold ms-4 mb-3">
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
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-4 mb-3">
                CreatedAt
              </label>
              <input
                type="datetime-local"
                className="form-control border-0 shadow-sm rounded-4 py-2 ms-3"
                name="CreatedAt"
                value={form.CreatedAt}
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
                name="GovernmentTagNo"
                value={form.GovernmentTagNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                First Image
              </label>
              <input
                type="file"
                className="form-control border-0 shadow-sm rounded-4 py-2"
                name="FirstImageFile"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Second Image
              </label>
              <input
                type="file"
                className="form-control border-0 shadow-sm rounded-4 py-2"
                name="SecondImageFile"
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
                />
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
                />
                <span className="small">Female</span>
              </div>
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label small fw-bold ms-2">
                Father Name
              </label>
              <input
                type="text"
                className="form-control border-0 shadow-sm rounded-4 py-2"
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
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
                className="form-control border-0 shadow-sm rounded-4 py-2"
                name="MotherMotherName"
                value={form.MotherMotherName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mt-2 form-check ms-3">
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

        {/* NEW SECTION: Cattle Sale Information (Sold Data) */}
        <div className="card mb-4 border-warning shadow-sm">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 fs-5 text-white px-4 py-3 d-flex align-items-center justify-content-between">
            <strong>Cattle Sale / Sold Information</strong>
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input bg-light border-secondary"
                type="checkbox"
                name="IsSold"
                id="IsSold"
                checked={form.IsSold}
                onChange={handleChange}
              />
              <label
                className="form-check-label text-white small fw-bold ms-1"
                htmlFor="IsSold"
              >
                Cattle is Sold
              </label>
            </div>
          </div>

          {form.IsSold && (
            <div className="card-body row text-muted bg-light/40">
              <div className="col-md-3 mb-2">
                <label className="form-label small fw-bold ms-2">
                  Sold Date
                </label>
                <input
                  type="date"
                  className="form-control border-0 shadow-sm rounded-4 py-2"
                  name="SoldDate"
                  value={form.SoldDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-2">
                <label className="form-label small fw-bold ms-2">
                  Sold Price
                </label>
                <input
                  type="number"
                  className="form-control border-0 shadow-sm rounded-4 py-2"
                  name="SoldPrice"
                  value={form.SoldPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-2">
                <label className="form-label small fw-bold ms-2">
                  Buyer Name (Sold Person)
                </label>
                <input
                  type="text"
                  className="form-control border-0 shadow-sm rounded-4 py-2"
                  name="SoldPersonName"
                  value={form.SoldPersonName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3 mb-2">
                <label className="form-label small fw-bold ms-2">
                  Buyer Phone No
                </label>
                <input
                  type="text"
                  className="form-control border-0 shadow-sm rounded-4 py-2"
                  name="SoldPersonPhoneNo"
                  value={form.SoldPersonPhoneNo}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 mb-2">
                <label className="form-label small fw-bold ms-2">
                  Buyer Address
                </label>
                <input
                  type="text"
                  className="form-control border-0 shadow-sm rounded-4 py-2"
                  name="SoldPersonAddress"
                  value={form.SoldPersonAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Reproduction Table */}
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
                  <th>Heat Date</th>
                  <th>AI Date</th>
                  <th>AI Bull Name</th>
                  <th>Bull Name</th>
                  <th>Dr Name</th>
                  <th>Preg. Check Date</th>
                  <th>Pregnancy Status</th>
                  <th>Delivery Date</th>
                  <th>Calf Name</th>
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
                    <td>{rec.AIBullName}</td>
                    <td>{rec.BullName}</td>
                    <td>{rec.DrName}</td>
                    <td>{rec.PregnancyCheckDate}</td>
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

        {/* Footer Actions */}
        <div className="d-flex justify-content-end gap-2 mb-5">
          {editData && (
            <button
              type="button"
              className="btn btn-danger px-4 me-auto"
              onClick={handleDeleteCattle}
            >
              🗑️ Delete
            </button>
          )}
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
            Save
          </button>
        </div>
      </form>

      {/* POPUP MODAL */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-gradient-to-r from-indigo-600 to-purple-600 border border-primary fs-5 text-white d-flex justify-content-between py-3">
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
                    value={record.HeatComingDate}
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">AI Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="AIDate"
                    value={record.AIDate}
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">AI Bull Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="AIBullName"
                    value={record.AIBullName}
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Bull Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="BullName"
                    value={record.BullName}
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Doctor Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="DrName"
                    value={record.DrName}
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Pregnancy Check Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="PregnancyCheckDate"
                    value={record.PregnancyCheckDate}
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
                      checked={record.PregnancyStatus === "Positive"}
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
                      checked={record.PregnancyStatus === "Negative"}
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
                    value={record.DeliveryDate}
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Calf Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="CalfName"
                    value={record.CalfName}
                    onChange={handleRecordChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="fw-bold">Remark</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="2"
                    name="Remark"
                    value={record.Remark}
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
