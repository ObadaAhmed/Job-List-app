import React, { useEffect, useState } from 'react'
import JobListing from './JobListing'
import ClipLoaderSpinner from './ClipLoaderSpinner'


const Joblistings = ({isHomePage = false}) => {
  const [jobs , setJobs] = useState([])
  const [loading , setLoading] = useState(true)


  useEffect(() => {
    const fecthJobs = async () => {
      try {
        const res = await fetch('http://localhost:8080/jobs');
        const data = await res.json();
        setJobs(data)
      } catch (error) {
        console.error('error fetching Jobs Data : ' , error)
      }finally {
        setLoading(false)
      }
    }
    fecthJobs();
  } , [])
 
  return (
    <section className='bg-blue-50 px-4 py-10'>
    <div className='container-xl lg:container m-auto'>
      <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
        {isHomePage ? 'Recent Jobs' : 'Browse Jobs'}
      </h2>

      {loading ? (
        <ClipLoaderSpinner loading={loading} />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {jobs.map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  </section>
  )
}

export default Joblistings