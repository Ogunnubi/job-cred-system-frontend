import {useState, useEffect} from 'react'
import "./Jobs.css"
import { useAuth } from '../../context/AuthContext';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import {jwtDecode} from 'jwt-decode';

// import {submitJob} from '../../api/jobsApi';
// import { axiosPrivate } from '../../api/axios';


const Jobs = ({}) => {


    const axiosPrivate = useAxiosPrivate();
    

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)
    const [jobCredit, setJobCredit] = useState(0)

    
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }, [error]);

    const {
        currentUser,
        setError,
        error,
        setJobs
    } = useAuth();


    const token = localStorage.getItem("authToken");
    const userId = currentUser?.accessToken ? jwtDecode(token)?.id : null;


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

        if (currentUser?.credits < 1) {
            setError("Insufficient credits to submit job.");
            return;
        }

        try {

            setLoading(true);
            setError("");

            console.log(userId)
            
            const newJob = {
                title, 
                job_description: description, 
                credits_required: credits,
                posted_by: userId
            }

            // const result =  await submitJob(newJob, currentUser.token);

            const result = await axiosPrivate.post('/jobs', newJob)

            console.log("Job submission response:", result.data);

            if(result?.data) {

                toast.success("Job submitted successfully!", {
                    position: "top-center",
                    autoClose: 3000
                });
                
                // Clear the form
                setTitle("");
                setJobCredit(0);
                setDescription("");
                
                setJobs((prevJobs) => [...prevJobs, result?.data]);

            }
        } catch (error) {
            console.error(`API error: ${error}`);
            setError("Error submitting job." || error.response?.data?.message); 
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="col-lg-6">
            <form className='row justify-content-center' onSubmit={handleSubmit}>

            <ToastContainer />

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