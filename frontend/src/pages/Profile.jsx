import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

function Profile() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    age: "",
    gender: "",
    phone: "",
    address: "",
    height: "",
    weight: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    const savedReports = localStorage.getItem("reportsData");

    if (savedProfile) setProfileData(JSON.parse(savedProfile));
    if (savedReports) setReports(JSON.parse(savedReports));
  }, []);

  // Save profileData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

  // Save reports to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("reportsData", JSON.stringify(reports));
  }, [reports]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Data is already saved to localStorage via useEffect
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newReports = files.map((file, index) => ({
      id: Date.now() + index, // unique id
      name: file.name,
      date: new Date().toLocaleDateString(),
      url: URL.createObjectURL(file),
    }));
    setReports([...reports, ...newReports]);
  };

  const handleDeleteReport = (reportId) => {
    setReports(reports.filter((report) => report.id !== reportId));
  };

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-[#f5cbb0] rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.imageUrl || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-2xl font-bold capitalize text-[#2e4856]">"{user?.fullName}"</h1>
            <p className="text-[#7093ab]">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#f5cbb0] rounded-lg shadow">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 font-medium ${
              activeTab === "profile"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-6 py-3 font-medium ${
              activeTab === "reports"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Reports
          </button>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-xl font-semibold text-[#2e4856]">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["age", "gender", "phone", "address", "height", "weight"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-[#2e4856] mb-1 capitalize">
                      {field.replace("_", " ")}
                    </label>
                    {field === "gender" ? (
                      <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 border rounded-md disabled:bg-gray-100"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <input
                        type={["age", "height", "weight"].includes(field) ? "number" : "text"}
                        name={field}
                        value={profileData[field]}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 border rounded-md disabled:bg-gray-100"
                      />
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#2e4856]">Medical Reports</h2>

              <div className="mb-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {reports.length > 0 && (
                <div className="space-y-2">
                  {reports.map((report) => (
                    <div key={report.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-gray-600">Uploaded: {report.date}</p>
                      </div>
                      <button
                        onClick={() => window.open(report.url)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
