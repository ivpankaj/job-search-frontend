import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by location"
        className="p-2 border border-gray-300 rounded w-full"
      />
    </div>
  );
};

export default SearchBar;
