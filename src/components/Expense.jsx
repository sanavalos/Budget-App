import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import { generateDate } from '../helpers';


import IconSavings from '../img/icon_saving.svg'
import IconHouse from '../img/icon_house.svg'
import IconFood from '../img/icon_food.svg'
import IconLeisure from '../img/icon_leisure.svg'
import IconHealth from '../img/icon_health.svg'
import IconSubscriptions from '../img/icon_subscriptions.svg'

const IconsDictionary = {
    food : IconFood,
    healthcare : IconHealth,
    housing : IconHouse,
    leisure : IconLeisure,
    saving : IconSavings,
    subscriptions : IconSubscriptions
}


const Expense = ({expense, setEditExpense, deleteExpense}) => {
  const { name, amount, category, date, id } = expense
  
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(expense)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => deleteExpense(id)} 
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className='expense shadow'>
                <div className="content-expense">
                        <img
                        src={IconsDictionary[category]}
                        />
                    <div className="description-expense">
                        <p className='categoria'>{category}</p>
                        <p className='nombre-expense'>{name}</p>
                        <p className='date-expense'>Added: {''}
                            <span>{generateDate(date)}</span>
                        </p>
                    </div>
                </div>
                <p className='quantity-expense'>${amount}</p>

            </div>
        </SwipeableListItem>     
    </SwipeableList>
  )
}

export default Expense