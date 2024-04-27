import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileForm from './ProfileForm';

describe('ProfileForm', () => {
  test('updates user profile', async () => {
    const mockOnProfileUpdate = jest.fn();
    render(<ProfileForm onProfileUpdate={mockOnProfileUpdate} onCancel={() => {}} />);
    userEvent.type(screen.getByPlaceholderText('Enter your full name'), 'John Doe');
    userEvent.click(screen.getByRole('button', { name: 'Update' }));

    await waitFor(() => {
      expect(mockOnProfileUpdate).toHaveBeenCalled();
    });
  });
});
