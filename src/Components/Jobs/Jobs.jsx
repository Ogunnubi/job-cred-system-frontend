import {useState, useEffect} from 'react'
import {getJobs, submitJob} from '../../api/api';
import "./Jobs.css"
import { useAuth } from '../../context/AuthContext';

const Jobs = ({}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false)
  const [jobCredit, setJobCredit] = useState(0)

  const {
    userCredits,
    currentUser,
    setError,
    error
  } = useAuth();


  const userId = currentUser?.uid


  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await getJobs(userId); 
        setJobs(result.data); 
      } catch (error) {
        console.error(`Error fetching jobs: ${error}`);
      }
    };

    fetchJobs();
  }, []); 




  const handleSubmit = async (e) => {
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

    if (userCredits < 1) {
        setError("Insufficient credits to submit job.");
        return;
    }

    try {

        setLoading(true);
        setError("");
        

        const newJob = {
            title, description, credits: jobCredit
        }

        const result = await submitJob(userId, newJob)

        if(result.data) {
            updateUserCredits(userCredits - credits);
           
            console.log(result.data?.message || "Job submitted successfully!");
            
            // Clear the form
            setTitle("");
            setJobCredit("");
            setDescription("");
            
            setJobs((prevJobs) => [...prevJobs, result.data]);
        }
    } catch (error) {
        console.error(`API error: ${error}`);
        setError("Error submitting job."); 
    } finally {
        setLoading(false);
    }
  }


  return (
    <section className='section'>
        <div className="container">
            <div className="row justify-content-center text-center mb-5">
                <div className='intro__page'>
                    <h1 className='heading__one'>Submit Jobs with Credits</h1>
                    <p>A complete platform for managing job submissions with a credit-based system.</p>
                </div>
            </div>

            <form className='row justify-content-center' onSubmit={handleSubmit}>
                <div className="col-lg-6">
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
                    {/* Credits */}
                    <div className="credit d-flex justify-content-between">
                        <h5>Available credits</h5>

                        <strong className='text-center'>200</strong>
                    </div>
                    {/* button */}
                    <div className='col-12 text-center'>
                        <button 
                            disabled={userCredits < jobCredit || loading}
                            className='btn btn-brand'>
                            {loading ? "Submitting..." : "Submit Job"}
                        </button>
                    </div>
                </div>
            </form>



            {/* Render Jobs */}
            <div className="row mt-5">
            <h2 className="text-center mb-5">Submitted Jobs</h2>
            {jobs.length > 0 ? (
                jobs.map((job) => (
                <div key={job.id} className="col-lg-4 mb-4">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text">{job.description}</p>
                        <p className="card-text">
                        <strong>Credits:</strong> {job.credits}
                        </p>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-center">No jobs submitted yet.</p>
            )}
            </div>

        </div>
    </section>
  )
}

export default Jobs