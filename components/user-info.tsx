"use client";

import { ExtendedUser } from "@/next-auth";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ShowInfo from "./auth/show-info";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export default function UserInfo({ user, label }: UserInfoProps) {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ShowInfo title="ID" content={user?.id} />
        <ShowInfo title="Name" content={user?.name} />
        <ShowInfo title="Email" content={user?.email} />
        <ShowInfo title="Role" content={user?.role} />
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentification</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
