import { SafeUser } from "@/types";
import Container from "../components/Container";
import Avatar from "../components/Avatar";
import AccountName from "./AccountName";
import AccountEmail from "./AccountEmail";

interface AccountProfileProps {
  currentUser: SafeUser | null;
}

const AccountProfile: React.FC<AccountProfileProps> = ({ currentUser }) => {
  return (
    <div className="mt-7">
      <Container>
        <div className="flex flex-col md:flex-row justify-items-start gap-6 ">
          <div className="flex flex-col gap-4 md:flex md:justify-start md:w-1/2 ">
            <div className="font-bold text-2xl">My Profile</div>
            <div className="flex flex-col gap-4 shadow-md">
              <div className="flex flex-row ml-3 gap-2">
                <div className="mt-2">
                  <Avatar src={currentUser?.image} />
                </div>
                <div className="flex flex-col gap-0 text-sm mt-2">
                  <div className="font-bold">
                    <AccountName />
                  </div>
                  <div>
                    <AccountEmail />
                  </div>
                </div>
              </div>{" "}
              {/*//first div in the shadow */}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              {/*//last div in the shadow */}
            </div>
          </div>
          {/* ////////////////////////////////// */}
          <div className="w-full mb-3  md:mb-[-50px] md:z-10">
            The other side
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountProfile;
