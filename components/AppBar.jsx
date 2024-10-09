"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useSession } from "next-auth/react";

export default function ButtonAppBar() {
	const { data: session } = useSession();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Memories
					</Typography>
					<Button color="inherit" href="/sign-in">
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
