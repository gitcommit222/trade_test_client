"use client";
import { useCreatePost, useGetAllPosts, useUpdatePost } from "@/hooks/usePosts";
import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import toast from "react-hot-toast";

const PostForm = ({ currentId, setCurrentId }) => {
	const createPost = useCreatePost();
	const updatePost = useUpdatePost();
	const [postData, setPostData] = useState({
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
		videoLink: "",
	});

	const { data: posts } = useGetAllPosts();

	const post = posts && posts.find((p) => p._id === currentId);

	console.log(post);

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (currentId === 0) {
				await toast.promise(createPost.mutateAsync({ postData }), {
					success: "New post created.",
					loading: "Adding new post...",
					error: "Error creating post.",
				});
				clear();
			} else {
				await toast.promise(
					updatePost.mutateAsync({ postData, postId: currentId }),
					{
						success: "Updated.",
						loading: "Updating post info...",
						error: "Error updating post info.",
					}
				);
				clear();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const clear = () => {
		setCurrentId(0);
		setPostData({
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
			videoLink: "",
		});
	};

	return (
		<Card className=" p-5">
			<form className="space-y-4" onSubmit={handleSubmit}>
				<Typography variant="h4" className="text-center">
					{currentId ? "Update" : "Create"} a Memory
				</Typography>

				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					multiline
					minRows={4}
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(",") })
					}
				/>
				<TextField
					name="videoLink"
					variant="outlined"
					label="Video Link"
					type="url"
					fullWidth
					value={postData.videoLink}
					onChange={(e) =>
						setPostData({ ...postData, videoLink: e.target.value })
					}
				/>
				<div>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					// className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
					disabled={createPost.isPending}
				>
					{currentId ? "Update" : "Create"}
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Card>
	);
};

export default PostForm;
