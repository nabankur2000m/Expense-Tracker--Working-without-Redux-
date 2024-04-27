import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('successful signup', () => {
    render(<SignUpForm />);
    userEvent.type(screen.getByPlaceholderText('Email'), 'newuser@example.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'newpassword');
    userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.getByText('Registration successful!')).toBeInTheDocument();
  });
});
