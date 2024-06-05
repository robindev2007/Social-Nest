import PostCard from "@/components/common/PostCard/PostCard";
import { PostWithAuthorData } from "@/types/post";
import React from "react";

const UserPosts = ({ posts }: { posts: PostWithAuthorData[] }) => {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default UserPosts;
