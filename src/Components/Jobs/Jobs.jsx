import {useState} from 'react'
import api from '../../api/api';
import "./Jobs.css"
import { useAuth } from '../../context/AuthContext';

const Jobs = ({}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {
    userCredits,
    token
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const result = await api.post()
       
        setResponse(result.data?.message || "Job submitted successfully!");
    } catch (error) {
        console.error("API error:", error);
        setResponse("Error submitting job."); 
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
                    <div className="input-group">
                        <p className='text-center'>Your available credits {}</p>
                    </div>
                    {/* button */}
                    <div className='col-12 text-center'>
                        <button className='btn btn-brand'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Jobs