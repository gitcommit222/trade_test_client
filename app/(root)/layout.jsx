import AppBarComponent from "@/components/AppBar";
import { Container } from "@mui/material";

export default function MainLayout({ children }) {
	return (
		<main>
			<AppBarComponent />
			<div className="px-[80px]">
				<Container maxWidth="2xl">{children}</Container>
			</div>
		</main>
	);
}
