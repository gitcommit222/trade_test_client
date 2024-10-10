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
