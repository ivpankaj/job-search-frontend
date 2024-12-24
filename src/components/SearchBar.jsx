import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => (
  <div className="flex items-center space-x-2 mb-2">
    <input
      type="text"
      value={searchQuery}
      onChange={onSearchChange}
      placeholder="Search by location..."
      className="border border-gray-300 rounded px-4 py-2 w-full"
    />
    <button
      onClick={onSearchSubmit}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Search
    </button>
  </div>
);


export default SearchBar;
