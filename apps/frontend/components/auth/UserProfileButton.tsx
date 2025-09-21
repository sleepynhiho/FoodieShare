"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { refreshUserData } from "@/services/authService";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthActions } from "@/hooks/useAuthActions";

export function UserProfileButton() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const { logout } = useAuthActions();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await refreshUserData();
        setUser(data);
      } catch (err) {
        console.error("Failed to refresh user data:", err);
      }
    };

    fetchUser();
  }, [setUser]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-0 h-8 w-8 hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 transition-all duration-200"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/avatar.jpg"} alt={user.username} />
              <AvatarFallback className="bg-orange-500 text-white text-xs">
                {user.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black text-white hover:bg-black/80"
          >
            <User className="w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {user && (
          <>
            <div className="flex items-center justify-start gap-3 p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar || "/avatar.jpg"} alt={user.username} />
                <AvatarFallback className="bg-orange-500 text-white text-sm">
                  {user.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.username}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
