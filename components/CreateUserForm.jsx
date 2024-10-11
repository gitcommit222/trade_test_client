"use client";
import { useRegisterUser } from "@/hooks/useAuth";
import { useGetUserById, useUpdateUser } from "@/hooks/useUsers";
import {
	Button,
	Card,
	Input,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialData = {
	fullName: "",
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: "",
};

const CreateUserForm = ({ currentId, setCurrentId }) => {
	const [userData, setUserData] = useState(initialData);
	const { data: user } = useGetUserById(currentId || "");

	console.log(currentId);

	const addUser = useRegisterUser();
	const updateUser = useUpdateUser();

	useEffect(() => {
		if (user) {
			setUserData(user.user);
		}
	}, [user]);

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (currentId === 0) {
				await toast.promise(addUser.mutateAsync({ userData }), {
					success: "New user created.",
					loading: "Adding new user...",
					error: "Error creating user.",
				});
				setCurrentId(0);
				setUserData(initialData);
			} else {
				await toast.promise(
					updateUser.mutateAsync({ userData, userId: currentId }),
					{
						success: "Updated.",
						loading: "Updating user info...",
						error: "Error updating user info.",
					}
				);
				setCurrentId(0);
				setUserData(initialData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card className="w-[500px] p-5">
			<form className="space-y-4" onSubmit={handleSubmit}>
				<Typography variant="h4" className="text-center">
					{currentId ? "Update" : "Create"} User
				</Typography>

				<Input
					type="text"
					name="fullName"
					placeholder="Full name"
					className="w-full"
					onChange={handleChange}
					value={userData.name}
				/>
				<Input
					type="text"
					name="username"
					placeholder="Username"
					className="w-full"
					onChange={handleChange}
					value={userData.username}
				/>
				<Input
					type="email"
					placeholder="Email"
					onChange={handleChange}
					name="email"
					className="w-full"
					value={userData.email}
				/>
				{!currentId && (
					<>
						<Input
							type="password"
							placeholder="Password"
							onChange={handleChange}
							name="password"
							className="w-full"
						/>
						<Input
							type="password"
							placeholder="Confirm Password"
							onChange={handleChange}
							name="confirmPassword"
							className="w-full"
						/>
					</>
				)}
				<div>
					<InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
					<Select
						labelId="demo-simple-select-standard-label"
						id="demo-simple-select-standard"
						label="Age"
						className="w-full"
						name="role"
						onChange={handleChange}
						value={userData.role}
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
						disabled={addUser.isPending}
					>
						{currentId ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default CreateUserForm;
