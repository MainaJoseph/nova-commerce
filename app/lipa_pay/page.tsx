export const metadata = {
  title: "lipa_pay",
  description: "Lipa na Mpesa",
};

import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import PayForm from "./PayForm";
import NullData from "../components/NullData";

const Login = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Opps! Access Denied" />;
  }
  return (
    <Container>
      <FormWrap>
        <PayForm />
      </FormWrap>
    </Container>
  );
};

export default Login;
