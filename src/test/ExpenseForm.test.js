import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseForm from './ExpenseForm';

describe('ExpenseForm', () => {
  test('adds an expense', async () => {
    const onAddExpense = jest.fn();
    render(<ExpenseForm onAddExpense={onAddExpense} />);
    userEvent.type(screen.getByPlaceholderText('Amount'), '50');
    userEvent.type(screen.getByPlaceholderText('Description'), 'Groceries');
    userEvent.selectOptions(screen.getByRole('combobox'), 'Food');
    userEvent.click(screen.getByRole('button', { name: 'Add Expense' }));

    await waitFor(() => {
      expect(onAddExpense).toHaveBeenCalled();
      expect(onAddExpense.mock.calls[0][0]).toMatchObject({
        amount: 50,
        description: 'Groceries',
        category: 'Food'
      });
    });
  });
});
