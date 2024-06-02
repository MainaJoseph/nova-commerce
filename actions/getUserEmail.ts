"use server";

import { getCurrentUser } from "@/actions/getCurrentUser";

export const getUserEmail = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.email) {
    return "";
  }

  return currentUser.email;
};
