import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
