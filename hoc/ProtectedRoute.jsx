"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");

		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser);
				setUser(parsedUser);

				if (
					allowedRoles.length > 0 &&
					!allowedRoles.includes(parsedUser.role)
				) {
					router.push("/forbidden");
				}
			} catch (error) {
				console.error("Failed to parse user data:", error);
				localStorage.removeItem("user");
				router.push("/");
			}
		} else {
			router.push("/");
		}
	}, [router, allowedRoles]);

	if (!user) {
		return <p>Loading...</p>;
	}

	return <>{user && allowedRoles.includes(user.role) && children}</>;
};

export default ProtectedRoute;
