
import React, { useState } from 'react'
import { decrement, increment, incrementByAmount, reset } from './counterSlice'
import { useDispatch, useSelector } from 'react-redux'

const Counter = () => {
    const [incrementAmount, setIncrementAmount] = useState(0)
    const dispatch = useDispatch();
    const count = useSelector(state => state.counter.count);

    const addValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0)
        dispatch(reset());
    }

  return (
    <div>
        <section>
            <p>{count}</p>
            <div>
             <button onClick={() => dispatch(increment())}>+</button>
             <button onClick={() => dispatch(decrement())}>-</button>
            </div>
        </section>
       
        <input
          type='text'
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
       <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
        <button onClick={resetAll}>Reset</button>
       </div>
    </div>
  )
}

export default Counter