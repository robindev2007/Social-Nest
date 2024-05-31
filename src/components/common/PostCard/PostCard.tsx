"use client";
import React from "react";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import CardFooter from "./CardFooter";
import PostImage from "./PostImage";
import { PostWithAuthorData } from "@/types/post";

const PostCard = ({ post }: { post: PostWithAuthorData }) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border bg-card py-2 pb-1 shadow-md">
      <div className="space-y-1 px-2">
        <PostHeader post={post} />
        <pre className="font-sans">
          {post.content && <PostContent content={post.content} />}
        </pre>
      </div>
      {post.image && <PostImage imgSrc={post.image} />}
      <CardFooter post={post} />
    </div>
  );
};

export default PostCard;
