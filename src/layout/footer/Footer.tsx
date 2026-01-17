// --- Local Components
import FooterTop from "./components/FooterTop";
import FooterMiddle from "./components/FooterMiddle";
import FooterBottom from "./components/FooterBottom";

// --- Footer (Main Component)
const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Footer */}
      <FooterTop />

      {/* Middle Footer */}
      <FooterMiddle />

      {/* Bottom Footer */}
      <FooterBottom />
    </footer>
  );
};

export default Footer;
