import LineItem from "./LineItem";

const ItemList = ({ items, handleCheck, handleDelete }) => {
  // add items, handleCheck, and handleDelete props to ItemList component and destructure them from props
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          key={item.id}
        />
      ))}
    </ul>
  );
};

export default ItemList;
