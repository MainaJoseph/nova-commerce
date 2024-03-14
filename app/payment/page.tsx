// @ts-nocheck

export const metadata = {
  title: "Cart",
  description: "Nova Cart",
};

import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import PayClient from "./PayClient";
import NullData from "../components/NullData";

const CartPay = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Payment Not Allowed. Please Login" />;
  }

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
