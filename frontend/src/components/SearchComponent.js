import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/search`);
      setResults(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <div>Error: {error.message}</div>}
      <ul>
        {results.map(user => (
          <li key={user._id}>
            <img src={user.profilePicture} alt={user.username} width="50" />
            <strong>{user.username}</strong> - {user.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
