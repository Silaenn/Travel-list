import { useState, useEffect } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("faraway-items");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("faraway-items", JSON.stringify(items));
  }, [items]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToogleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeletedItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList
          items={items}
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleToogleItem}
          onDeleteItems={handleDeletedItems}
        />
        <Stats items={items} />
      </div>
    </>
  );
}