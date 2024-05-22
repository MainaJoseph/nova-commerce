// @ts-nocheck

export const metadata = {
  title: "On Delivery",
  description: "Pay On delivery",
};

import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../../components/Container";
import NullData from "../../components/NullData";
import DeliveryClient from "./DeliveryClient";

const OnDelivery = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Payment Not Allowed. Please Login" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <DeliveryClient />
      </Container>
    </div>
  );
};

export default OnDelivery;
