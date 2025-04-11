
const Login = () => {


  
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    //   router.push('/destination-path');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
    
    setLoading(false);
  }




  return (
    <div>Login</div>
  )
}

export default Login