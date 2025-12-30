// --- Libraries
import {useParams} from "react-router";

// --- SpecialOffers (Main Component)
const SpecialOffers = () => {
  const params = useParams();
  return <h1>Special Offers {params.id}</h1>;
};

export default SpecialOffers;
