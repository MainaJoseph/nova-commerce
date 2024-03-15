export const metadata = {
  title: "Sign In",
  description: "Sign In to Nova",
};

import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import PayForm from "./PayForm";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <PayForm />
      </FormWrap>
    </Container>
  );
};

export default Login;
