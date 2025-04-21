import {useState, useEffect} from 'react'
import {getJobs, submitJob, updateUserCredits} from '../../api/jobsApi';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const JobCard = ({job}) => {


    const {
      userCredits,
      currentUser,
      setError,
      setJobs,
      setLoading, 
      updateUserCredits
    } = useAuth();
    
    
    const token = localStorage.getItem("authToken");
    const userId = currentUser?.accessToken ? jwtDecode(token)?.id : null;

    const handleJobSubmission = async () => {
        
        
        // Parse jobCredit to ensure it's a number
        const credits = parseInt(job.credits_required);
    
        if (!userId) {
            setError('User ID is missing. Please log in again.');
            return;
        }
        
        // Validate that job credit is a positive number
        if (isNaN(credits) || credits <= 0) {
            setError("Please enter a valid number of credits greater than zero.");
            return;
        }
    
        if (userCredits < 1) {
            setError("Insufficient credits to submit job.");
            return;
        }
    
        try {
    
            setLoading(true);
            setError("");
            
    
            const newJob = {
              title: job.title, description: job.description, credits: job.credits    
            }
    
            const result = await submitJob(userId, newJob)
    
            if(result) {
    
                const newCreditAmount = userCredits - credits
    
                await updateUserCredits(userId, newCreditAmount);
                
                console.log(result.data?.message || "Job submitted successfully!");
                
                // Clear the form
                setTitle("");
                setJobCredit("");
                setDescription("");
                
                setJobs((prevJobs) => [...prevJobs, result]);
    
            }
        } catch (error) {
            console.error(`API error: ${error}`);
            setError("Error submitting job."); 
        } finally {
            setLoading(false);
        }
    }


  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h4 className="h5 fw-bold">{job.title}</h4>
            {job.userId && (
              <p className="text-muted small mb-2">Job ID: {job.id}</p>
            )}
          </div>
          <div className="col-md-4 text-md-end">
            <span className="text-success fw-bold">{job.credits_required} Credits</span>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-secondary">{job.job_description}</p>
        </div>
        
        <div className="mt-3 pt-3 border-top">
          <div className="d-flex justify-content-between align-items-center">
            {/* <div className="mb-2">
              
              {job.tags && job.tags.map(tag => (
                <span key={tag} className="badge bg-light text-primary me-2">
                  {tag}
                </span>
              ))}
            </div> */}
            
            <button 
              onClick={handleJobSubmission}
            //   disabled={credits <= 0}
              className="btn btn-brand"
            >
              Apply
            </button>
          </div>
        </div>
        
        {/* <div className="mt-2">
          <small className="text-muted">
            User ID: {job.userId}
          </small>
        </div> */}
      </div>
    </div>
  )
}

export default JobCard