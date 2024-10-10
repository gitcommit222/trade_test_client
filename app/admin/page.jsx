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
import React from "react";
import Paper from "@mui/material/Paper";
import { useGetUsers } from "@/hooks/useUsers";

const AdminDashboard = () => {
	const { data: users, isLoading: isUserLoading } = useGetUsers();

	console.log(users);

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
								<TableCell>Email</TableCell>
								<TableCell>Username</TableCell>
								<TableCell>Posts</TableCell>
								<TableCell>Role</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell>1</TableCell>
								<TableCell>Marnel Valentin</TableCell>
								<TableCell>test@email.com</TableCell>
								<TableCell>user1</TableCell>
								<TableCell>4</TableCell>
								<TableCell>user</TableCell>
								<TableCell className="flex items-center justify-center gap-2">
									<Button>Edit</Button>
									<Button color="error">Delete</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Card className="w-[500px] p-5">
					<form className="space-y-4">
						<Typography variant="h4" className="text-center">
							User Form
						</Typography>

						<Input
							type="text"
							name="fullName"
							placeholder="Full name"
							className="w-full"
							// onChange={handleChange}
						/>
						<Input
							type="email"
							placeholder="Email"
							// onChange={handleChange}
							name="email"
							className="w-full"
						/>
						<Input
							type="password"
							placeholder="Password"
							// onChange={handleChange}
							name="password"
							className="w-full"
						/>
						<Input
							type="password"
							placeholder="Confirm Password"
							// onChange={handleChange}
							name="confirmPassword"
							className="w-full"
						/>
						<div>
							<InputLabel id="demo-simple-select-standard-label">
								Role
							</InputLabel>
							<Select
								labelId="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								label="Age"
								className="w-full"
							>
								<MenuItem value="user">User</MenuItem>
								<MenuItem value="admin">Admin</MenuItem>
							</Select>
						</div>
						<div>
							<Button
								variant="contained"
								type="submit"
								className="w-full"
								// disabled={register.isPending}
							>
								Save
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</Container>
	);
};

export default AdminDashboard;
