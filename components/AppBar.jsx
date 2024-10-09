"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@mui/material";

export default function ButtonAppBar() {
	const { data: session } = useSession();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Memories
					</Typography>
					{session ? (
						<div className="flex items-center gap-4">
							<Avatar alt={session.user.name} src={session.user.image}>
								{session.user.name.charAt(0)}
							</Avatar>
							<Typography variant="h6">{session.user.name}</Typography>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => signOut()}
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
