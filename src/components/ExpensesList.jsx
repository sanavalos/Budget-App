import React from 'react';
import Expense from './Expense';

const ExpensesList = ({expenses, setEditExpense, deleteExpense, filter, filteredExpenses}) => {
  return (
    <div className='list-expenses container'>
        
        
        {   filter ? (
            <>
                <h2>{filteredExpenses.length ? 'Results' : 'No results matching the filter'}</h2>
                {filteredExpenses.map( expense => (
                <Expense 
                        key={expense.id}
                        expense={expense}
                        setEditExpense={setEditExpense}
                        deleteExpense={deleteExpense}
                />
            ))}
            </>
            ) : (
              <>
                <h2>{expenses.length ? 'Expenses' : 'There are no expenses to show'}</h2>
                {expenses.map( expense => (
                    <Expense 
                            key={expense.id}
                            expense={expense}
                            setEditExpense={setEditExpense}
                            deleteExpense={deleteExpense}
                    />
                ))}
              </>
            )
        }

    </div>
  )
}

export default ExpensesList