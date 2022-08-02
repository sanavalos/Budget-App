import React, {useEffect, useState} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function BudgetControl({budget, setBudget, expenses, setExpenses, setValidBudget}) {

    const [available, setAvailable] = useState(0)
    const [expended, setExpended] = useState(0)
    const [expensesPercentage, setExpensesPercentage] = useState(0)

 useEffect(()=>{
    const totalExpended = expenses.reduce( (total, expense) => expense.amount + total, 0)
    const totalAvailable = budget - totalExpended

    const newPercentage = ((totalExpended/budget)*100).toFixed(2)
    
    setExpended(totalExpended)
    setAvailable(totalAvailable)
    
    setTimeout(() => {
            setExpensesPercentage(newPercentage)
    }, 1000);

  }, [expenses])


  const usdFormat = (amount) =>{
    return Number(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }
  
  const handleResetApp = () => {
    const resultado = confirm('Do you want to reset the app?')
    if(resultado) {
        console.log('Si')
        setExpenses([])
        setBudget(0)
        setValidBudget(false)
    } else {
        console.log('No')
    }
  }

  return (
    <div className='container-budget container shadow two-columns'>
          <div>
              <CircularProgressbar
                styles={buildStyles({
                    pathColor: expensesPercentage > 100 ? '#DC2626' : 
                    '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: expensesPercentage > 100 ? '#DC2626' : 
                    '#3B82F6'
                })}
                value={expensesPercentage}
                text={`${expensesPercentage}% Expended`}/>
          </div>
          <div className='content-budget'>
              <button className='reset-app' type='button' onClick={handleResetApp}>
                RESET APP
              </button>
              <p>
                  <span> Budget: </span> {usdFormat(budget)}
              </p>

              <p className={available < 0 ? 'negativo' : ''}>
                  <span> Available: </span> {usdFormat(available)}
              </p>

              <p>
                  <span> Expended: </span> {usdFormat(expended)}
              </p>
          </div>
    </div>
  )
}

export default BudgetControl