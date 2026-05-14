"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageCircle, ShoppingBagIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Button } from "../ui/button";

export function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const isMobile = useIsMobile();
  const { isAuthenticated, currentSelectedView } = useAuthStore();
  const pathname = usePathname();
  const hasReel = pathname.includes("reel");
  const messageCount = 9
  useEffect(() => {
    if (isMobile && hasReel) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  }, [isMobile, hasReel]);
  return (
    <header
      className={`${navbar ? "flex" : "hidden"} h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)`}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="w-full flex justify-between items-center">
          <SidebarTrigger className="-ml-1" />
          <div className="flex gap-4">
            {isAuthenticated && (
              <Link
                href="/chat"
                className="relative inline-flex items-center"
              >
                <MessageCircle className="size-4" />
                {messageCount > 0 && (
                  <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-destructive px-1 text-center text-[10px] leading-4 text-white">
                    {messageCount > 99 ? "99+" : messageCount}
                  </span>
                )}
              </Link>
            )}
            {!isAuthenticated && (
              <Link href="/auth/login" className="relative inline-flex items-center">
                <Button variant="ghost" size={"sm"}>
                  <UserIcon className="size-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
