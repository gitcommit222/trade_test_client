"use client";
import { useLogin } from "@/hooks/useAuth";
import { Button, Card, Container, Input, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialData = {
	email: "",
	password: "",
};

const SignIn = () => {
	const [userData, setUserData] = useState(initialData);

	const login = useLogin();

	const router = useRouter();

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(userData);

		try {
			await login.mutateAsync({
				email: userData.email,
				password: userData.password,
			});
			setUserData(initialData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (login.isSuccess) {
			toast.success(`Welcome, ${login?.data?.user?.name}`);
			router.push("/");
		}
	}, [login.isError, login.isSuccess]);

	return (
		<Container className="w-full h-screen flex items-center justify-center">
			<Card className="p-5 w-[350px] flex flex-col items-center justify-center">
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<Typography variant="h4" className="text-center">
							Sign in with your credentials
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
								name="password"
								placeholder="Password"
								onChange={handleChange}
							/>
							<Link href="/forgot" className="text-blue-500">
								Forgot password?
							</Link>
							<div>
								<Button
									disabled={login.isPending}
									variant="contained"
									type="submit"
									className="w-full"
								>
									Login
								</Button>
							</div>
							<div>
								<Typography className="text-[14px]">
									Don't have an account?{" "}
									<Link href="/sign-up" className="text-blue-500">
										Sign up.
									</Link>
								</Typography>
							</div>
						</div>
					</div>
				</form>
				<Typography>or</Typography>
				<Button
					disabled={login.isPending}
					onClick={() => signIn("google", { callbackUrl: "/" })}
				>
					Sign in with Google
				</Button>
			</Card>
		</Container>
	);
};

export default SignIn;
