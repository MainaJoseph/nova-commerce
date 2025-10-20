"use client";

import { SafeUser } from "@/types";
import ProfileDropDownMenu from "./ProfileDropDownMenu";

interface ProfileDropDownMenuClientProps {
  currentUser: SafeUser | null;
}

const ProfileDropDownMenuClient: React.FC<ProfileDropDownMenuClientProps> = ({
  currentUser,
}) => {
  return (
    <div>
      <ProfileDropDownMenu currentUser={currentUser} />
    </div>
  );
};

export default ProfileDropDownMenuClient;
