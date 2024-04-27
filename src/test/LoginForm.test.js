import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('successful login', async () => {
    render(<LoginForm />);
    userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    });
  });

  test('login failure', async () => {
    render(<LoginForm />);
    userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'wrongpassword');
    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
