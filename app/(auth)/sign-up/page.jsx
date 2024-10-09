"use client";
import { useRegisterUser } from "@/hooks/useAuth";
import { Button, Card, Container, Input, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialData = {
	fullName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Signup = () => {
	const [userData, setUserData] = useState(initialData);

	const register = useRegisterUser();

	const router = useRouter();

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(userData);

		await toast.promise(register.mutateAsync({ userData }), {
			success: "Registered!",
			loading: "Adding user...",
			error: "Error adding user.",
		});
	};

	useEffect(() => {
		const { isSuccess } = register;

		if (isSuccess) {
			router.push("/sign-in");
			setUserData(initialData);
		}
	}),
		[register.isSuccess];

	return (
		<Container className="w-full h-screen flex items-center justify-center">
			<Card className="p-5 w-[350px] flex flex-col items-center justify-center">
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<Typography variant="h4" className="text-center">
							Signup
						</Typography>
						<div className="flex flex-col px-[12px] gap-3">
							<Input
								type="text"
								name="fullName"
								placeholder="Full name"
								onChange={handleChange}
							/>
							<Input
								type="email"
								placeholder="Email"
								onChange={handleChange}
								name="email"
							/>
							<Input
								type="password"
								placeholder="Password"
								onChange={handleChange}
								name="password"
							/>
							<Input
								type="password"
								placeholder="Confirm Password"
								onChange={handleChange}
								name="confirmPassword"
							/>
							<div>
								<Button
									variant="contained"
									type="submit"
									className="w-full"
									disabled={register.isPending}
								>
									Register
								</Button>
							</div>
							<div>
								<Typography className="text-[14px]">
									Already have an account?{" "}
									<Link href="/sign-in" className="text-blue-500">
										Sign in.
									</Link>
								</Typography>
							</div>
						</div>
					</div>
				</form>
			</Card>
		</Container>
	);
};

export default Signup;
