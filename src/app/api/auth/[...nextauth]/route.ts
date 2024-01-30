import NextAuth from "next-auth";
import { config } from "../authOptions";

const handler = NextAuth(config);
export { handler as GET, handler as POST };
