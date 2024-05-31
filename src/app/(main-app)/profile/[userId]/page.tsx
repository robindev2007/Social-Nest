import React from "react";
import Header from "@/components/common/Header/Header";
import Profile from "./components/Profile";
import { db } from "@/lib/prisma";
import AboutmeCard from "./components/AboutmeCard";
import UserPosts from "./components/UserPosts";

const getUserPosts = async ({ userId }: { userId: string }) => {
  try {
    const posts = await db.post.findMany({
      take: 20,
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            avater: true,
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
    return { error: "No posts", posts: [] };
  }
};

const UserPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const { posts } = await getUserPosts({ userId });

  if (!user) {
    return <div>No user</div>;
  }

  const { password: _, ...userData } = user;

  return (
    <div className="flex flex-col gap-card">
      <Header />
      <div className="grid grid-cols-5 gap-card px-2">
        <div className="col-span-2 flex flex-col gap-card">
          <Profile user={userData} />
          <AboutmeCard />
        </div>
        <div className="col-span-3">
          {/* {posts ? <UserPosts posts={posts} /> : <span>No post found</span>} */}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
