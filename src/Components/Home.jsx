import {useState} from 'react'

const Home = () => {

    const [isLogin, setIsLogin] = useState(false);

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("")

    const toggleForm = () => {
        setIsLogin(prev => !prev);
    }

  return (
    <section className='section'>
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className='intro__page'>
                        <h1 className='heading__one'>WeWork</h1>
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
                                    className="form-control border-start-0 border-end-0" 
                                    id="emailInput" 
                                    placeholder='Enter your email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* email input */}
                            <div className="mb-3 input-group">
                                {/* <label for="emailInput" class="form-label input-group-text">Email</label> */}
                                <input 
                                    type="password" 
                                    className="form-control border-start-0 border-end-0" 
                                    id="passwordInput" 
                                    required
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>


                            <button type="submit" className="btn btn-brand" style={{width: "100%"}}>Log in</button>

                            <p className='text-center'>
                                Don't have an account? <span className="toggle-link" onClick={toggleForm}>Create one</span>
                            </p>
                        </form>
                    ) : (
                        <form action="row g-3 px-3">
                            {/* name input */}
                            <div className="mb-3 input-group">
                                {/* <label for="nameInput" class="form-label input-group-text">Name</label> */}
                                <input 
                                    type="email" 
                                    className="form-control border-start-0 border-end-0" 
                                    id="emailInput" 
                                    placeholder='Enter your email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* password input */}
                            <div className="mb-3 input-group">
                                {/* <label for="emailInput" class="form-label input-group-text">Email</label> */}
                                <input 
                                    type="password" 
                                    className="form-control border-start-0 border-end-0" 
                                    id="passwordInput" 
                                    required
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>


                            {/* confirm password input */}
                            <div className="mb-3 input-group">
                                {/* <label for="emailInput" class="form-label input-group-text">Email</label> */}
                                <input 
                                    type="password" 
                                    className="form-control border-start-0 border-end-0" 
                                    id="passwordInput" 
                                    required
                                    placeholder='Confirm your password again'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>


                            <button 
                                type="submit" 
                                className="btn btn-brand" 
                                style={{width: "100%"}}
                            >
                                Create Account
                            </button>

                            <p className='text-center'>
                                Already have an account ? <span className="toggle-link" onClick={toggleForm}>Log In</span>
                            </p>
                           

                        </form>
                    )}
                </div>

            </div>
        </div>
    </section>
  )
}

export default Home