import React, {useState} from 'react';
import Message from './Message';

const NewBudget = ({ budget, setBudget, setValidBudget}) => {
    
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!budget || budget <= 0){
            setMessage('Invalid budget')    
            return
        }

        setMessage('')
        setValidBudget(true)
    }  

  return (
    <div className="container-budget container shadow">
        <form className='form' onSubmit={handleSubmit}>
            <div className='field'>
                <label>Enter Budget</label>
                <input 
                    className='new-budget'
                    type="number" 
                    placeholder='Add your budget'
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}/>
            </div>    
            <input type="submit" value='Add' />

            {message && <Message type='error'>{message}</Message>}  

        </form>
    </div>
  )
}

export default NewBudget