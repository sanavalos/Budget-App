import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import Modal from './components/Modal';
import ExpensesList from './components/ExpensesList';
import { generateId } from './helpers';
import IconNewExpense from './img/new-expense.svg';

function App() {

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )
  const [validBudget, setValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if(Object.keys(editExpense).length > 0) {
      setModal(true)
      
      setTimeout(() => {
        setAnimateModal(true)
      }, 1500)
    }
  }, [editExpense])

  useEffect( () => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect( () => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect( () => {
    if(filter) {
      

      const filtExpenses = expenses.filter( exp => exp.category === filter)

      setFilteredExpenses(filtExpenses)

    }
  }, [filter])

  useEffect( () => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if (budgetLS > 0) {
      setValidBudget(true)
    }
  }, [])


  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})
    
    setTimeout(() => {
      setAnimateModal(true)
    }, 1500)
  }

  const saveExpenses = (expense) => {
      if(expense.id){
        expense.date = Date.now();
        const modifiedExpenses = expenses.map( expenseState => expenseState.id === expense.id ? expense : expenseState )
        setExpenses(modifiedExpenses)
        setEditExpense({})

      } else {
        expense.id = generateId();
        expense.date = Date.now();
        setExpenses([...expenses, expense])

      } 
      setModal(false)
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter( exp => exp.id !== id);
    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? 'fixed' : ''}>
      
      <Header
      expenses={expenses}
      setExpenses={setExpenses}
      budget={budget}
      setBudget={setBudget}
      validBudget={validBudget}
      setValidBudget={setValidBudget}
      />
      
      {validBudget && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <ExpensesList 
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className='new-expense'>
            <img 
              src={IconNewExpense} 
              alt="new expense" 
              onClick={handleNewExpense}/>
          </div>
        </>
      )}
      
      {modal && <Modal 
                  expenses={expenses} 
                  setModal={setModal} 
                  animateModal={animateModal} 
                  setAnimateModal={setAnimateModal}
                  saveExpenses={saveExpenses}
                  editExpense={editExpense}
                  setEditExpense={setEditExpense}
                  />}

    </div>
  )
}

export default App
