import { db } from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";

import { authOptions } from "@/lib/auth-options";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
