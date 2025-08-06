interface CounterButtonProps {
  children: React.ReactNode;
  onClick: () => void; 
}

export default  function CounterButton({children, onClick}: CounterButtonProps) {
  return (
    <button 
      onClick={onClick}
    >
      {children}
    </button>
  )
}