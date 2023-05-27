// Purpose: Component for line item
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  // add item, handleCheck, and handleDelete props to LineItem component and destructure them from props
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => {
          handleCheck(item.id);
        }}
      />

      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>

      <FaTrashAlt
        onClick={() => {
          handleDelete(item.id);
        }}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default LineItem;
