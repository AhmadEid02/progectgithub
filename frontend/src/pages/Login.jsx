import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './login.css'
import { useNavigate } from "react-router-dom";
const Login = ({ tog }) => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(tog)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [btnload, setBtnload] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setBtnload(true)
            if (email.length == 0) {
                setError("fill Email field")
                return
            }
            if (password.length == 0) {
                setError("fill Password field")
                return
            }
            const apiUrl = "http://localhost:4000";
            const response = await axios.post(`${apiUrl}/user/login`, { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            setBtnload(false)
            navigate('/')
            window.location.reload();
            setEmail('');
            setPassword('');
            setError(null); // Clear error on successful login
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred"); // Use a default message if no specific message is available
            console.error(err.response?.data?.error);
            setBtnload(false)
            e.preventDefault();
        }
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setBtnload(true)
            if (email.length == 0) {
                setError("fill Email field")
                return
            }
            if (password.length == 0) {
                setError("fill Password field")
                return
            }
            const apiUrl = "http://localhost:4000";
            const response = await axios.post(`${apiUrl}/user/signup`, { name, email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            setBtnload(false)
            navigate('/')
            window.location.reload(false);
            setEmail('');
            setPassword('');
            setError(null); // Clear error on successful login
        } catch (err) {
            setBtnload(false)
            setError(err.response?.data?.error || "An error occurred"); // Use a default message if no specific message is available
            console.error(err.response?.data?.error);
            e.preventDefault();
        }
    }
    const handletoggle = (e) => {
        setToggle(!toggle)
        navigate(`/${e}`)
    }
    useEffect(() => {
        console.log(tog)
    }, [])
    return (
        <>

            <div className="contain">
                <div className={toggle ? 'container002' : "container002 active"}>
                    <div className={`form-container sign-up`} onSubmit={handleSignUp}>
                        <form>
                            <h1>Create Account</h1>
                            <div className="social-icons">
                                <a href="https://www.google.com/" target="_blank" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                                <a href="https://www.facebook.com/" target="_blank" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="https://github.com/" target="_blank" className="icon"><i className="fa-brands fa-github"></i></a>
                                <a href="https://jo.linkedin.com/" target="_blank" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                            </div>

                            <span>or use your email for registeration</span>
                            <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
                            <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                            {error?<span className='error'>{error}</span>:null}
                            <button>
                            {btnload ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> : "Sign Up"}
                            </button>
                        </form>
                    </div>
                    <div className={"form-container sign-in"}>
                        <form onSubmit={handleLogin}>
                            <h1>Log In</h1>
                            <div className="social-icons">
                                <a href="https://www.google.com/" target="_blank" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                                <a href="https://www.facebook.com/" target="_blank" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="https://github.com/" target="_blank" className="icon"><i className="fa-brands fa-github"></i></a>
                                <a href="https://jo.linkedin.com/" target="_blank" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                            </div>
                            <span> use your email password </span>
                            <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                            {error?<span className='error'>{`${error}. `}{error=="wrong email address"?<span className='secCol' onClick={() => handletoggle("signup")}>Create account?</span>:null}</span>:null}
                            <a href="#">Forget Your Password?</a>
                            <button>
                                {btnload ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> : "Log In"}
                            </button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className="hidden" onClick={() => handletoggle("login")}>Log In</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button className="hidden" onClick={() => handletoggle("signup")}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login