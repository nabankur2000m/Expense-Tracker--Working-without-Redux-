import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileForm.css';


function ProfileForm({ onProfileUpdate, onCancel }) {
    const [fullName, setFullName] = useState(localStorage.getItem('fullName') || '');
    const [profilePhotoURL, setProfilePhotoURL] = useState(localStorage.getItem('profilePhotoURL') || '');
    const [error, setError] = useState('');

    const API_KEY = 'AIzaSyDo8G727k7YUfG19hcgPOG5qJXJuU8cLLM';

    useEffect(() => {
        const storedFullName = localStorage.getItem('fullName');
        const storedProfilePhotoURL = localStorage.getItem('profilePhotoURL');
        if (storedFullName) setFullName(storedFullName);
        if (storedProfilePhotoURL) setProfilePhotoURL(storedProfilePhotoURL);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const idToken = localStorage.getItem('token');

        if (!idToken) {
            setError('User is not logged in.');
            return;
        }

        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
                idToken: idToken,
                displayName: fullName,
                photoUrl: profilePhotoURL,
                returnSecureToken: true
            });

            localStorage.setItem('fullName', fullName);
            localStorage.setItem('profilePhotoURL', profilePhotoURL);
            onProfileUpdate(response.data);
            onProfileUpdate({ fullName, profilePhotoURL });

            setError('');
        } catch (error) {
            setError('Failed to update profile: ' + (error.response?.data?.error?.message || error.message));
        }
    };

    return (
        <div className="profile-form-container">
            <form onSubmit={handleSubmit} className="profile-form">
                <h2>Contact Details</h2>
                <div className="input-group">
                    <label htmlFor="full-name">Full Name:</label>
                    <input
                        id="full-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="profile-photo-url">Profile Photo URL:</label>
                    <input
                        id="profile-photo-url"
                        type="text"
                        placeholder="Enter URL of your profile photo"
                        value={profilePhotoURL}
                        onChange={(e) => setProfilePhotoURL(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="form-actions">
                    <button type="submit" className="update-button">Update</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;
