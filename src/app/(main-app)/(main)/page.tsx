import PostCard from "@/components/common/PostCard/PostCard";
import React from "react";
import CreatePost from "./components/CreatePost";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const getPosts = async ({ userId }: { userId: string }) => {
  try {
    const posts = await db.post.findMany({
      take: 20,
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            avatar: true,
            fullName: true,
          },
        },
        likes: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    const postWithIsLiked = posts.map((post) => ({
      ...post,
      isLiked: post.likes.length > 0,
    }));
    return { posts: postWithIsLiked };
  } catch (error) {
    return { error: "Something went worng" };
  }
};

const MainAppPage = async () => {
  const session = await getServerSession(authOptions);
  const posts = await getPosts({ userId: session?.user.id as string });
  return (
    <div className="flex w-full flex-col gap-card">
      <CreatePost session={session} />
      <div className="flex flex-col justify-between gap-card">
        {posts.posts &&
          posts.posts?.map((post, i) => <PostCard key={i} post={post} />)}
      </div>
    </div>
  );
};

export default MainAppPage;
