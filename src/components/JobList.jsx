import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component

const JobList = ({ onSelectJob }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch jobs when the search query or page changes
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/jobs/get?page=${currentPage}&limit=20`;

        if (searchQuery) {
          url = `http://localhost:5000/api/jobs/search?location=${searchQuery}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (data.jobs) {
          if (currentPage === 1 && !searchQuery) {
            setJobs(data.jobs); // Reset jobs if it's the first page without a search query
          } else {
            setJobs((prevJobs) => [...prevJobs, ...data.jobs]); // Append jobs for pagination
          }
          setTotalPages(data.totalPages || 1); // Set total pages (add a fallback in case it's missing)
        } else {
          setError('No jobs found');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setJobs([]);
  };

  const loadMoreJobs = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="p-4">
      {/* Search bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* Loading, error, or jobs display */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-500">No jobs found.</div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}  // Use job._id for unique key (if job.id is not unique)
              onClick={() => onSelectJob(job)}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-bold text-blue-800">{job.title}</h3>
              <p className="text-gray-700">{job.location}</p>
              <p className="text-gray-500 text-sm">{job.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-green-600 font-semibold">{job.salary}</span>
                <span className="text-gray-400 text-sm">{job.datePosted} days ago</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && jobs.length > 0 && currentPage < totalPages && (
        <div className="mt-4 text-center">
          <button
            onClick={loadMoreJobs}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;
