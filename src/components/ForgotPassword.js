import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const API_KEY = 'AIzaSyDo8G727k7YUfG19hcgPOG5qJXJuU8cLLM';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`, {
                requestType: 'PASSWORD_RESET',
                email: email,
            });
            setLoading(false)
            setMessage('A password reset link has been sent to your email.');
        } catch (error) {
            setLoading(false);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter the email with which you have registered."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Send Link'}
                </button>
                {loading && <p>Loading...</p>}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default ForgotPassword;
