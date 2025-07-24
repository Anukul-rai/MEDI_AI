import { Link } from "react-router-dom";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { PiMedalDuotone } from "react-icons/pi";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function DoctorCard({ name, Specialization, city, location, experience }) {
  const [openModal, setOpenModal] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    });
  };

  const handleBookAppointment = async () => {
    // Validate form
    if (!appointmentDetails.name || !appointmentDetails.email || !appointmentDetails.date || !appointmentDetails.time) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/appoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...appointmentDetails,
          doctorName: name,
          doctorSpecialization: Specialization,
          doctorCity: city,
          doctorLocation: location,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setOpenModal(false);
        setConfirmationModalOpen(true);
      } else {
        toast.error("Failed to book the appointment. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleConfirmAppointment = () => {
    setConfirmationModalOpen(false);
    setOpenModal(false);
    setAppointmentDetails({ name: "", email: "", date: "", time: "" }); // Reset form
    toast.success("Appointment booked successfully!");
  };

  const handleConfirmationModalClose = () => {
    setConfirmationModalOpen(false);
    setOpenModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 max-w-sm mx-auto">
        {/* Doctor Info Section */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <img
              src="https://i.pinimg.com/736x/06/b1/85/06b185e5b2322f1ab0557db59b554cd5.jpg"
              alt={`Dr. ${name}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
              {name}
            </h3>
            <p className="text-blue-600 font-medium text-sm mb-3">
              {Specialization}
            </p>
            
            {/* Location */}
            <div className="flex items-center text-gray-600 mb-2">
              <span className="text-red-500 w-4 h-4 mr-2 flex-shrink-0">📍</span>
              <span className="text-sm truncate">{city}, {location}</span>
            </div>
            
            {/* Experience */}
            <div className="flex items-center text-gray-600">
              <span className="text-yellow-500 w-5 h-5 mr-2 flex-shrink-0">🏅</span>
              <span className="text-sm">{experience} years experience</span>
            </div>
          </div>
        </div>

        {/* Book Appointment Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="w-full bg-[#EFBC9B] hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          Book Appointment
        </button>
      </div>

      {/* Booking Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={appointmentDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={appointmentDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={appointmentDetails.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={appointmentDetails.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Time Slot</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={handleBookAppointment}
                  className="flex-1 bg-[#EFBC9B] hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Book Appointment
                </button>
                <button
                  onClick={handleModalClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Appointment</h2>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Patient:</span>
                  <span className="text-gray-800">{appointmentDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="text-gray-800">{appointmentDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Date:</span>
                  <span className="text-gray-800">{appointmentDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Time:</span>
                  <span className="text-gray-800">{appointmentDetails.time}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Doctor:</span>
                  <span className="text-gray-800">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Specialization:</span>
                  <span className="text-gray-800">{Specialization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Location:</span>
                  <span className="text-gray-800">{location}, {city}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Visiting Fee:</span>
                  <div className="text-right">
                    <span className="font-bold text-green-600 text-lg">Rs. 500</span>
                    <p className="text-xs text-gray-500">(Pay during visit)</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleConfirmationModalClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Edit Details
                </button>
                <button
                  onClick={handleConfirmAppointment}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorCard;