// File: src/components/Header.js
import React from 'react';
import { PlusIcon, UserIcon, Search } from 'lucide-react';

const Header = ({ onAddClick, onSearch, searchTerm }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <UserIcon size={20} className="text-blue-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Student Management System
            </h1>
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
            {/* Search box */}
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by email"
                className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 text-gray-700"
              />
            </div>
            
            {/* Add Student button */}
            <button
              onClick={onAddClick}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center transition-colors duration-200 font-medium shadow-sm whitespace-nowrap text-white !text-white"
            >
              <PlusIcon size={18} className="mr-1" />
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;