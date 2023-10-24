import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src="/logo.svg" className="dark:hidden" alt="Jotion_Logo" height="40" width="40" />
      <Image src="/logo-dark.svg" className="hidden dark:block" alt="Jotion_Logo" height="40" width="40" />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
};
