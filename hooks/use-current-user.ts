import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const session = useSession();

  if (!session.data) window.location.reload();
  return session.data?.user;
}
