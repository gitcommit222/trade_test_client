import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const registerUser = async ({ userData }) => {
	const response = await fetch(`http://localhost:5000/users/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	return response.json();
};

export const useRegisterUser = () => {
	return useMutation({
		mutationFn: registerUser,
		onSuccess: () => {},
	});
};
