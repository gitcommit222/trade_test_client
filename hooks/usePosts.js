import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleResponse } from "@/utils/api";
import toast from "react-hot-toast";

const createPost = async ({ postData }) => {
	const token = JSON.parse(localStorage.getItem("token"));
	const response = await fetch(`http://localhost:5000/posts`, {
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
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"]);
		},
		onError: (error) => {
			toast.error(`Error creating posts: ${error.message}`);
		},
	});
};

const updatePost = async ({ postData, postId }) => {
	const token = JSON.parse(localStorage.getItem("token"));
	const response = await fetch(`http://localhost:5000/posts/${postId}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postData),
	});
	return response.json();
};

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updatePost,
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"]);
		},
		onError: (error) => {
			toast.error(`Error updating posts: ${error.message}`);
		},
	});
};

const getAllPosts = async () => {
	const response = await fetch(`http://localhost:5000/posts`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

export const useGetAllPosts = () => {
	return useQuery({
		queryKey: ["posts"],
		queryFn: getAllPosts,
	});
};

const deletePost = async (postId) => {
	const token = JSON.parse(localStorage.getItem("token"));
	const response = await fetch(`http://localhost:5000/posts/${postId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"]);
		},
		onError: (error) => {
			toast.error(`Error deleting posts: ${error.message}`);
		},
	});
};
