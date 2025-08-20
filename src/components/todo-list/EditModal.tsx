import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { TodoType } from "../types/todo";
import styled from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "../../styles/styledMixin";
import {
  color_darkviolet,
  color_extralightgrey,
  color_violet,
  font_bold,
  font_xbg,
  spacing_md,
  spacing_sm,
  spacing_xs,
} from "../../styles/styledVariables";

interface EditModalProps {
  todo: TodoType;
  onSave: (id: string, newContent: string) => void;
  onClose: () => void;
}

const StyledModal = styled.div`
  ${flexMixin({ justify: "center", align: "center" })}
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .modal-content {
    ${flexMixin({ direction: "column", gap: spacing_sm })}
    ${colorMixin({})}
    width: 90%;
    max-width: 400px;
    padding: ${spacing_md};
    border-radius: ${spacing_xs};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h3 {
      ${colorMixin({ text: color_violet })}
      ${fontMixin(font_xbg, font_bold)}
      margin: 0;
    }

    textarea {
      ${colorMixin({ text: color_darkviolet })}
      width: 100%;
      min-height: 100px;
      padding: ${spacing_xs};
      border: 1px solid ${color_extralightgrey};
      border-radius: ${spacing_xs};
      resize: vertical;
    }
  }

  .modal-actions {
    ${flexMixin({ justify: "flex-end", gap: spacing_xs })}
  }
`;

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
    <StyledModal onClick={onClose}>
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
    </StyledModal>,
    modalRoot
  );
}
