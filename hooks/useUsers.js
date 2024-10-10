import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getAllUsers = async () => {
	const token = JSON.parse(localStorage.getItem("token"));
	const response = await fetch(`http://localhost:5000/users`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

export const useGetUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});
};

const deleteUser = async ({ userId }) => {
	const token = JSON.parse(localStorage.getItem("token"));
	const response = await fetch(`http://localhost:5000/users/${userId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries(["users"]);
		},
	});
};

const getUserById = async (userId) => {
	const token = JSON.parse(localStorage.getItem("token"));
	const response = await fetch(`http://localhost:5000/users/${userId}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

export const useGetUserById = (userId) => {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId,
	});
};

const updateUser = async ({ userData, userId }) => {
	const token = JSON.parse(localStorage.getItem("token"));
	const response = await fetch(`http://localhost:5000/users/update/${userId}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	return response.json();
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries(["users"]);
		},
	});
};
