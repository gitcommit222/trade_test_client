import Sidenav from "@/components/Sidenav";
import ProtectedRoute from "@/hoc/ProtectedRoute";
import { Box, Grid2 } from "@mui/material";
import React from "react";

const AdminLayout = ({ children }) => {
	return (
		<ProtectedRoute allowedRoles={["admin"]}>
			<Box maxWidth="3xl" className="flex gap-2">
				<div className="shadow-sm w-[220px]">
					<Sidenav />
				</div>
				<div className=" w-full p-10">
					<div>{children}</div>
				</div>
			</Box>
		</ProtectedRoute>
	);
};

export default AdminLayout;
