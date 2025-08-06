import { useState } from 'react'
import CounterButton from './CounterButton';
import Count from './Count'
import CounterInput from './CounterInput';

function CounterPractice() {
  const [counter, setCounter] = useState(0)
  const [inputValue, setInputValue] = useState(0)

  const handleCalculate = (operator: '+' | '-') => {
    if (operator === '+') {
    setCounter((prev) => prev + 1)
    } else if (operator === '-') {
    setCounter((prev) => prev - 1)
    }
  }

  const setCounterNumber = () => {
    setCounter(inputValue)
  }

  return (
    <>
      <Count counter = {counter}/>
      <CounterButton onClick= {() => {handleCalculate('+')}}>
        +
      </CounterButton>
      <CounterButton onClick= {() => {handleCalculate('-')}}>
        -
      </CounterButton>
      <CounterInput inputValue={inputValue} setInputValue={setInputValue} setCounterNumber={setCounterNumber} />
    </>
  )
}

export default CounterPractice