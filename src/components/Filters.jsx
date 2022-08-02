import React, {useEffect, useState} from 'react';

function Filters({filter, setFilter}) {
  return (
    <div className='filters shadow container'>

        <form>
            <div className='field'>
                <label>Filter Expenses</label>
                <select 
                    value={filter}
                    onChange={e => setFilter(e.target.value)}>
                        <option value="">-- Show all Expenses --</option>
                        <option value="food">Food</option>
                        <option value="healthcare">Health Care</option>
                        <option value="housing">Housing</option>
                        <option value="leisure">Leisure</option>
                        <option value="saving">Saving</option>
                        <option value="subscriptions">Subscriptions</option>

                </select>
            </div>
        </form>
        
    </div>
  )
}

export default Filters