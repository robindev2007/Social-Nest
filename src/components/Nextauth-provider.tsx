"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const NextauthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default NextauthProvider;
