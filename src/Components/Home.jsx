import React from 'react'

const Home = () => {

  return (
    <section className='section'>
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className='intro__page'>
                        <h3>WeWork</h3>
                        <p>Submit Jobs with Credits</p>
                    </div>
                </div>

                <div className="col-lg-6">
                    <form action="">
                        {/* name input */}
                        <div className="mb-3 input-group">
                            <label for="nameInput" class="form-label border-start-0">Name</label>
                            <input type="text" class="form-control" id="nameInput" />
                        </div>

                        {/* email input */}
                        <div class="mb-3 input-group">
                            <label for="emailInput" class="form-label">Email</label>
                            <input type="email" class="form-control border-start-0 border-end-0" id="emailInput" />
                        </div>


                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="button btn-brand">Log in</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Home