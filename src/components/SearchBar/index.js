import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const SearchBar = ({ handleSearchKey, clearSearch }) => {
  const [searchKey, setSearchKey] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
    handleSearchKey(e.target.value);
  };

  const handleClear = () => {
    setSearchKey('');
    clearSearch();
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect to the search results page with the search key as a query parameter (optional)
    navigate(`/search?category=${encodeURIComponent(searchKey)}`);
  };

  return (
    <div className='searchBar-wrap'>
      <form onSubmit={handleSearchSubmit}>
        <input
          type='text'
          onChange={handleSearchChange}
          placeholder='Search By Category'
          value={searchKey}
        />
        <button type='submit'>
          <i className='gg-search'></i>
        </button>
      </form>
      {searchKey && <span onClick={handleClear}>X</span>}
    </div>
  );
};

export default SearchBar;
