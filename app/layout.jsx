import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/theme";
import SessionWrapper from "@/components/SessionWrapper";
import Providers from "@/hoc/Providers";
import { Toaster } from "react-hot-toast";

const poppins = localFont({
	src: "./fonts/Poppins-Regular.ttf",
	variable: "--font-poppins",
	weight: "100 300 400 900",
	display: "swap",
});

export const metadata = {
	title: "Memories",
	description: "Trade test for UNIRA I position.",
};

export default function RootLayout({ children }) {
	return (
		<SessionWrapper>
			<html lang="en">
				<body className={` ${poppins.variable} antialiased`}>
					<AppRouterCacheProvider>
						<ThemeProvider theme={theme}>
							<Providers>
								{children}
								<Toaster position="bottom-center" />
							</Providers>
						</ThemeProvider>
					</AppRouterCacheProvider>
				</body>
			</html>
		</SessionWrapper>
	);
}
