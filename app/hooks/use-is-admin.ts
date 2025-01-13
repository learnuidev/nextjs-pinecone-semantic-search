import { useGetEmail } from "./use-get-email";

export const useIsAdmin = () => {
  const emailAddress = useGetEmail();

  return process.env.NEXT_PUBLIC_ADMIN_EMAIL === emailAddress;
};
