"use client";

import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ModeToggle } from "@/components/modeToggle";

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        { "border-b shadow-sm": scrolled }
      )}
    >
      <Logo />

      <div className="md:justify-end md:ml-auto justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
};
