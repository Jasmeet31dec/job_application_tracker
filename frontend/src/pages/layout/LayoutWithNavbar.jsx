import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const LayoutWithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="page-content">{children}</div>
      <Footer />
    </>
  );
};

export default LayoutWithNavbar;
