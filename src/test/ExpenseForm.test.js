import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseForm from './ExpenseForm';

describe('ExpenseForm', () => {
  test('adds an expense', () => {
    const mockOnAddExpense = jest.fn();
    render(<ExpenseForm onAddExpense={mockOnAddExpense} />);
    userEvent.type(screen.getByPlaceholderText('Amount'), '20');
    userEvent.type(screen.getByPlaceholderText('Description'), 'Lunch');
    userEvent.selectOptions(screen.getByTestId('category-select'), 'Food');
    userEvent.click(screen.getByRole('button', { name: 'Add Expense' }));

    expect(mockOnAddExpense).toHaveBeenCalledWith({
      amount: '20',
      description: 'Lunch',
      category: 'Food'
    });
  });

  test('shows validation error when amount is zero', () => {
    render(<ExpenseForm onAddExpense={() => {}} />);
    userEvent.type(screen.getByPlaceholderText('Amount'), '0');
    userEvent.click(screen.getByRole('button', { name: 'Add Expense' }));
    expect(screen.getByText('Amount must be greater than zero')).toBeInTheDocument();
  });
});
