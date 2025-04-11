import React from 'react'

const Home = () => {

  return (
    <section className='section'>
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className='intro__page'>
                        <h1>WeWork</h1>
                        <p>Submit Jobs with Credits</p>
                    </div>
                </div>

                <div className="col-lg-6 offset-lg-1">
                    <form action="row g-3 px-3">
                        {/* name input */}
                        <div className="mb-3 input-group">
                            {/* <label for="nameInput" class="form-label input-group-text">Name</label> */}
                            <input 
                                type="email" 
                                class="form-control border-start-0 border-end-0" 
                                id="nameInput" 
                                placeholder='Enter your email'
                                required
                            />
                        </div>

                        {/* email input */}
                        <div class="mb-3 input-group">
                            {/* <label for="emailInput" class="form-label input-group-text">Email</label> */}
                            <input 
                                type="password" 
                                class="form-control border-start-0 border-end-0" 
                                id="emailInput" 
                                required
                                placeholder='Enter your password'
                            />
                        </div>


                        <button type="submit" className="btn btn-brand" style={{width: "100%"}}>Log in</button>
                        {/* <div className="col-12 d-flex justify-content-center">
                        </div> */}

                    </form>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Home