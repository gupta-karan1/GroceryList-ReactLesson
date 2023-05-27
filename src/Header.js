const Header = ({ title }) => {
  // destructure props to get title prop and set default value to "Default Title" if title prop is not provided by parent component
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: "Default Title",
};

export default Header;
