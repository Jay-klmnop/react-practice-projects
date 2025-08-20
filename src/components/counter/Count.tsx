interface CountProps {
  counter: React.ReactNode;
}

export default function Count({ counter }: CountProps) {
  return <span>counter: {counter}</span>;
}
