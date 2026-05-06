import { useState } from "react";

export default function Item({ item, onDeleteItem, onUpdateItem }) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => onDeleteItem(item.id), 300);
  }

  return (
    <li className={isDeleting ? "item-exit" : "item-enter"}>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      <span className={item.packed ? "packed" : ""}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleDelete}>❌</button>
    </li>
  );
}