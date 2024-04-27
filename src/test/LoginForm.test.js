import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('submits login form data', async () => {
    render(<LoginForm />);
    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Password');
    userEvent.type(emailField, 'user@example.com');
    userEvent.type(passwordField, 'password');
    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeDefined();
    });
  });

  test('displays error on failed login', async () => {
    render(<LoginForm />);
    const emailField = screen.getByPlaceholderText('Email');
    userEvent.type(emailField, 'incorrect@example.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'wrongpassword');
    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('An unknown error occurred.')).toBeInTheDocument();
    });
  });
});
