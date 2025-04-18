import {useEffect, useState} from 'react'
import { getJobs } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import JobsList from '../JobsList/JobsList';
import "./Indeed.css"
import { Link } from 'react-router-dom';

const Indeed = () => {


  const { setError, error, userCredits, jobs, setJobs, currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  console.log(currentUser)

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const result = await getJobs(currentUser);
        const jobData = result.data; 
        console.log(jobData);
        setJobs(jobData);
        setError("");
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [jobs]);


    
  return (

    <section className="section">
      <div className="container">
        <div className="credits__notif d-flex justify-content-between align-items-center mt-0 mb-5">
          {/* <p className='fw-bold'>Credits</p>
          <div className="">
            <p>You have {userCredits} credits left.</p>
          </div> */}
          <h5 className='fw-bold'>Credits</h5>
            <div className="alert alert-info mb-4 credits__notif__text" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              Current Balance: {userCredits} credits
              {userCredits < 10 && ( 
                <Link to="/credits" className="credits__notif__text__link d-block">
                  Top Up
                </Link>
              )}
            </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className='intro__page'>
            <h1 className='heading__one'>Submit Jobs with Credits</h1>
            <p>A complete platform for managing job submissions with a credit-based system.</p>
          </div>

          <div className="col-lg-7">
            {isLoading ? (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">{error}</div>
              ) : (
                <JobsList jobs={jobs} />
              )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Indeed