import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  // add newItem, setNewItem, and handleSubmit props to AddItem component and destructure them from props
  const inputRef = useRef(); // create a ref for the input element and assign it to inputRef variable
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        ref={inputRef} // assign inputRef to ref attribute of input element so it can be referenced in other components
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()} // focus on input element when button is clicked to add item
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
