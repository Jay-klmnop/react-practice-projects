interface TodoProps {
  content: string;
  isDone: boolean;
}

export default function Todo({ content, isDone }: TodoProps) {
  return <span className={isDone ? "completed" : ""}>{content}</span>;
}
