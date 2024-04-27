import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileForm from './ProfileForm';

describe('ProfileForm', () => {
  test('updates user profile', async () => {
    render(<ProfileForm onProfileUpdate={() => {}} onCancel={() => {}} />);
    const fullNameField = screen.getByPlaceholderText('Enter your full name');
    userEvent.type(fullNameField, 'New Name');
    userEvent.click(screen.getByRole('button', { name: 'Update' }));

    await waitFor(() => {
      expect(localStorage.getItem('fullName')).toBe('New Name');
    });
  });
});
