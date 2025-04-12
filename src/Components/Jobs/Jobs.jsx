import {useState} from 'react'
import api from '../../api/api';

const Jobs = ({userCredits, token}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
                        <input 
                        type="text" 
                        className="form-control border-start-0 border-end-0" 
                        id="jobdescription" 
                        placeholder='Enter Job Description'
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div> 
                </div>
            </form>
        </div>
    </section>
  )
}

export default Jobs