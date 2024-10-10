"use client";
import { defaultImg } from "@/public";
import { Box, Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Landing = () => {
	const likes = [1, 2, 3, 4];
	return (
		<section className="py-10 flex">
			<div className="flex-1">
				<Link href={`/`}>
					<Card className="w-[300px] h-[330px]">
						<div className="border w-full h-[60%] relative">
							<Image
								src={defaultImg}
								fill
								className="object-contain"
								alt="place"
							/>
						</div>
						<div className="p-2 space-y-3">
							<div className="flex justify-between ">
								<Typography variant="h6">Place 1</Typography>
								<div>
									<Button size="small">
										<EditIcon fontSize="small" />
									</Button>
									<Button color="error" size="small">
										<DeleteIcon fontSize="small" />
									</Button>
								</div>
							</div>
							<div>
								<p className="text-[12px] text-gray-500">
									{`Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Obcaecati, cumque excepturi! `}
								</p>
								<div className="flex items-center justify-between">
									<p className="text-blue-500 text-[14px]">#place1 #moments</p>
									<div>
										<Button>
											<ThumbUpIcon fontSize="small" className="text-blue-500" />
											&nbsp;
											<span className="text-[12px]">
												{likes.length > 2
													? `You & ${likes.length - 1} others`
													: `${likes.length} like${
															likes.length > 1 ? "s" : ""
													  }`}
											</span>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</Link>
			</div>
			<div className="w-[300px] border rounded-md"></div>
		</section>
	);
};

export default Landing;
