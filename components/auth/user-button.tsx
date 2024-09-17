"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogoutButton } from "@/components/auth/logout-button";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { useCurrentUser } from "@/hooks/use-current-user";

export function UserButton() {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <DropdownMenuItem className="cursor-pointer">
          <PersonIcon className="h-4 w-4 mr-2" />
          Profil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
