interface CountProps {
  counter: React.ReactNode;
}

export default  function Count({counter}: CountProps) {
  return (
    <div>counter: {counter}</div>
  )
}
