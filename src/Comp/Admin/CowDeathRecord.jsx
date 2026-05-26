import React, { useState } from "react";
import axiosInstance from "./api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const CowDeathRecord = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cowId = state?.Id ?? state?.id ?? state?.CowId ?? state?.cowId;

  const [form, setForm] = useState({
    CowId: cowId || "",
    DeathDate: "",
    Reason: "",
    Notes: "",
    DisposalMethod: "",
    DisposalDate: "",
    DisposalCost: "",
  });
   if (!cowId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-600 font-semibold mb-4">Error: No cow selected</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = {
      ...form,
      [name]: value,
    };

    if (name === "DeathDate" && value) {
      const deathDate = new Date(value);

      const autoDisposal = new Date(deathDate);

      autoDisposal.setDate(autoDisposal.getDate() + 1);

      const formattedDate = autoDisposal.toISOString().split("T")[0];

      updatedForm.DisposalDate = formattedDate;
    }

    setForm(updatedForm);
  };

 const save = async (e) => {
  e.preventDefault();

  try {
    const selectedCowId = Number(form.CowId);

    if (!Number.isInteger(selectedCowId) || selectedCowId <= 0) {
      alert(
        "This animal does not have a valid Cow Id. Please search/select an animal again.",
      );
      return;
    }

    const params = {
      Id: 0,
      CowId: selectedCowId,
      DeathDate: form.DeathDate,
      Reason: form.Reason,
      Notes: form.Notes,
      DisposalMethod: form.DisposalMethod,
      DisposalDate: form.DisposalDate,
      DisposalCost: Number(form.DisposalCost) || 0,
      CowName: state?.Name || state?.name || "",
      RegistrationNo: state?.RegistrationNo || state?.registrationNo || "",
      AnimalType: state?.AnimalType || state?.animalType || "",
      PurchaseDate: state?.PurchaseDate || state?.purchaseDate || "",
      Dob: state?.Dob || state?.dob || "",
    };

    console.log("SENDING DATA =>", params);

    const formBody = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      formBody.append(key, value ?? "");
    });

    console.log("SENDING DATA =>", params);

const response = await axiosInstance.post(
  "/gaushala/CowDeath/Record",
  null,
  {
    params,
    headers: {
      Accept: "application/json",
    },
  }
);

console.log("SUCCESS =>", response.data);
alert("Death record saved successfully");
navigate("/admin-dashboard/cowdeath");

    console.log("SUCCESS =>", response.data);
    alert("Death record saved successfully");
    navigate("/admin-dashboard/cow-death");
  } catch (error) {
    console.log("FULL ERROR =>", error);
    console.log("ERROR RESPONSE =>", error.response?.data);
    alert("Error: " + (error.response?.data?.message || error.response?.data || "Something went wrong"));
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-3 border-l-8 border-red-500 mb-6">
        <h2 className="text-3xl font-bold text-red-600">{state?.Name}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div className="bg-gray-50 p-3 rounded-2xl">
            <p
              className="text-xs text-gray-500 mb-1"
              style={{ fontSize: "18px" }}
            >
              Registration No
            </p>

            <p
              className="font-semibold text-gray-700"
              style={{ fontSize: "16px" }}
            >
              {state?.RegistrationNo}
            </p>
          </div>

          <div className="bg-gray-50 p-2 rounded-2xl">
            <p
              className="text-xs text-gray-500 mb-1"
              style={{ fontSize: "18px" }}
            >
              Animal Type
            </p>

            <p
              className="font-semibold text-gray-700"
              style={{ fontSize: "16px" }}
            >
              {state?.AnimalType}
            </p>
          </div>

          <div className="bg-gray-50 p-2 rounded-2xl">
            <p
              className="text-xs text-gray-500 mb-1"
              style={{ fontSize: "18px" }}
            >
              Date Of Birth
            </p>

            <p
              className="font-semibold text-gray-700"
              style={{ fontSize: "16px" }}
            >
              {state?.Dob}
            </p>
          </div>

          <div className="bg-gray-50 p-2 rounded-2xl">
            <p
              className="text-xs text-gray-500 mb-1"
              style={{ fontSize: "18px" }}
            >
              Purchase Date
            </p>

            <p
              className="font-semibold text-gray-700"
              style={{ fontSize: "16px" }}
            >
              {state?.PurchaseDate || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={save}
        className="bg-white shadow-xl rounded-3xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3">
          🪦 Death Record Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Death Date
            </label>

            <input
              type="date"
              name="DeathDate"
              value={form.DeathDate}
              onChange={handleChange}
              className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-red-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Death Reason
            </label>

            <input
              type="text"
              name="Reason"
              value={form.Reason}
              placeholder="Enter death reason"
              onChange={handleChange}
              className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-red-300 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Notes
          </label>

          <textarea
            name="Notes"
            value={form.Notes}
            onChange={handleChange}
            placeholder="Additional notes..."
            className="w-full border rounded-xl p-2.5 h-24 resize-none focus:ring-2 focus:ring-red-300 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Disposal Method
            </label>

            <select
              name="DisposalMethod"
              value={form.DisposalMethod}
              onChange={handleChange}
              className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-red-300 outline-none"
            >
              <option value="">Select Disposal Method</option>
              <option value="Buried">Buried</option>
              <option value="Burned">Burned</option>
              <option value="Composting">Composting</option>
              <option value="Municipal Pickup">Municipal Pickup</option>
              <option value="Rendering">Rendering</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Disposal Date
            </label>

            <input
              type="date"
              name="DisposalDate"
              value={form.DisposalDate}
              min={form.DeathDate}
              max={
                form.DeathDate
                  ? new Date(
                      new Date(form.DeathDate).setDate(
                        new Date(form.DeathDate).getDate() + 10,
                      ),
                    )
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-red-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Disposal Cost
            </label>

            <input
              type="number"
              name="DisposalCost"
              value={form.DisposalCost}
              placeholder="Enter disposal cost"
              onChange={handleChange}
              className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-red-300 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit" 
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg transition"
          >
            Record Death
          </button>
        </div>
      </form>
    </div>
  );
};

export default CowDeathRecord;
