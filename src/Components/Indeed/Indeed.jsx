import {useEffect, useState} from 'react'
import { getJobs } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import JobsList from '../JobsList/JobsList';

const Indeed = () => {


  const { setError, error } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const result = await getJobs();
        const jobData = result.data; 
        console.log(jobData);
        setJobs(jobData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();


  }, []);


    
  return (

    <section className="section">
      <div className="container">
        <div className="row align-items-center">
          <div className='intro__page'>
            <h1 className='heading__one'>Submit Jobs with Credits</h1>
            <p>A complete platform for managing job submissions with a credit-based system.</p>
          </div>

            <div className="col-lg-7">
              
            </div>




        </div>
      </div>
    </section>
  )
}

export default Indeed