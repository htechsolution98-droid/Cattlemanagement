import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";

const AddCow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.cowData;

    const [formData, setFormData] = useState(
        editData ? {
            Id: editData.Id || 0,
            Name: editData.Name || "",
            RegistrationNo: editData.RegistrationNo || "",
            CreatedAt: editData.CreatedAt ? editData.CreatedAt.split("T")[0] : "",
            IsSold: editData.IsSold || false,
            SoldDate: editData.SoldDate ? editData.SoldDate.split("T")[0] : "",
            SoldPrice: editData.SoldPrice || 0,
            SoldPersonName: editData.SoldPersonName || "",
            SoldPersonAddress: editData.SoldPersonAddress || "",
            SoldPersonPhoneNo: editData.SoldPersonPhoneNo || "",
            Dob: editData.Dob ? editData.Dob.split("T")[0] : "",
            PurchaseDate: editData.PurchaseDate ? editData.PurchaseDate.split("T")[0] : "",
            PurchaseFrom: editData.PurchaseFrom || "",
            PurchaseAddress: editData.PurchaseAddress || "",
            MobileNo: editData.MobileNo || "",
            PurchasePrice: editData.PurchasePrice || 0,
            GovernmentTagNo: editData.GovernmentTagNo || "",
            FatherName: editData.FatherName || "",
            MotherName: editData.MotherName || "",
            FatherFatherName: editData.FatherFatherName || "",
            FatherMotherName: editData.FatherMotherName || "",
            MotherFatherName: editData.MotherFatherName || "",
            MotherMotherName: editData.MotherMotherName || "",
            IsActiveForMilk: editData.IsActiveForMilk || false,
            Gender: editData.Gender || "Female",
            AnimalType: editData.AnimalType || "Cow",

            // Reproduction details mapping from arrays
            NewReproId: editData.ReproRecords?.[0]?.ReproId || editData.ReproductionRecords?.[0]?.ReproId || 0,
            NewReproCowId: editData.ReproRecords?.[0]?.CowId || editData.ReproductionRecords?.[0]?.CowId || 0,
            NewReproHeatComingDate: editData.ReproRecords?.[0]?.HeatComingDate ? editData.ReproRecords[0].HeatComingDate.split("T")[0] : editData.ReproductionRecords?.[0]?.HeatComingDate ? editData.ReproductionRecords[0].HeatComingDate.split("T")[0] : "",
            NewReproAIDate: editData.ReproRecords?.[0]?.AIDate ? editData.ReproRecords[0].AIDate.split("T")[0] : editData.ReproductionRecords?.[0]?.AIDate ? editData.ReproductionRecords[0].AIDate.split("T")[0] : "",
            NewReproAIBullName: editData.ReproRecords?.[0]?.AIBullName || editData.ReproductionRecords?.[0]?.AIBullName || "",
            NewReproBullName: editData.ReproRecords?.[0]?.BullName || editData.ReproductionRecords?.[0]?.BullName || "",
            NewReproDrName: editData.ReproRecords?.[0]?.DrName || editData.ReproductionRecords?.[0]?.DrName || "",
            NewReproPregnancyCheckDate: editData.ReproRecords?.[0]?.PregnancyCheckDate ? editData.ReproRecords[0].PregnancyCheckDate.split("T")[0] : editData.ReproductionRecords?.[0]?.PregnancyCheckDate ? editData.ReproductionRecords[0].PregnancyCheckDate.split("T")[0] : "",
            NewReproPregnancyStatus: editData.ReproRecords?.[0]?.PregnancyStatus || editData.ReproductionRecords?.[0]?.PregnancyStatus || "",
            NewReproDeliveryDate: editData.ReproRecords?.[0]?.DeliveryDate ? editData.ReproRecords[0].DeliveryDate.split("T")[0] : editData.ReproductionRecords?.[0]?.DeliveryDate ? editData.ReproductionRecords[0].DeliveryDate.split("T")[0] : "",
            NewReproCalfName: editData.ReproRecords?.[0]?.CalfName || editData.ReproductionRecords?.[0]?.CalfName || "",
            NewReproRemark: editData.ReproRecords?.[0]?.Remark || editData.ReproductionRecords?.[0]?.Remark || "",
        } : {
            Id: 0,
            Name: "",
            RegistrationNo: "",
            CreatedAt: "",
            IsSold: false,
            SoldDate: "",
            SoldPrice: 0,
            SoldPersonName: "",
            SoldPersonAddress: "",
            SoldPersonPhoneNo: "",
            Dob: "",
            PurchaseDate: "",
            PurchaseFrom: "",
            PurchaseAddress: "",
            MobileNo: "",
            PurchasePrice: 0,
            GovernmentTagNo: "",
            FatherName: "",
            MotherName: "",
            FatherFatherName: "",
            FatherMotherName: "",
            MotherFatherName: "",
            MotherMotherName: "",
            IsActiveForMilk: false,
            Gender: "Female",
            AnimalType: "Cow",
            NewReproId: 0,
            NewReproCowId: 0,
            NewReproHeatComingDate: "",
            NewReproAIDate: "",
            NewReproAIBullName: "",
            NewReproBullName: "",
            NewReproDrName: "",
            NewReproPregnancyCheckDate: "",
            NewReproPregnancyStatus: "",
            NewReproDeliveryDate: "",
            NewReproCalfName: "",
            NewReproRemark: "",
        }
    );

    const [firstImage, setFirstImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);

    const [firstImagePreview, setFirstImagePreview] = useState(
        editData?.FirstImagePath ? `https://cattlemanagement.runasp.net${editData.FirstImagePath}` : ""
    );
    const [secondImagePreview, setSecondImagePreview] = useState(
        editData?.SecondImagePath ? `https://cattlemanagement.runasp.net${editData.SecondImagePath}` : ""
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Clean up object URLs to prevent memory leak
    useEffect(() => {
        return () => {
            if (firstImagePreview && firstImagePreview.startsWith("blob:")) URL.revokeObjectURL(firstImagePreview);
            if (secondImagePreview && secondImagePreview.startsWith("blob:")) URL.revokeObjectURL(secondImagePreview);
        };
    }, [firstImagePreview, secondImagePreview]);

    const handleFileChange = (e, setFile, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue = type === "checkbox" ? checked : value;

        if (value === "true") finalValue = true;
        if (value === "false") finalValue = false;

        setFormData({
            ...formData,
            [name]: finalValue,
        });
    };

    // ============================================================
    // 🔐 ASP.NET MVC Anti-Forgery Token Helper
    // MVC POST endpoints require __RequestVerificationToken.
    // We fetch it from /Cow/Create (the form page) before submitting.
    // Using native fetch to bypass axiosInstance interceptor & get raw HTML.
    // ============================================================
    const getVerificationToken = async () => {
        try {
            const response = await fetch(
                "https://cattlemanagement.runasp.net/gaushala/Cow/Create",
                { credentials: "include", headers: { Accept: "text/html" } }
            );
            const html = await response.text();
            // Extract token from hidden input: <input name="__RequestVerificationToken" value="...">
            const match = html.match(/name="__RequestVerificationToken"[^>]+value="([^"]+)"/);
            if (match && match[1]) {
                console.log("✅ Anti-forgery token obtained");
                return match[1];
            }
            // Also try the alternate attribute order: value="..." name="..."
            const match2 = html.match(/value="([^"]+)"[^>]+name="__RequestVerificationToken"/);
            if (match2 && match2[1]) {
                console.log("✅ Anti-forgery token obtained (alt)");
                return match2[1];
            }
            console.warn("⚠️ No __RequestVerificationToken found in /Cow/Create form");
            return null;
        } catch (err) {
            console.error("❌ Could not fetch anti-forgery token:", err);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // ============================================================
            // ✅ SWAGGER SPEC: /Cow/Save expects ALL fields as query params.
            // Only FirstImageFile & SecondImageFile go in the multipart body.
            // Reproduction fields use dot-notation: NewRepro.Id, NewRepro.CowId etc.
            // ============================================================
            const params = {};

            // — Basic fields —
            params.Id = formData.Id || 0;
            params.Name = formData.Name;
            params.RegistrationNo = formData.RegistrationNo;
            params.IsSold = formData.IsSold;
            params.IsActiveForMilk = formData.IsActiveForMilk;
            params.Gender = formData.Gender;
            params.AnimalType = formData.AnimalType;

            // — Date fields (must be ISO 8601 strings) —
            if (formData.CreatedAt) params.CreatedAt = new Date(formData.CreatedAt).toISOString();
            if (formData.Dob) params.Dob = new Date(formData.Dob).toISOString();
            if (formData.PurchaseDate) params.PurchaseDate = new Date(formData.PurchaseDate).toISOString();

            // — Purchase / Contact fields —
            if (formData.PurchaseFrom)     params.PurchaseFrom     = formData.PurchaseFrom;
            if (formData.PurchaseAddress)  params.PurchaseAddress  = formData.PurchaseAddress;
            if (formData.MobileNo)         params.MobileNo         = formData.MobileNo;
            if (formData.PurchasePrice)    params.PurchasePrice    = formData.PurchasePrice;
            if (formData.GovernmentTagNo)  params.GovernmentTagNo  = formData.GovernmentTagNo;

            // — Genealogy fields —
            if (formData.FatherName)       params.FatherName       = formData.FatherName;
            if (formData.MotherName)       params.MotherName       = formData.MotherName;
            if (formData.FatherFatherName) params.FatherFatherName = formData.FatherFatherName;
            if (formData.FatherMotherName) params.FatherMotherName = formData.FatherMotherName;
            if (formData.MotherFatherName) params.MotherFatherName = formData.MotherFatherName;
            if (formData.MotherMotherName) params.MotherMotherName = formData.MotherMotherName;

            // — Sale fields (only when sold) —
            if (formData.IsSold) {
                if (formData.SoldDate)         params.SoldDate          = new Date(formData.SoldDate).toISOString();
                if (formData.SoldPrice)        params.SoldPrice         = formData.SoldPrice;
                if (formData.SoldPersonName)   params.SoldPersonName    = formData.SoldPersonName;
                if (formData.SoldPersonAddress) params.SoldPersonAddress = formData.SoldPersonAddress;
                if (formData.SoldPersonPhoneNo) params.SoldPersonPhoneNo = formData.SoldPersonPhoneNo;
            }

            // — Reproduction fields: Swagger uses "NewRepro.FieldName" dot-notation —
            if (formData.NewReproId)                params["NewRepro.Id"]                = formData.NewReproId;
            if (formData.NewReproCowId)             params["NewRepro.CowId"]             = formData.NewReproCowId;
            if (formData.NewReproHeatComingDate)    params["NewRepro.HeatComingDate"]    = new Date(formData.NewReproHeatComingDate).toISOString();
            if (formData.NewReproAIDate)            params["NewRepro.AIDate"]            = new Date(formData.NewReproAIDate).toISOString();
            if (formData.NewReproAIBullName)        params["NewRepro.AIBullName"]        = formData.NewReproAIBullName;
            if (formData.NewReproBullName)          params["NewRepro.BullName"]          = formData.NewReproBullName;
            if (formData.NewReproDrName)            params["NewRepro.DrName"]            = formData.NewReproDrName;
            if (formData.NewReproPregnancyCheckDate) params["NewRepro.PregnancyCheckDate"] = new Date(formData.NewReproPregnancyCheckDate).toISOString();
            if (formData.NewReproPregnancyStatus)   params["NewRepro.PregnancyStatus"]   = formData.NewReproPregnancyStatus;
            if (formData.NewReproDeliveryDate)      params["NewRepro.DeliveryDate"]      = new Date(formData.NewReproDeliveryDate).toISOString();
            if (formData.NewReproCalfName)          params["NewRepro.CalfName"]          = formData.NewReproCalfName;
            if (formData.NewReproRemark)            params["NewRepro.Remark"]            = formData.NewReproRemark;

            // — Images ONLY go in multipart/form-data body —
            const imageBody = new FormData();
            if (firstImage)  imageBody.append("FirstImageFile",  firstImage);
            if (secondImage) imageBody.append("SecondImageFile", secondImage);

            console.log("📤 QUERY PARAMS =>", params);
            console.log("🖼️ IMAGE BODY entries:");
            for (let pair of imageBody.entries()) {
                console.log("  ", pair[0], ":", pair[1]);
            }

            // POST: params in URL query string, images in multipart body
            const res = await axiosInstance.post("/gaushala/Cow/Save", imageBody, { params });

            console.log("SUCCESS =>", res.data);
            alert(editData ? "Cattle Updated Successfully!" : "Cattle Saved Successfully!");
            navigate("/admin-dashboard/cows");
        } catch (error) {
            console.error("❌ POST ERROR:", error.response || error.message);

            const serverResponse = error.response?.data;
            if (serverResponse) {
                console.log("🔴 SERVER ERROR DATA (JSON):", JSON.stringify(serverResponse, null, 2));

                // Show validation errors to the user in a beautiful JSON format in the alert
                const detailedErrors = serverResponse.errors
                    ? JSON.stringify(serverResponse.errors, null, 2)
                    : JSON.stringify(serverResponse, null, 2);

                alert(`Validation Failed (400 Bad Request):\n${detailedErrors}`);
            } else {
                alert("Something went wrong: " + error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex justify-center items-center text-white shadow-md shadow-indigo-100">
                        <i className="fa-solid fa-cow text-2xl"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                            {editData ? "Edit Cattle Details" : "Add New Cattle"}
                        </h2>
                        <p className="text-slate-500 text-sm mt-0.5">
                            {editData ? "Modify registry details of this cow/buffalo" : "Register a new cow or buffalo with complete profiles"}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* SECTION 1: Basic Information */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-white font-semibold flex items-center gap-2">
                            <i className="fa-solid fa-circle-info"></i>
                            <span>Cattle Master Info</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <Input
                                label="Name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                                placeholder="Enter cow name"
                            />

                            <Input
                                label="Registration No"
                                name="RegistrationNo"
                                value={formData.RegistrationNo}
                                onChange={handleChange}
                                required
                                placeholder="Enter Registration No"
                            />

                            <Input
                                label="Created At"
                                type="date"
                                name="CreatedAt"
                                value={formData.CreatedAt}
                                onChange={handleChange}
                            />

                            <Select
                                label="Animal Type"
                                name="AnimalType"
                                value={formData.AnimalType}
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="Cow">Cow</option>
                                <option value="Buffalo">Buffalo</option>
                            </Select>

                            <Select
                                label="Gender"
                                name="Gender"
                                value={formData.Gender}
                                onChange={handleChange}
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </Select>

                            <Input
                                label="DOB"
                                type="date"
                                name="Dob"
                                value={formData.Dob}
                                onChange={handleChange}
                            />

                            <Select
                                label="Is Active For Milk"
                                name="IsActiveForMilk"
                                value={formData.IsActiveForMilk ? "true" : "false"}
                                onChange={handleChange}
                            >
                                <option value="false">No (False)</option>
                                <option value="true">Yes (True)</option>
                            </Select>
                        </div>
                    </div>

                    {/* SECTION 2: Purchase Details */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white font-semibold flex items-center gap-2">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>Purchase Details</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <Input
                                label="Purchase Date"
                                type="date"
                                name="PurchaseDate"
                                value={formData.PurchaseDate}
                                onChange={handleChange}
                            />

                            <Input
                                label="Purchase From"
                                name="PurchaseFrom"
                                value={formData.PurchaseFrom}
                                onChange={handleChange}
                                placeholder="Seller's name"
                            />

                            <Input
                                label="Mobile No"
                                name="MobileNo"
                                value={formData.MobileNo}
                                onChange={handleChange}
                                placeholder="Seller's phone number"
                            />

                            <Input
                                label="Purchase Price"
                                type="number"
                                name="PurchasePrice"
                                value={formData.PurchasePrice || ""}
                                onChange={handleChange}
                                placeholder="Amount paid"
                            />

                            <Input
                                label="Government Tag No"
                                name="GovernmentTagNo"
                                value={formData.GovernmentTagNo}
                                onChange={handleChange}
                                placeholder="Government tag ID"
                            />

                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Input
                                    label="Purchase Address"
                                    name="PurchaseAddress"
                                    value={formData.PurchaseAddress}
                                    onChange={handleChange}
                                    placeholder="Complete purchase address"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Genealogy */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-4 text-white font-semibold flex items-center gap-2">
                            <i className="fa-solid fa-tree"></i>
                            <span>Ancestry / Genealogy</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <Input label="Father Name" name="FatherName" value={formData.FatherName} onChange={handleChange} placeholder="Father (Sire)" />
                            <Input label="Mother Name" name="MotherName" value={formData.MotherName} onChange={handleChange} placeholder="Mother (Dam)" />
                            <Input label="Father Father Name" name="FatherFatherName" value={formData.FatherFatherName} onChange={handleChange} placeholder="Father's Father" />
                            <Input label="Father Mother Name" name="FatherMotherName" value={formData.FatherMotherName} onChange={handleChange} placeholder="Father's Mother" />
                            <Input label="Mother Father Name" name="MotherFatherName" value={formData.MotherFatherName} onChange={handleChange} placeholder="Mother's Father" />
                            <Input label="Mother Mother Name" name="MotherMotherName" value={formData.MotherMotherName} onChange={handleChange} placeholder="Mother's Mother" />
                        </div>
                    </div>

                    {/* SECTION 4: Sale Details */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-white font-semibold flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-dollar-sign"></i>
                                <span>Cattle Sale Details</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="IsSold"
                                        checked={formData.IsSold}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-amber-200/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-amber-600"></div>
                                    <span className="ml-3 text-sm font-semibold text-white">Cattle Has Been Sold?</span>
                                </label>
                            </div>
                        </div>

                        {formData.IsSold && (
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-amber-50/5 transition-all">
                                <Input
                                    label="Sold Date"
                                    type="date"
                                    name="SoldDate"
                                    value={formData.SoldDate}
                                    onChange={handleChange}
                                    required={formData.IsSold}
                                />

                                <Input
                                    label="Sold Price"
                                    type="number"
                                    name="SoldPrice"
                                    value={formData.SoldPrice || ""}
                                    onChange={handleChange}
                                    required={formData.IsSold}
                                    placeholder="Selling Price"
                                />

                                <Input
                                    label="Buyer Name"
                                    name="SoldPersonName"
                                    value={formData.SoldPersonName}
                                    onChange={handleChange}
                                    placeholder="Buyer's full name"
                                />

                                <Input
                                    label="Buyer Phone No"
                                    name="SoldPersonPhoneNo"
                                    value={formData.SoldPersonPhoneNo}
                                    onChange={handleChange}
                                    placeholder="Buyer's contact number"
                                />

                                <div className="col-span-1 md:col-span-2 lg:col-span-4">
                                    <Input
                                        label="Buyer Address"
                                        name="SoldPersonAddress"
                                        value={formData.SoldPersonAddress}
                                        onChange={handleChange}
                                        placeholder="Buyer's complete address"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION 5: Reproduction Details */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-4 text-white font-semibold flex items-center gap-2">
                            <i className="fa-solid fa-baby"></i>
                            <span>Reproduction / Artificial Insemination (AI)</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <Input
                                label="Repro Record Id"
                                type="number"
                                name="NewReproId"
                                value={formData.NewReproId || ""}
                                onChange={handleChange}
                                placeholder="Reproduction Record ID"
                            />

                            <Input
                                label="Repro Cow Id"
                                type="number"
                                name="NewReproCowId"
                                value={formData.NewReproCowId || ""}
                                onChange={handleChange}
                                placeholder="Cow identifier ID"
                            />

                            <Input
                                label="Heat Coming Date"
                                type="date"
                                name="NewReproHeatComingDate"
                                value={formData.NewReproHeatComingDate}
                                onChange={handleChange}
                            />

                            <Input
                                label="AI Date"
                                type="date"
                                name="NewReproAIDate"
                                value={formData.NewReproAIDate}
                                onChange={handleChange}
                            />

                            <Input
                                label="AI Bull Name"
                                name="NewReproAIBullName"
                                value={formData.NewReproAIBullName}
                                onChange={handleChange}
                                placeholder="AI Bull ID / Name"
                            />

                            <Input
                                label="Natural Bull Name"
                                name="NewReproBullName"
                                value={formData.NewReproBullName}
                                onChange={handleChange}
                                placeholder="Natural Bull ID / Name"
                            />

                            <Input
                                label="Doctor Name"
                                name="NewReproDrName"
                                value={formData.NewReproDrName}
                                onChange={handleChange}
                                placeholder="Vet Doctor's Name"
                            />

                            <Input
                                label="Pregnancy Check Date"
                                type="date"
                                name="NewReproPregnancyCheckDate"
                                value={formData.NewReproPregnancyCheckDate}
                                onChange={handleChange}
                            />

                            <Input
                                label="Pregnancy Status"
                                name="NewReproPregnancyStatus"
                                value={formData.NewReproPregnancyStatus}
                                onChange={handleChange}
                                placeholder="e.g. Positive, Negative, Suspicious"
                            />

                            <Input
                                label="Delivery Date"
                                type="date"
                                name="NewReproDeliveryDate"
                                value={formData.NewReproDeliveryDate}
                                onChange={handleChange}
                            />

                            <Input
                                label="Calf Name"
                                name="NewReproCalfName"
                                value={formData.NewReproCalfName}
                                onChange={handleChange}
                                placeholder="Calf Name / Tag"
                            />

                            <Input
                                label="Remarks"
                                name="NewReproRemark"
                                value={formData.NewReproRemark}
                                onChange={handleChange}
                                placeholder="Special notes or remarks"
                            />
                        </div>
                    </div>

                    {/* SECTION 6: Images */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 text-white font-semibold flex items-center gap-2">
                            <i className="fa-solid fa-image"></i>
                            <span>Cattle Photos</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* First Image Upload Card */}
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50/80 transition-all group">
                                {firstImagePreview ? (
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-inner border border-slate-100">
                                        <img src={firstImagePreview} alt="First Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFirstImage(null);
                                                if (firstImagePreview.startsWith("blob:")) URL.revokeObjectURL(firstImagePreview);
                                                setFirstImagePreview("");
                                            }}
                                            className="absolute top-3 right-3 bg-rose-600 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-rose-700 transition-colors shadow"
                                        >
                                            <i className="fa-solid fa-trash text-sm"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer w-full flex flex-col items-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-600 mb-1">Upload First Photo</span>
                                        <span className="text-xs text-slate-400">Click to select files (PNG, JPG)</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, setFirstImage, setFirstImagePreview)}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Second Image Upload Card */}
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50/80 transition-all group">
                                {secondImagePreview ? (
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-inner border border-slate-100">
                                        <img src={secondImagePreview} alt="Second Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSecondImage(null);
                                                if (secondImagePreview.startsWith("blob:")) URL.revokeObjectURL(secondImagePreview);
                                                setSecondImagePreview("");
                                            }}
                                            className="absolute top-3 right-3 bg-rose-600 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-rose-700 transition-colors shadow"
                                        >
                                            <i className="fa-solid fa-trash text-sm"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer w-full flex flex-col items-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-600 mb-1">Upload Second Photo</span>
                                        <span className="text-xs text-slate-400">Click to select files (PNG, JPG)</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, setSecondImage, setSecondImagePreview)}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-100">
                        <button
                            type="button"
                            onClick={() => navigate("/admin-dashboard/cows")}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold transition-all shadow-md shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                                    <span>Saving Cattle...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-floppy-disk"></i>
                                    <span>Save Cattle</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Refactored helper components using beautiful Tailwind styling
const Input = ({ label, required, ...props }) => (
    <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            {...props}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm text-slate-700 bg-slate-50/50 focus:bg-white"
        />
    </div>
);

const Select = ({ label, children, required, ...props }) => (
    <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            {...props}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm text-slate-700 bg-slate-50/50 focus:bg-white"
        >
            {children}
        </select>
    </div>
);

export default AddCow;