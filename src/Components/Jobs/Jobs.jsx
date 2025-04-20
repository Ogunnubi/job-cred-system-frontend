import {useState, useEffect} from 'react'
import {submitJob} from '../../api/jobsApi';
import "./Jobs.css"
import { useAuth } from '../../context/AuthContext';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';



const Jobs = ({}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)
  const [jobCredit, setJobCredit] = useState(0)

  const {
    currentUser,
    setError,
    error,
    setJobs,
    updateUserCredits
  } = useAuth();


  const userId = currentUser?.uid


  const handleSubmit = async (jobCredit) => {
    e.preventDefault();

    // Parse jobCredit to ensure it's a number
    const credits = parseInt(jobCredit);

    if (!userId) {
        setError('User ID is missing. Please log in again.');
        return;
    }
    
    // Validate that job credit is a positive number
    if (isNaN(credits) || credits <= 0) {
      setError("Please enter a valid number of credits greater than zero.");
      return;
    }

    if (currentUser?.credits < 1) {
        setError("Insufficient credits to submit job.");
        return;
    }

    try {

        setLoading(true);
        setError("");
        
        const newJob = {
            title, 
            job_description: description, 
            credits_required: credits
        }

        const result =  await submitJob(newJob, currentUser.token);

        if(result?.data) {

            const newCreditAmount = currentUser?.credits - credits

            await updateUserCredits(userId, newCreditAmount);
           
            console.log(result?.data?.message || "Job submitted successfully!");
            
            // Clear the form
            setTitle("");
            setJobCredit("");
            setDescription("");
            
            setJobs((prevJobs) => [...prevJobs, result?.data]);

        }
    } catch (error) {
        console.error(`API error: ${error}`);
        setError("Error submitting job."); 
    } finally {
        setLoading(false);
    }
  }



    return (
        <div className="col-lg-6">
            <form className='row justify-content-center' onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {/* Job Title */}
            <div className="mb-3 input-group">
                <input 
                type="text" 
                className="form-control border-start-0 border-end-0" 
                id="jobtitle" 
                placeholder='Enter Job Title'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>  
            {/* Job Credits */}
            <div className="mb-3 input-group">
                <input 
                type="number" 
                min="1"
                className="form-control border-start-0 border-end-0" 
                id="jobtitle" 
                placeholder='How much credits do you want to pay'
                required
                value={jobCredit || ""}
                onChange={(e) => setJobCredit(e.target.value)}
                />
            </div>  
            {/* Job Description */}
            <div className="mb-3 input-group">
                <textarea 
                    required
                    name="" 
                    id="jobdescription" 
                    className="form-control border-start-0 border-end-0 custom__textarea" 
                    placeholder='Provide a description about the job'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div> 
            
            {/* button */}
            <div className='col-12 text-center'>
                <button 
                    disabled={currentUser.credits < jobCredit || loading}
                    className='btn btn-brand'>
                    {loading ? "Submitting..." : "Submit Job"}
                </button>
            </div>
        </form>         
    </div>
  )
}

export default Jobs