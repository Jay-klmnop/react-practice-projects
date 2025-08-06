interface TodoProps {
  content: string;
}

export default function Todo({content}: TodoProps) {
  return (
    <span>{content}</span>
  )
}