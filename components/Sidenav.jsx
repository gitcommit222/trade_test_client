import { Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Sidenav = () => {
	return (
		<div className="py-5 h-screen flex flex-col items-center">
			<div className="py-5">
				<Typography variant="h5">Memories</Typography>
			</div>
			<div className="py-5">
				<Button>Logout</Button>
			</div>
		</div>
	);
};

export default Sidenav;
