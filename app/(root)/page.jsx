"use client";
import { defaultImg } from "@/public";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostForm from "@/components/PostForm";
import { useDeletePost, useGetAllPosts, useLikePost } from "@/hooks/usePosts";
import { format } from "date-fns";
import toast from "react-hot-toast";

const Landing = () => {
	const [currentId, setCurrentId] = useState(0);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

	const { data: allPosts, isLoading: isPostsLoading } = useGetAllPosts();
	const deletePost = useDeletePost();
	const likePost = useLikePost();

	const handleDeletePost = async (postId) => {
		await toast.promise(deletePost.mutateAsync(postId), {
			success: "Deleted.",
			loading: "Deleting...",
			error: "Error deleting post.",
		});
	};

	const Likes = ({ post }) => {
		if (post?.likes?.length > 0) {
			return post.likes.find((like) => like === user?.id) ? (
				<>
					<ThumbUpIcon fontSize="small" className="text-gray-500" />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlinedIcon fontSize="small" className="text-blue-500" />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
				</>
			);
		}

		return (
			<>
				<ThumbUpAltOutlinedIcon fontSize="small" />
				&nbsp;Like
			</>
		);
	};
	return (
		<section className="py-10 flex">
			<div className="flex-1 flex gap-4 flex-wrap">
				{allPosts &&
					!isPostsLoading &&
					allPosts?.map((post) => (
						<Card className="w-[300px] h-[400px] rounded-t-md" key={post?._id}>
							<div className="border w-full h-[60%] relative">
								<Image
									src={post?.selectedFile ? post.selectedFile : defaultImg}
									fill
									className="object-cover rounded-t-md p-5"
									alt="place"
								/>
							</div>
							<div className="p-2 space-y-1">
								<div className="flex items-center justify-between ">
									<div className="flex items-center gap-2">
										<Avatar sizes="small">
											{post?.creator?.name.charAt(0)}
										</Avatar>
										<div>
											<p className="text-gray-600 text-[14px]">
												{post?.creator?.name || "--"}
											</p>
											<p className="text-gray-400 text-[12px]">
												{post?.creator?.email || "--"}
											</p>
										</div>
									</div>
									{user && post?.creator?.email === user.email && (
										<div className="flex items-center">
											<Button
												variant="text"
												size="small"
												onClick={() => setCurrentId(post?._id)}
											>
												<EditIcon fontSize="small" />
											</Button>
											<Button
												onClick={() => handleDeletePost(post?._id)}
												variant="text"
												color="error"
												size="small"
											>
												<DeleteIcon fontSize="small" />
											</Button>
										</div>
									)}
								</div>
								<div className="flex justify-between items-center">
									<Typography variant="h6">{post?.title}</Typography>
									<p className="text-[12px] text-gray-500">
										{format(post?.createdAt, "MMMM do, yyyy")}
									</p>
								</div>
								<div>
									<p className="text-[12px] text-gray-500">{post?.message}</p>
									<div className="flex items-center justify-between">
										<p className="text-blue-500 text-[14px]">
											{post.tags.map((tag) => `#${tag} `)}
										</p>
										<Button
											size="small"
											color="primary"
											disabled={!user}
											onClick={() => likePost.mutate(post._id)}
										>
											<Likes post={post} />
										</Button>
									</div>
								</div>
							</div>
						</Card>
					))}
			</div>
			{user && (
				<div className="w-[300px] rounded-md">
					<PostForm currentId={currentId} setCurrentId={setCurrentId} />
				</div>
			)}
		</section>
	);
};

export default Landing;
