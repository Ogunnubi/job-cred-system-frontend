import {useState} from 'react'

const Home = () => {

    const [isLogin, setIsLogin] = useState(false);

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const handleChange = () => {

    }

    const toggleForm = () => {

    }

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
                    {isLogin ? (
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>


                            <button type="submit" className="btn btn-brand" style={{width: "100%"}}>Log in</button>

                            <div className="col-12 d-flex justify-content-center">
                                <p>
                                    Don't have an account? <a className="toggle-link" onClick={toggleForm}>Create one</a>
                                </p>
                            </div>

                        </form>
                    ) : (
                        <form action="row g-3 px-3">
                            {/* name input */}
                            <div className="mb-3 input-group">
                                {/* <label for="nameInput" class="form-label input-group-text">Name</label> */}
                                <input 
                                    type="email" 
                                    className="form-control border-start-0 border-end-0" 
                                    id="nameInput" 
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>

                            {/* email input */}
                            <div className="mb-3 input-group">
                                {/* <label for="emailInput" class="form-label input-group-text">Email</label> */}
                                <input 
                                    type="password" 
                                    className="form-control border-start-0 border-end-0" 
                                    id="emailInput" 
                                    required
                                    placeholder='Enter your password'
                                />
                            </div>


                            <button type="submit" className="btn btn-brand" style={{width: "100%"}}>Log in</button>

                            <div className="col-12 d-flex justify-content-center">
                                <p>
                                    Don't have an account? <span className="toggle-link" onClick={toggleForm}>Create one</span>
                                </p>
                            </div>

                        </form>
                    )}
                </div>

            </div>
        </div>
    </section>
  )
}

export default Home