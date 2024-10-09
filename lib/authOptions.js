import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	// session: {
	// 	strategy: jwt,
	// },
	// callbacks: {
	// 	async jwt({ token, account, user }) {
	// 		// If it's the initial sign-in, attach user and account data to the token
	// 		if (account && user) {
	// 			token.id = user.id; // User ID
	// 			token.accessToken = account.access_token; // Google access token
	// 		}
	// 		return token;
	// 	},
	// 	async session({ session, token }) {
	// 		// Attach the token to the session object so it's available in the frontend
	// 		session.user.id = token.id;
	// 		session.user.accessToken = token.accessToken;
	// 		return session;
	// 	},
	// 	secret: process.env.NEXTAUTH_SECRET,
	// },
};
