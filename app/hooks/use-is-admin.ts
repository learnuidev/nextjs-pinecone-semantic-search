import { useUser } from "@clerk/nextjs";

export const useIsAdmin = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const emailAddress = user?.emailAddresses?.[0]?.emailAddress;

  return process.env.NEXT_PUBLIC_ADMIN_EMAIL === emailAddress;
};
