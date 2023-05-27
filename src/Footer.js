const Footer = ({ length }) => {
  // add length prop to Footer component and destructure it from props
  return (
    <footer>
      <p>
        {length} List {length === 1 ? "item" : "items"}
      </p>
    </footer>
  );
};

export default Footer;
