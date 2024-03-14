// @ts-nocheck

export const metadata = {
  title: "Cart",
  description: "Nova Cart",
};

import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import PayClient from "./PayClient";

const CartPay = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="pt-8">
      <Container>
        <div>
          <PayClient currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
};

export default CartPay;
