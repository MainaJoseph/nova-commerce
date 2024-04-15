import Link from "next/link";
import Container from "../Container";
import { getCurrentUser } from "@/actions/getCurrentUser";

const SignUpNav = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div
      className="
    sticky
    top-0
    w-full
    bg-orange-200
    z-30
    shadow-sm
    "
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          {/* Conditional rendering based on device size */}
          {/* For small devices */}
          <div className="block md:hidden text-center text-sm text-slate-500">
            Download our app for the best experience.
          </div>

          {/* For medium and large devices */}
          <div className="hidden md:flex flex-row items-center justify-center text-center text-sm text-slate-500 gap-1">
            Get deliveries right to your preferred location through our website.
            <Link className="underline font-semibold" href="/register">
              Sign Up
            </Link>
            to get started.
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignUpNav;
