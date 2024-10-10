"use client";
import {
	Button,
	Card,
	Container,
	Input,
	InputLabel,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { useDeleteUser, useGetUsers } from "@/hooks/useUsers";
import toast from "react-hot-toast";
import CreateUserForm from "@/components/CreateUserForm";

const AdminDashboard = () => {
	const [currentId, setCurrentId] = useState(0);

	const { data: usersList, isLoading: isUserLoading } = useGetUsers();

	const deleteUser = useDeleteUser();

	const handleDeleteUser = async (userId) => {
		console.log(userId);
		await toast.promise(deleteUser.mutateAsync({ userId }), {
			success: "Deleted.",
			loading: "Deleting...",
			error: "Error deleting user.",
		});
	};

	return (
		<Container maxWidth="2xl">
			<Typography variant="h4">Welcome, Admin!</Typography>
			<div className="mt-5 py-3 flex gap-2">
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>UUID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Username</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Posts</TableCell>
								<TableCell>Role</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{usersList &&
								!isUserLoading &&
								usersList?.users?.map((user) => (
									<TableRow
										key={user._id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell>{user?._id.substring(1, 7)}</TableCell>
										<TableCell>{user?.name}</TableCell>
										<TableCell>{user?.username || "--"}</TableCell>
										<TableCell>{user?.email}</TableCell>
										<TableCell>4</TableCell>
										<TableCell className="capitalize">{user?.role}</TableCell>
										<TableCell className="flex items-center justify-center gap-2">
											<Button onClick={() => setCurrentId(user?._id)}>
												Edit
											</Button>
											<Button
												color="error"
												onClick={() => handleDeleteUser(user?._id)}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<CreateUserForm currentId={currentId} setCurrentId={setCurrentId} />
			</div>
		</Container>
	);
};

export default AdminDashboard;
