"use server";
import { db } from "@/lib/prisma";

export const getPosts = async () => {
  const posts = await db.post.findMany({
    take: 20,

    select: {
      id: true,
      content: true,
      image: true,
      updatedAt: true,
      title: true,
      author: {
        select: {
          avatar: true,
          id: true,
          fullName: true,
        },
      },
    },
  });

  return posts;
};
