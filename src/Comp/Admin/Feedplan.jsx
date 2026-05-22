import axios from "axios";
import React, { useEffect, useState } from "react";

const Feedplan = () => {
  const [feedDate, setFeedDate] = useState("");
  const [animalType, setAnimalType] = useState("cow");

  const [showForm, setShowForm] = useState(false);

  const [feedData, setFeedData] = useState([]);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    CowName: "",
    MilkDate: "",
    TotalMilk: "",
    FeedDate: "",
    RequiredFood: "",
  });

  const getFeedData = async () => {
    try {
      const res = await axios.get(
        `https://cattlemanagement.runasp.net/gaushala/CowFood/Index?feedDate=${feedDate}&animalType=${animalType}`,
      );

      const apiData = Array.isArray(res.data) ? res.data : res.data?.data || [];

      const localData = JSON.parse(localStorage.getItem("feedPlanData")) || [];

      setFeedData([...apiData, ...localData]);
    } catch (error) {
      console.log(error);

      const localData = JSON.parse(localStorage.getItem("feedPlanData")) || [];

      setFeedData(localData);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    try {
      await axios.get(
        `https://cattlemanagement.runasp.net/gaushala/CowFood/Generate?feedDate=${feedDate}&animalType=${animalType}`,
      );

      setShowForm(true);

      alert("Feed Plan Generated Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = (e) => {
    e.preventDefault();

    const oldData = JSON.parse(localStorage.getItem("feedPlanData")) || [];

    let updatedData = [];

    if (editId) {
      updatedData = oldData.map((item) =>
        item.id === editId ? { ...form, id: editId } : item,
      );
    } else {
      const newData = {
        id: Date.now(),
        ...form,
      };

      updatedData = [...oldData, newData];
    }

    localStorage.setItem("feedPlanData", JSON.stringify(updatedData));

    setFeedData(updatedData);

    setForm({
      CowName: "",
      MilkDate: "",
      TotalMilk: "",
      FeedDate: "",
      RequiredFood: "",
    });

    setEditId(null);

    setShowForm(false);

    alert(editId ? "Feed Plan Updated" : "Feed Plan Saved");
  };

  const handleEdit = (item) => {
    setForm(item);

    setEditId(item.id);

    setShowForm(true);
  };

  const handleDelete = (id) => {
    const oldData = JSON.parse(localStorage.getItem("feedPlanData")) || [];

    const updatedData = oldData.filter((item) => item.id !== id);

    localStorage.setItem("feedPlanData", JSON.stringify(updatedData));

    setFeedData(updatedData);

    alert("Feed Plan Deleted");
  };

  return (
    <div
      className="container-fluid p-4 min-vh-100"
      style={{ background: "#f4f7f9" }}
    >
      <h1 className="fw-bold mb-4" style={{ color: "#1859ae" }}>
        🐄 Cow Feed Plan
      </h1>

      <div
        className="card shadow border-0 rounded-4 p-4 mb-4"
        style={{
          background: "#ffffff",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <label className="fw-semibold mb-2 ms-2">Select Date</label>

            <input
              type="date"
              className="form-control form-control-lg"
              value={feedDate}
              onChange={(e) => setFeedDate(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="fw-semibold mb-2 ms-2">Select Animal</label>

            <select
              className="form-select form-select-lg"
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
            >
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
            </select>
          </div>

          <div className="col-md-4 mt-5">
            <button
              className="btn btn-success btn-lg w-100"
              onClick={getFeedData}
              style={{
                background: "#1c5fed",
                border: "none",
                fontWeight: "600",
              }}
            >
              Show Feed Plan
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 rounded-4 p-4 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="fw-semibold mb-2 ms-2">Feed Plan Date</label>

            <input
              type="date"
              className="form-control form-control-lg"
              value={feedDate}
              onChange={(e) => setFeedDate(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <button
              className="btn btn-primary btn-lg w-100"
              onClick={handleGenerate}
              style={{
                background: "#3a73ed",
                border: "none",
                fontWeight: "600",
              }}
            >
              Generate Feed Plan
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="card shadow border-0 rounded-4 p-4 mb-4">
          <h3 className="fw-bold mb-4 text-primary">
            {editId ? "Edit Feed Plan" : "Generate Feed Plan"}
          </h3>

          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="fw-semibold mb-2">Cow Name</label>

                <input
                  type="text"
                  name="CowName"
                  value={form.CowName}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="fw-semibold mb-2">Milk Date</label>

                <input
                  type="date"
                  name="MilkDate"
                  value={form.MilkDate}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="fw-semibold mb-2">Total Milk (L)</label>

                <input
                  type="number"
                  name="TotalMilk"
                  value={form.TotalMilk}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-semibold mb-2">Feed Date</label>

                <input
                  type="date"
                  name="FeedDate"
                  value={form.FeedDate}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-semibold mb-2">Required Food (Kg)</label>

                <input
                  type="number"
                  name="RequiredFood"
                  value={form.RequiredFood}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-success px-4">
                {editId ? "Update Feed Plan" : "Save Feed Plan"}
              </button>

              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => {
                  setShowForm(false);

                  setEditId(null);

                  setForm({
                    CowName: "",
                    MilkDate: "",
                    TotalMilk: "",
                    FeedDate: "",
                    RequiredFood: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card shadow border-0 rounded-4 p-4">
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Cow Name</th>
                <th>Milk Date</th>
                <th>Total Milk (L)</th>
                <th>Feed Date</th>
                <th>Required Food (Kg)</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {feedData.length > 0 ? (
                feedData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.CowName}</td>
                    <td>{item.MilkDate}</td>
                    <td>{item.TotalMilk}</td>
                    <td>{item.FeedDate}</td>
                    <td>{item.RequiredFood}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
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
                  <td colSpan="7" className="py-4">
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

export default Feedplan;
