import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import WelcomeScreen from './components/WelcomeScreen';
import ForgotPassword from './components/ForgotPassword';
import ExpenseForm from './components/ExpenseForm';
import ExpensesList from './components/ExpensesList';  

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/welcome" element={
                    <WelcomeScreen />
                } />
                <Route path="/add-expense" element={
                    <>
                        <ExpenseForm />
                        <ExpensesList /> 
                    </>
                } />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/" element={<SignUpForm />} />
            </Routes>
        </Router>
    );
}

export default App;
