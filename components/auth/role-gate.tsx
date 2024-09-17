"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-messages";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
}

export default function RoleGate({ children, allowedRoles }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRoles) {
    return (
      <FormError message="You do not have persmission to view this content!" />
    );
  }

  return <>{children}</>;
}
