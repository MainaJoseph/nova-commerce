export const metadata = {
  title: "Cart",
  description: "Nova Cart",
};

import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import CartClient from "./CartClient";

const Cart = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="pt-8">
      <Container>
        <div>
          <CartClient currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
};

export default Cart;
