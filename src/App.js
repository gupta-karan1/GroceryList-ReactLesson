import Header from "./Header";
import AddItem from "./AddItem";
import Content from "./Content";
import SearchItem from "./SearchItem";
import Footer from "./Footer";
import { useState } from "react";

function App() {
  // App component
  const [items, setItems] = useState(
    // initialize state with items from localStorage or empty array
    JSON.parse(localStorage.getItem("items")) || [] // get items from localStorage or empty array
  ); // items state

  const [newItem, setNewItem] = useState(""); // new item state
  const [search, setSearch] = useState(""); // search state

  const setAndSaveItems = (newItems) => {
    setItems(newItems); // update state with new items
    localStorage.setItem("items", JSON.stringify(newItems)); // save to localStorage as string
  };

  const addItem = (item) => {
    // add item to list and save to localStorage
    const id = items.length ? items[items.length - 1].id + 1 : 1; // get new id for item to add
    const newItem = { id, item, checked: false }; // create new item
    const listItems = [...items, newItem]; // create new list with new item
    setAndSaveItems(listItems); // update state and save to localStorage
  };

  const handleCheck = (id) => {
    // toggle checked state of item and save to localStorage
    const listItems = items.map(
      (
        item // create new list with updated checked state
      ) => (item.id === id ? { ...item, checked: !item.checked } : item) // toggle checked state of item with matching id
    );
    setAndSaveItems(listItems); // update state and save to localStorage
  };

  const handleDelete = (id) => {
    // delete item from list and save to localStorage
    const listItems = items.filter((item) => item.id !== id); // create new list without item with matching id
    setAndSaveItems(listItems); // update state and save to localStorage
  };

  const handleSubmit = (e) => {
    // add item to list and reset newItem
    e.preventDefault(); // prevent page refresh
    if (!newItem) return; // don't add empty items
    addItem(newItem); // add item
    setNewItem(""); // reset newItem
  };

  return (
    <div className="App">
      <Header title="Grocery List" />

      <SearchItem search={search} setSearch={setSearch} />

      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <Footer length={items.length} />
    </div>
  );
}

export default App;
