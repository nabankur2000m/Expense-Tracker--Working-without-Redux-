import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'AIzaSyDo8G727k7YUfG19hcgPOG5qJXJuU8cLLM';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true,
            });

           
            localStorage.setItem('token', response.data.idToken); 
            localStorage.setItem('email', email);
            console.log(response.data);
            navigate('/welcome');
            
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error.message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    return (
        <section className="login-form">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
                <a href="/forgot-password">Forgot password</a>
                <p>Don't have an account? <a href="#/sign-up">Sign up</a></p>
            </form>
        </section>
    );
}

export default LoginForm;
