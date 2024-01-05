import { useParams, useSearchParams } from "react-router-dom";

const CartScreen = () => {
  const { id } = useParams();
  const [searchParams] = new useSearchParams();
  const qty = searchParams.get("qty");

  return <div>CartScreen</div>;
};
export default CartScreen;
