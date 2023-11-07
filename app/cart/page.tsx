import Container from "../components/Container";
import CartClient from "./CartClient";

const Cart = () => {
  return (
    <div className="pt-8">
      <Container>
        <div>
          <CartClient />
        </div>
      </Container>
    </div>
  );
};

export default Cart;
