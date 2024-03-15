import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckOutClient from "./CheckOutClient";
import NullData from "../components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";

const CheckOut = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Opps! Access Denied" />;
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckOutClient />
        </FormWrap>
      </Container>
    </div>
  );
};

export default CheckOut;
