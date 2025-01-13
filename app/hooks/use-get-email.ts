import { useUser } from "@clerk/nextjs";

export const useGetEmail = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const emailAddress = user?.emailAddresses?.[0]?.emailAddress;

  return emailAddress || "";
};
