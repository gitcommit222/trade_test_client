import AppBarComponent from "@/components/AppBar";
import { Container } from "@mui/material";

export default function MainLayout({ children }) {
	return (
		<main>
			<AppBarComponent />
			<Container maxWidth="xl">{children}</Container>
		</main>
	);
}
