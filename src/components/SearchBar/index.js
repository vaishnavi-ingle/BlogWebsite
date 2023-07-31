import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search by category..."
      />
    </div>
  );
};

export default SearchBar;
