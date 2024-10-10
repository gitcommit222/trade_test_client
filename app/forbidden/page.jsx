import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Forbidden = () => {
	return (
		<div className="w-full h-screen flex flex-col space-y-4 items-center justify-center">
			<Typography variant="h3">403 Forbidden Page</Typography>
			<Typography>You are not allowed to access this page</Typography>
			<Link
				href="/"
				className="text-blue-500 underline
            "
			>
				Return Home
			</Link>
		</div>
	);
};

export default Forbidden;
