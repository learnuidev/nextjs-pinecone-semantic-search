"use client";

import {
  ClerkProvider as _ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SignedIn>{children}</SignedIn>

      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
