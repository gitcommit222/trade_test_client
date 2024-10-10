"use client";
import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Sidenav = () => {
	const [user, setUser] = React.useState(
		JSON.parse(localStorage.getItem("user"))
	);
	const router = useRouter();
	const handleLogout = () => {
		if (user) {
			localStorage.removeItem("user");
		}

		setUser("");
		signOut();
		router.push("/");
	};

	return (
		<div className="py-5 h-screen flex flex-col items-center">
			<div className="py-5">
				<Typography variant="h5">Memories</Typography>
			</div>
			<div className="py-5">
				<Button onClick={handleLogout}>Logout</Button>
			</div>
		</div>
	);
};

export default Sidenav;
