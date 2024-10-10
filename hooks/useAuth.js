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
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			queryClient.invalidateQueries(["users"]);
		},
	});
};

const login = async ({ email, password }) => {
	const response = await fetch(`http://localhost:5000/users/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	return response.json();
};

export const useLogin = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			if (data.user) {
				localStorage.setItem("user", JSON.stringify(data.user));
				localStorage.setItem("token", JSON.stringify(data.token));
			}
			queryClient.setQueryData(["user"], data.user);
		},
	});
};

const forgotPassword = async ({ email, newPassword }) => {
	const response = await fetch(`http://localhost:5000/users/${email}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ newPassword }),
	});
	return response.json();
};

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: forgotPassword,
	});
};

const loginWithGoogle = async ({ user }) => {
	const response = await fetch(`http://localhost:5000/users/googleSync`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: user.email, name: user.name }),
	});

	return response.json();
};
