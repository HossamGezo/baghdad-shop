// --- Local Components
import FooterTop from "@layouts/footer/components/FooterTop";
import FooterMiddle from "@layouts/footer/components/FooterMiddle";
import FooterBottom from "@layouts/footer/components/FooterBottom";

// --- Main Component
const Footer = () => {
  return (
    <footer className="footer mt-20">
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
