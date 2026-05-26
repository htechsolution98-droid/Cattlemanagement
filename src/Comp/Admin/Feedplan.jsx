import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";

const Feedplan = () => {
  const [feedDate, setFeedDate] = useState("");
  const [animalType, setAnimalType] = useState("Cow");

  const [showForm, setShowForm] = useState(false);

  const [feedData, setFeedData] = useState([]);

  const [form, setForm] = useState({
    CowName: "",
    MilkDate: "",
    TotalMilk: "",
    FeedDate: "",
    RequiredFood: "",
  });

  const getFeedData = async () => {
    try {
      const res = await axiosInstance.get(
        `/gaushala/CowFood/Index?FeedDate=${feedDate}&AnimalType=${animalType}`,
      );

      console.log("Feed Data:", res.data);

      const apiData = Array.isArray(res.data) ? res.data : res.data?.data || [];

      setFeedData(apiData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (feedDate) {
      getFeedData();
    }
  }, [feedDate, animalType]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = () => {
    if (!feedDate) {
      alert("Please Select Feed Date");
      return;
    }

    setShowForm(true);
  };
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();

      formData.append("CowName", form.CowName);
      formData.append("MilkDate", form.MilkDate);
      formData.append("TotalMilk", form.TotalMilk);
      formData.append("FeedDate", form.FeedDate);
      formData.append("RequiredFood", form.RequiredFood);

      const res = await axiosInstance.post(
        "/gaushala/CowFood/Generate",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      console.log("SAVE RESPONSE:", res.data);

      alert("Feed Plan Saved Successfully");

      getFeedData();

      setShowForm(false);

      setForm({
        CowName: "",
        MilkDate: "",
        TotalMilk: "",
        FeedDate: "",
        RequiredFood: "",
      });
    } catch (error) {
      console.log(error);

      alert("Save API Error");
    }
  };
  const handleDelete = async (id) => {
    try {
      await axiosInstance.post("/gaushala/CowFood/Delete", {
        Id: id,
      });

      alert("Feed Plan Deleted");

      getFeedData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container-fluid p-4 min-vh-100"
      style={{ background: "#f4f7f9" }}
    >
      <h1 className="fw-bold mb-4" style={{ color: "#1859ae" }}>
        🐄 Cow Feed Plan
      </h1>

      {/* FILTER SECTION */}
      <div className="card shadow border-0 rounded-4 p-4 mb-4">
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
              <option value="Cow">Cow</option>

              <option value="Buffalo">Buffalo</option>
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

      {/* GENERATE SECTION */}
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

      {/* FORM */}
      {showForm && (
        <div className="card shadow border-0 rounded-4 p-4 mb-4">
          <h3 className="fw-bold mb-4 text-primary">Save Feed Plan</h3>

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
              <button className="btn btn-success px-4">Save Feed Plan</button>

              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => {
                  setShowForm(false);

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

      {/* TABLE */}
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
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.Id)}
                      >
                        Delete
                      </button>
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
