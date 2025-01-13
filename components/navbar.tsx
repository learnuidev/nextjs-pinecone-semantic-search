"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

export const NavBar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="px-4 sm:px-8 md:px-24 pt-8 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Z
      </Link>

      <div className="flex space-x-4 items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <SignOutButton />
        </SignedIn>

        <button
          onClick={() => {
            if (theme === "dark") {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
};
