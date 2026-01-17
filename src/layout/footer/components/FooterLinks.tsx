// --- Libraries
import {Link} from "react-router";

// --- Types
type FooterLinksProps = {
  title: string;
  productsLink: string[];
};

// --- FooterLinks (Main Component)
const FooterLinks = ({title, productsLink}: FooterLinksProps) => {
  return (
    <div className="footer-desc-electronics mx-auto w-50">
      <h3 className="text-xl text-warning font-jetbrains tracking-tight font-bold w-fit mx-auto border-b-2 border-b-warning-500 pb-0.5 select-none">
        {title}
      </h3>
      <ul className="pt-5 flex flex-col gap-1">
        {productsLink.map((productLink, index) => (
          <li key={index} className="border-b border-b-transparent hover:border-b-warning pb-0.5 w-fit transition-colors duration-150 select-none">
            <Link to="/">{productLink}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
