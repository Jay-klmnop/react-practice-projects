import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { TodoType } from "../types/todo";
import "../../Modal.css";

interface EditModalProps {
  todo: TodoType;
  onSave: (id: string, newContent: string) => void;
  onClose: () => void;
}

export default function EditModal({ todo, onSave, onClose }: EditModalProps) {
  const [editText, setEditText] = useState(todo.content);

  useEffect(() => {
    setEditText(todo.content);
  }, [todo]);

  const handleSave = () => {
    onSave(todo.id, editText);
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Todo</h3>
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>X</button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
