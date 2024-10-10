"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@mui/material";

export default function ButtonAppBar() {
	const { data: session } = useSession();

	const [user, setUser] = React.useState(
		JSON.parse(localStorage.getItem("user"))
	);

	const handleLogout = () => {
		if (user) {
			localStorage.removeItem("user");
		}

		setUser("");
		// signOut();
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" className="px-[80px]">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Memories
					</Typography>
					{user || session ? (
						<div className="flex items-center gap-4">
							<Avatar
								alt={user ? user.name : session.user.name}
								src={session?.user.image ? session.user.image : ""}
							>
								{user ? user.name.charAt(0) : session.user.name.charAt(0)}
							</Avatar>
							<Typography variant="h6">
								{user ? user.name : session.user.name}
							</Typography>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleLogout}
							>
								Logout
							</Button>
						</div>
					) : (
						<Button href="/sign-in" variant="contained" color="primary">
							Sign in
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
