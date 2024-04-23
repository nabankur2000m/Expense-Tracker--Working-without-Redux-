import React, { useEffect, useState } from 'react';
import './ExpensesList.css';

function ExpensesList() {
    const [expenses, setExpenses] = useState([]);
    const [editId, setEditId] = useState(null);  // ID of the expense being edited
    const [formData, setFormData] = useState({});  // Form data state for controlled inputs

    useEffect(() => {
        // Fetch expenses from Firebase
        const fetchExpenses = () => {
            fetch('https://react-project-nabankur-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json')
            .then(response => response.json())
            .then(data => {
                const loadedExpenses = [];
                for (const key in data) {
                    loadedExpenses.push({
                        id: key,
                        ...data[key]
                    });
                }
                setExpenses(loadedExpenses);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        };

        fetchExpenses();
    }, []);

    const handleEdit = (expense) => {
        setEditId(expense.id);
        setFormData(expense);
    };

    const handleChange = (event, field) => {
        setFormData({...formData, [field]: event.target.value});
    };

    const handleSubmit = (event, id) => {
        event.preventDefault();
        const url = `https://react-project-nabankur-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update the expense');
            }
            return response.json();
        })
        .then(data => {
            setExpenses(expenses.map(exp => exp.id === id ? {...exp, ...formData} : exp));
            setEditId(null);
            console.log("Expense successfully updated");
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update expense');
        });
    };

    const handleDelete = (id) => {
        const url = `https://react-project-nabankur-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`;

        fetch(url, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete the expense');
            }
            setExpenses(currentExpenses => currentExpenses.filter(expense => expense.id !== id));
            console.log("Expense successfully deleted");
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete expense');
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount (Rs.)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense => (
                    <tr key={expense.id}>
                        {editId === expense.id ? (
                            <>
                                <td><input type="date" value={formData.date.slice(0, 10)} onChange={(e) => handleChange(e, 'date')} /></td>
                                <td><input type="text" value={formData.category} onChange={(e) => handleChange(e, 'category')} /></td>
                                <td><input type="text" value={formData.description} onChange={(e) => handleChange(e, 'description')} /></td>
                                <td><input type="number" value={formData.amount} onChange={(e) => handleChange(e, 'amount')} /></td>
                                <td>
                                    <button onClick={(e) => handleSubmit(e, expense.id)}>Submit</button>
                                    <button onClick={() => setEditId(null)}>Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.category}</td>
                                <td>{expense.description}</td>
                                <td>Rs.{expense.amount}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(expense)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(expense.id)}>Delete</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ExpensesList;