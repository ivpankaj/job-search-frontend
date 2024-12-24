import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Share2, 
  BriefcaseBusiness 
} from 'lucide-react';
import JobList from './JobList';

const JobDetail = ({ job }) => {
  if (!job) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a job to view details
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            {job.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">{job.company}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{job.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigator.share({ 
              title: job.title,
              text: `${job.title} at ${job.company}`,
              url: window.location.href
            })}
          >
            <Share2 className="w-5 h-5 text-gray-500" />
          </button>
          <button 
            onClick={() => window.open(job.applyUrl, '_blank')}
            className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700"
          >
            Quick Apply
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex gap-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <BriefcaseBusiness className="w-4 h-4" />
          <span>{job.employmentType || 'Full-time'}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{job.datePosted} days ago</span>
        </div>
        <div>
          <span>{job.salary}</span>
        </div>
      </div>


      {job.qualifications && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-2">Qualifications</h2>
          <div className="flex flex-wrap gap-2">
            {job.qualifications.map((qual, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {qual}
              </span>
            ))}
          </div>
        </div>
      )}

  
    </div>
  );
};

const JobListContainer = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-50 min-h-screen">
      <div className="flex w-full max-w-7xl gap-8">
        {/* Job List Section */}
        <div className="w-1/3 bg-white rounded-lg shadow-md overflow-y-auto h-[calc(100vh-100px)]"> {/* Adjust the height as needed */}
          <JobList onSelectJob={handleSelectJob} />
        </div>

        {/* Job Details Section */}
        <div className="w-2/3 bg-white rounded-lg shadow-md">
          <JobDetail job={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default JobListContainer;
