import Sidenav from "@/components/Sidenav";
import { Box, Grid2 } from "@mui/material";
import React from "react";

const AdminLayout = ({ children }) => {
	return (
		<Box maxWidth="3xl" className="flex gap-2">
			<div className="border w-[220px]">
				<Sidenav />
			</div>
			<div className="border w-full p-10">
				<div>{children}</div>
			</div>
		</Box>
	);
};

export default AdminLayout;
