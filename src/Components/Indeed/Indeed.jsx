import {useEffect, useState} from 'react'
import { getJobs } from '../../api/jobsApi';
import { useAuth } from '../../context/AuthContext';
import JobsList from '../JobsList/JobsList';
import "./Indeed.css";
import { Link } from 'react-router-dom';
import Jobs from '../Jobs/Jobs';


// import useAxiosPrivate from '../../Hooks/useAxiosPrivate';


const Indeed = () => {

  // const api = useAxiosPrivate();


  const { 
    setError, 
    jobs, 
    setJobs, 
    currentUser,
    error, 
    updateUserCredits
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

    const controller = new AbortController();

    const loadJobs = async () => {
      try {
        setIsLoading(true);
        if (currentUser?.token) {
          const fetchedJobs = await getJobs(currentUser.token, controller.signal);
          setJobs(fetchedJobs);
        }
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();


    return () => {
      controller.abort();
    }


  }, [currentUser, setError]);







  


    
  return (

    <section className="section">
      <div className="container">

        <div className="credits__notif d-flex justify-content-between align-items-center mt-0 mb-5">
          <h5 className='fw-bold'>Credits</h5>
            <div className="alert alert-info mb-4 credits__notif__text" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              Current Balance: {currentUser.credits} credits
              {currentUser.credits < 10 && ( 
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

          <Jobs />

          <div className="col-lg-7">
            {isLoading ? (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
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