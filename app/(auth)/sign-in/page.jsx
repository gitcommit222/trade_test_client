"use client";
import { Button, Card, Container, Input, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const initialData = {
	email: "",
	password: "",
};

const SignIn = () => {
	const [userData, setUserData] = useState(initialData);
	return (
		<Container className="w-full h-screen flex items-center justify-center">
			<Card className="p-5 w-[350px] flex flex-col items-center justify-center">
				<form>
					<div className="space-y-4">
						<Typography variant="h4" className="text-center">
							Sign in with your credentials
						</Typography>
						<div className="flex flex-col px-[12px] gap-3">
							<Input type="email" placeholder="Email" />
							<Input type="password" placeholder="Password" />
							<Link href="/forgot-password" className="text-blue-500">
								Forgot password?
							</Link>
							<div>
								<Button variant="contained" type="submit" className="w-full">
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
				<Button onClick={() => signIn("google", { callbackUrl: "/" })}>
					Sign in with Google
				</Button>
			</Card>
		</Container>
	);
};

export default SignIn;
