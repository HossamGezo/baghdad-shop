// --- Libraries
import {useParams} from "react-router";

// --- ProductDetails (Main Component)
const ProductDetails = () => {
  const params = useParams();
  return <h1>Product Details {params.id}</h1>;
};

export default ProductDetails;
