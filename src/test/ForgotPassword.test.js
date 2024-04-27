import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword', () => {
  test('sends a reset password link', async () => {
    render(<ForgotPassword />);
    const emailField = screen.getByPlaceholderText('Enter the email with which you have registered.');
    userEvent.type(emailField, 'test@example.com');
    userEvent.click(screen.getByRole('button', { name: 'Send Link' }));

    await waitFor(() => {
      expect(screen.getByText(/password reset link has been sent/i)).toBeInTheDocument();
    });
  });
});
