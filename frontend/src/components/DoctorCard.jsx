import { useState } from "react";
import { toast } from "react-toastify";

function DoctorCard({
  name,
  Specialization,
  city,
  location,
  experience,
  predictedSpecialization,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  const handleBookAppointment = () => {
    if (!appointmentDetails.name || !appointmentDetails.email || !appointmentDetails.date || !appointmentDetails.time) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Booked successfully");
    setAppointmentDetails({ name: "", email: "", date: "", time: "" });
    setOpenModal(false);
  };

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 
        ${
          predictedSpecialization && Specialization !== predictedSpecialization
            ? "opacity-50 pointer-events-none"
            : "hover:shadow-xl hover:border-blue-200"
        }`}
      >
        <div className="flex-shrink-0"> 
          <img src="https://i.pinimg.com/736x/06/b1/85/06b185e5b2322f1ab0557db59b554cd5.jpg" alt={`Dr. ${name}`} className="w-20 h-20 rounded-full object-cover border-4 border-blue-100" /> 
        </div>
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-blue-600 font-medium text-sm mb-3">{Specialization}</p>
        <p className="text-gray-600 mb-3">
          📍 {city}, {location}
        </p>
        <p className="text-gray-600">🏅 {experience} years experience</p>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full bg-[#EFBC9B] hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-xl mt-4 transition-all duration-200"
        >
          Book Appointment
        </button>
      </div>

      {/* Booking Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={appointmentDetails.name}
              onChange={handleInputChange}
              className="w-full mb-4 px-4 py-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={appointmentDetails.email}
              onChange={handleInputChange}
              className="w-full mb-4 px-4 py-3 border rounded-lg"
            />
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={appointmentDetails.date}
              onChange={handleInputChange}
              className="w-full mb-4 px-4 py-3 border rounded-lg"
            />
            <select
              name="time"
              value={appointmentDetails.time}
              onChange={handleInputChange}
              className="w-full mb-4 px-4 py-3 border rounded-lg"
            >
              <option value="">Select Time Slot</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>

            <button
              onClick={handleBookAppointment}
              className="w-full bg-green-600 text-white py-3 rounded-lg"
            >
              Confirm Booking
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="w-full mt-2 bg-gray-100 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorCard;
