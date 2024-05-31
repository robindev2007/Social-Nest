import PostCard from "@/components/common/PostCard/PostCard";
import { PostWithAuthorData } from "@/types/post";
import React from "react";

const UserPosts = ({ posts }: { posts: PostWithAuthorData[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
