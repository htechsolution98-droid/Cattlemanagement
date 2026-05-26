import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "./api/axiosInstance";

const CreateSellRecord = () => {
  const navigate = useNavigate();

  const [animalType, setAnimalType] = useState("");
  const [animalList, setAnimalList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const [formData, setFormData] = useState({
    SoldDate: "",
    SoldPrice: "",
    SoldPersonName: "",
    SoldPersonAddress: "",
    SoldPersonPhoneNo: "",
  });

  // ...existing code...
  const getAnimals = async () => {
    const url = "/gaushala/CowSold/Create";

    const res = await axiosInstance.get(url, {
      withCredentials: true,
      headers: {
        Accept: "application/xml, application/json, text/plain, */*",
      },
    });

    console.log("getAnimals response", res.status, res.headers, res.data);

    if (res.status === 302) {
      throw new Error(
        "Redirected by server. Check authentication or endpoint URL.",
      );
    }

    let apiData = [];
    if (typeof res.data === "string") {
      const text = res.data.trim();
      if (text.startsWith("<")) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const items = Array.from(xml.querySelectorAll("Item"));
        apiData = items.map((item) => ({
          Id: item.querySelector("Id")?.textContent,
          Name: item.querySelector("Name")?.textContent,
          AnimalType: item.querySelector("AnimalType")?.textContent,
          RegistrationNo: item.querySelector("RegistrationNo")?.textContent,
        }));
      } else {
        console.warn("Unexpected text response from API:", text);
      }
    } else if (Array.isArray(res.data)) {
      apiData = res.data;
    } else if (res.data?.data) {
      apiData = res.data.data;
    }

    const finalData = [...apiData];

    const filtered = finalData.filter(
      (item) => item.AnimalType?.toLowerCase() === animalType.toLowerCase(),
    );

    setAnimalList(filtered);
  };
  // ...existing code...

  useEffect(() => {
    if (animalType) {
      getAnimals();
    }
  }, [animalType]);

  const handleSave = async () => {
    try {
      const payload = {
        CowId: selectedAnimal?.Id || selectedAnimal?.id,
        Name: selectedAnimal?.Name,
        AnimalType: selectedAnimal?.AnimalType,
        ...formData,
      };

      await axiosInstance.post("/gaushala/CowSold/Save", payload);

      const existingSold = JSON.parse(localStorage.getItem("soldData")) || [];

      const updatedSold = [...existingSold, payload];


      alert("Sold Record Saved");

      navigate("/admin-dashboard/sold");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-3 md:p-8">
      <div className="bg-white p-5 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-5 text-blue-800">Sell Cow</h1>

        <div className="grid grid-cols-1 gap-5">
          {/* SELECT TYPE */}
          <div>
            <label>Animal Type</label>

            <select
              className="w-full border p-3 rounded-xl"
              value={animalType}
              onChange={(e) => {
                setAnimalType(e.target.value);
                setSelectedAnimal(null);
              }}
            >
              <option value="">Select Type</option>
              <option value="Cow">Cow</option>
              <option value="Buffalo">Buffalo</option>
            </select>
          </div>

          {/* SELECT NAME */}
          <div>
            <label>Owner Name</label>

            <select
              className="w-full border p-3 rounded-xl"
              onChange={(e) => {
                const animal = animalList.find(
                  (item) => (item.Id || item.id).toString() === e.target.value,
                );

                setSelectedAnimal(animal);
              }}
            >
              <option value="">Select Animal</option>

              {animalList.map((item, index) => (
                <option key={index} value={item.Id || item.id}>
                  {item.Name}
                </option>
              ))}
            </select>
          </div>

          {/* DETAILS SHOW */}
          {selectedAnimal && (
            <div className="bg-cyan-100 p-4 rounded-xl">
              <h2 className="font-bold mb-2">Selected Animal</h2>

              <p>
                <b>ID :</b> {selectedAnimal.Id || selectedAnimal.id}
              </p>

              <p>
                <b>Name :</b> {selectedAnimal.Name}
              </p>

              <p>
                <b>Animal Type :</b> {selectedAnimal.AnimalType}
              </p>

              <p>
                <b>Reg No :</b> {selectedAnimal.RegistrationNo}
              </p>
            </div>
          )}

          {/* SALE INFO */}
          <div className="bg-green-900 text-white p-3 rounded-t-xl font-bold">
            Sale Information
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="date"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  SoldDate: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Sold Price"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  SoldPrice: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Sold Person Name"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  SoldPersonName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  SoldPersonAddress: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  SoldPersonPhoneNo: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={() => navigate("/admin-dashboard/sold")}
              className="bg-gray-500 text-white px-5 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-xl"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSellRecord;
