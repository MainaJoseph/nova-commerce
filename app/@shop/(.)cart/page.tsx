import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import CartUserCart from "./CartUserCart";

const Cart = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="pt-8">
      <Container>
        <div>
          <CartUserCart currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
};

export default Cart;
