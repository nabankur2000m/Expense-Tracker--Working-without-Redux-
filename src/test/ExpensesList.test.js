import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpensesList from './ExpensesList';

describe('ExpensesList', () => {
  test('displays and updates an expense list', async () => {
    render(<ExpensesList />);
    // Mock initial fetch and simulate edit interaction
    await waitFor(() => {
      expect(screen.getByText('Rs.50')).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    userEvent.type(screen.getByDisplayValue('50'), '100');
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Rs.100')).toBeInTheDocument();
    });
  });
});
