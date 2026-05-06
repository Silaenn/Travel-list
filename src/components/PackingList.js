import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  onDeleteItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list fade-in">
      {items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-emoji">🧳</span>
          <h3 className="empty-state-title">Your list is empty!</h3>
          <p className="empty-state-sub">Add your first item above to get started.</p>
        </div>
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onUpdateItem={onUpdateItem}
            />
          ))}
        </ul>
      )}

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button
          onClick={onDeleteItems}
          disabled={items.length === 0}
          className={items.length === 0 ? "btn-clear disabled" : "btn-clear"}
        >
          Clear list
        </button>
      </div>
    </div>
  );
}