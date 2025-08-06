interface CounterInputProps {
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  setCounterNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function CounterInput({inputValue, setInputValue, setCounterNumber}: CounterInputProps) {
  return (
    <>
      <input type="number" value={inputValue} onChange={(event) => setInputValue(Number(event.target.value))} />
      <button onClick={() => setCounterNumber(inputValue)}>enter</button>
    </>
  )
}