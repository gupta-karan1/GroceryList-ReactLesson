import Header from "./Header";
import AddItem from "./AddItem";
import Content from "./Content";
import SearchItem from "./SearchItem";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

// start json server with the following command:
//npx json-server -p 3500 -w data/db.json

function App() {
  //API URL
  const API_URL = "http://localhost:3500/items";

  // App component
  // const [items, setItems] = useState(
  //   // initialize state with items from localStorage or empty array
  //   JSON.parse(localStorage.getItem("items")) || [] // get items from localStorage or empty array
  // ); // items state

  const [items, setItems] = useState([]); // items state

  const [newItem, setNewItem] = useState(""); // new item state
  const [search, setSearch] = useState(""); // search state
  const [fetchError, setFetchError] = useState(null); // fetch error state
  const [isLoading, setIsLoading] = useState(true); // loading state

  // useEffect(() => {
  //   // update localStorage when items state changes
  //   localStorage.setItem("items", JSON.stringify(items)); // save items to localStorage as string
  // }, [items]); // run when items state changes

  useEffect(() => {
    //read data from API
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Did not receive expected data");
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        // console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      // fetchItems();
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  // const setAndSaveItems = (newItems) => {
  //   setItems(newItems); // update state with new items
  //   localStorage.setItem("items", JSON.stringify(newItems)); // save to localStorage as string
  // };

  const addItem = async (item) => {
    // add item to list and save to localStorage
    const id = items.length ? items[items.length - 1].id + 1 : 1; // get new id for item to add
    const myNewItem = { id, item, checked: false }; // create new item
    const listItems = [...items, myNewItem]; // create new list with new item
    setItems(listItems); // update state

    // post data to API
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    // toggle checked state of item and save to localStorage
    const listItems = items.map(
      (
        item // create new list with updated checked state
      ) => (item.id === id ? { ...item, checked: !item.checked } : item) // toggle checked state of item with matching id
    );
    setItems(listItems); // update state

    // patch data to API
    const myItem = listItems.filter((item) => item.id === id); // get item with matching id
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    // delete item from list and save to localStorage
    const listItems = items.filter((item) => item.id !== id); // create new list without item with matching id
    setItems(listItems); // update state

    // delete data from API
    const deleteOptions = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
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
      <main>
        {isLoading && <p>Loading Items...</p>}

        {fetchError && (
          <p style={{ color: "red" }}>{`Error: ${fetchError}`} </p>
        )}

        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )} // filter items by search term and pass to Content component as items prop
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
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
