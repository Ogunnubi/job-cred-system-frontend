import React from 'react'

const JobCard = ({job}) => {

    console.log(job)


  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h2 className="h5 fw-bold">{job.title}</h2>
            {job.userId && (
              <p className="text-muted small mb-2">Job ID: {job.id}</p>
            )}
          </div>
          <div className="col-md-4 text-md-end">
            <span className="text-success fw-bold">{job.credits} Credits</span>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-secondary">{job.description}</p>
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
              onClick={console.log("Helo")}
            //   disabled={credits <= 0}
              className="btn btn-primary"
            >
              Apply (1 Credit)
            </button>
          </div>
        </div>
        
        <div className="mt-2">
          <small className="text-muted">
            User ID: {job.userId}
          </small>
        </div>
      </div>
    </div>
  )
}

export default JobCard