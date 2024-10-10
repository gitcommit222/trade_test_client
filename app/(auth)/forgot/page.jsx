"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Input, Typography } from "@mui/material";
import { useForgotPassword } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialData = {
	email: "",
	newPassword: "",
};

const ForgotPassword = () => {
	const saveNewPassword = useForgotPassword();

	const [userData, setUserData] = useState(initialData);

	const router = useRouter();

	const handleSubmit = async (e) => {
		console.log(userData);
		e.preventDefault();
		try {
			await toast.promise(
				saveNewPassword.mutateAsync({
					email: userData.email,
					newPassword: userData.newPassword,
				}),
				{
					success: "Password updated!",
					loading: "Updating password...",
					error: "Error updating password.",
				}
			);

			setUserData(initialData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const { isSuccess } = saveNewPassword;

		if (isSuccess) {
			router.push("/sign-in");
			setUserData(initialData);
		}
	}),
		[saveNewPassword.isSuccess];

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	return (
		<Container className="w-full h-screen flex items-center justify-center">
			<Card className="p-5 w-[350px] flex flex-col items-center justify-center">
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<Typography variant="h4" className="text-center">
							Forgot Password
						</Typography>
						<div className="flex flex-col px-[12px] gap-3">
							<Input
								type="email"
								name="email"
								placeholder="Email"
								onChange={handleChange}
							/>
							<Input
								type="password"
								name="newPassword"
								placeholder="New Password"
								onChange={handleChange}
							/>
							<div>
								<Button
									disabled={saveNewPassword.isPending}
									variant="contained"
									type="submit"
									className="w-full"
								>
									Save
								</Button>
							</div>
						</div>
					</div>
				</form>
			</Card>
		</Container>
	);
};

export default ForgotPassword;
