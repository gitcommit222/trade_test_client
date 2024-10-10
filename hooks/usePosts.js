import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createPost = async ({ postData }) => {
	const token = JSON.parse(localStorage.getItem("token"));
	const response = await fetch(`http://localhost:5000/users`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postData),
	});
	return response.json();
};

export const useCreatePost = () => {
	return useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			useQueryClient().invalidateQueries(["posts"]);
		},
	});
};
