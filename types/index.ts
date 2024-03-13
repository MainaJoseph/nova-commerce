import { User } from "@prisma/client";

export type SafeUser = Omit<User, "emailVerified"> & {
  emailVerified: string | null;
};
