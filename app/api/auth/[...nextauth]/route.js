import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth/next"; //Remove /next when I got error

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
