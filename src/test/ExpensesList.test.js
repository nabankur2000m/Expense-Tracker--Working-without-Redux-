import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpensesList from './ExpensesList';

describe('ExpensesList', () => {
  test('displays expenses', () => {
    render(<ExpensesList />);
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  test('edits an expense', () => {
    render(<ExpensesList />);
    userEvent.click(screen.getByText('Edit'));
    userEvent.type(screen.getByDisplayValue('Groceries'), 'Updated Groceries');
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Updated Groceries')).toBeInTheDocument();
  });

  test('deletes an expense', () => {
    render(<ExpensesList />);
    userEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('Groceries')).toBeNull();
  });
});
