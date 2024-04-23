import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'AIzaSyDo8G727k7YUfG19hcgPOG5qJXJuU8cLLM';

function SignUpForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true,
            });

            
            console.log(response.data);
            console.log('User has successfully signed up');
            setError('');
            navigate('/login');
           
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error.message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    return (
        <section className="signup-form">
            <form onSubmit={handleSubmit}>
                <h2>SignUp</h2>
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Sign up</button>
                {error && <p className="error">{error}</p>}
                <p>Have an account? <a href="/login">Login</a></p>
            </form>
        </section>
    );
}

export default SignUpForm;
