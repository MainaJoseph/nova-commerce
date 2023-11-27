export const metadata = {
  title: "Sign Up",
  description: "Sign Up to Nova",
};

import Container from "../components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Register;
