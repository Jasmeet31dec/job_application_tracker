import Navbar from "../../components/Navbar";

const LayoutWithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="page-content">{children}</div>
    </>
  );
};

export default LayoutWithNavbar;
