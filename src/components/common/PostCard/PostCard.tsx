"use client";
import React from "react";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import CardFooter from "./CardFooter";
import PostImage from "./PostImage";
import { PostWithAuthorData } from "@/types/post";
import SimpleCard from "@/components/ui/SimpleCard";

const PostCard = ({ post }: { post: PostWithAuthorData }) => {
  return (
    <SimpleCard className="flex flex-col px-0">
      <div className="space-y-0.5 px-2">
        <PostHeader post={post} />
        <pre className="font-sans">
          {post.content && <PostContent content={post.content} />}
        </pre>
      </div>
      {post.image && <PostImage imgSrc={post.image} />}
      <CardFooter post={post} />
    </SimpleCard>
  );
};

export default PostCard;
