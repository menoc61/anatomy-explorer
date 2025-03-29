import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Configure authentication providers here
    // Example: GitHub, Google, Email, etc.
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
