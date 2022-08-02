import React, {useState, useEffect} from 'react';
import Message from './Message';
import CloseBtn from '../img/close.svg';
import ExpensesList from './ExpensesList';


const Modal = ({expenses, setModal, animateModal, setAnimateModal, saveExpenses, editExpense, setEditExpense}) => {
    
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')

    useEffect( () => {
        if(Object.keys(editExpense).length > 0) {
            
            setName(editExpense.name)
            setAmount(editExpense.amount)
            setCategory(editExpense.category)
            setId(editExpense.id)
        }
    }, [])

    const hideModal = () =>{
        setAnimateModal(false)
        setTimeout(() => {
            setModal(false)
            setEditExpense({})
        }, 1500)
    }
    
    const handleSubmit = e =>{
        e.preventDefault()

        if( [ name, amount, category ].includes('') ){
            setMessage('All fields must be completed')

            setTimeout(()=>{
                setMessage('')
            }, 3000)
        } else {
            saveExpenses({name, amount, category, id})
            hideModal();
        }
        
    }
    


    return (
  
        <div className='modal'>
            <div className='close-modal'>
                <img 
                    src={CloseBtn} 
                    alt='close modal'
                    onClick={hideModal}
                />
            </div>
            
            <form 
                className={`form ${animateModal ? "animate" : "close"}`}
                onSubmit={handleSubmit}
            >
                <legend>{editExpense.name ? 'Edit Expense' : 'New Expense'}</legend>
                {message && <Message type='error'> {message} </Message>}
                
                <div className="field">
                    <label htmlFor="name">Expense Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder='Add the name of the expense'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder='Add the amount expended'
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>

                <div className="field">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    > 
                        <option value="">-- Select one category --</option>
                        <option value="food">Food</option>
                        <option value="healthcare">Health Care</option>
                        <option value="housing">Housing</option>
                        <option value="leisure">Leisure</option>
                        <option value="saving">Saving</option>
                        <option value="subscriptions">Subscriptions</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={editExpense.name ? 'Edit Expense' : 'Add Expense'}
                    onClick={e => handleSubmit(e)}
                />
                
            </form>
        </div>
  )
}

export default Modal