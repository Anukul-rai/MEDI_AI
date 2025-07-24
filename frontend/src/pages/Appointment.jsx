import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import DoctorCard from "../components/DoctorCard";
import { doctors } from "../components/DoctorList";

const specializations = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Gynecologist",
  "Pediatrician",
  "Orthopedic",
  "Ophthalmologist",
  "Psychiatrist",
  "ENT Specialist",
];

const cities = [
  "Kathmandu",
  "Bhaktapur",
  "Lalitpur",
  "Jhapa",
  "Chitwan",
  "Janakpur",
  "Pokhara",
  "Hetauda",
  "Dharan",
];

function DoctorRecommend() {
const [filters, setFilters] = useState({
    specialization: "",
    city: "",
    searchQuery: "",
  });

  // Filter doctors based on all criteria
const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
    const matchesSpecialization =
        !filters.specialization ||
        doctor.Specialization.toLowerCase().includes(
        filters.specialization.toLowerCase()
        );

    const matchesCity =
        !filters.city ||
        doctor.city.toLowerCase().includes(filters.city.toLowerCase());

    const matchesSearch =
        !filters.searchQuery ||
        doctor.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        doctor.Specialization.toLowerCase().includes(
        filters.searchQuery.toLowerCase()
        ) ||
        doctor.city.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesSpecialization && matchesCity && matchesSearch;
    });
}, [filters]);

const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
};

const clearFilters = () => {
    setFilters({ specialization: "", city: "", searchQuery: "" });
};

const hasActiveFilters =
    filters.specialization || filters.city || filters.searchQuery;

return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="w-full h-[350px] bg-right bg-doc bg-cover bg-fixed ">
            <div className="w-full h-full bg-black/30 bg-opacity-60 flex flex-col justify-center items-center px-10">
            <h1 className="text-6xl top-20 justify-start items-center text-white font-text font-bold">
                Find Doctor
            </h1>
            <p className="text-white italic">
                "Effortless doctor appointments: Book with ease, stay healthy!"
            </p>
            </div>
        </div>

        {/* Search Filters */}
        <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
            <div className="bg-[#eaccb9] rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Search Input */}
                <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search Doctors
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                    type="text"
                    placeholder="Search by name, specialization, or city..."
                    value={filters.searchQuery}
                    onChange={(e) =>
                        handleFilterChange("searchQuery", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                </div>

                {/* Specialization Filter */}
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialization
                </label>
                <select
                    value={filters.specialization}
                    onChange={(e) =>
                    handleFilterChange("specialization", e.target.value)
                    }
                    className="w-full bg-white py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                    <option value="">All Specializations</option>
                    {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                        {spec}
                    </option>
                    ))}
                </select>
                </div>

                {/* City Filter */}
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                </label>
                <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange("city", e.target.value)}
                    className="w-full bg-white py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                    ))}
                </select>
                </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                <button
                    onClick={clearFilters}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <X className="w-4 h-4 mr-1" />
                    Clear all filters
                </button>
                </div>
            )}
            </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-6 py-12 " >
            <div className="flex justify-center items-center mb-8 ">
            <h2 className="text-2xl font-bold text-gray-700 ">
                Available Doctors
                <span className="text-blue-400 ml-2">
                ({filteredDoctors.length})
                </span>
            </h2>
            </div>

            {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                <DoctorCard
                    key={doctor.id}
                    name={doctor.name}
                    city={doctor.city}
                    location={doctor.location}
                    Specialization={doctor.Specialization}
                    rating={doctor.rating}
                    experience={doctor.experience}
                />
                ))}
            </div>
            ) : (
            <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No doctors found
                </h3>
                <p className="text-gray-500 mb-4">
                Try adjusting your search criteria
                </p>
                {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Clear all filters
                </button>
                )}
            </div>
            )}
        </div>
        </div>
    );
}

export default DoctorRecommend;
