import { Prisma } from "@prisma/client";

export type post = {
  id: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  img: string;
  title: string;
  content?: string;
  publishDate: Date;
  likes: number;
};

export type user = Prisma.UserGetPayload<{}>;
export type userWithOutPass = Omit<user, "password">;

export type PostWithAuthorData = Prisma.PostGetPayload<{
  take: 20;
  orderBy: {
    updatedAt: "desc";
  };
  select: {
    id: true;
    content: true;
    image: true;
    updatedAt: true;
    title: true;
    author: {
      select: {
        avatar: true;
        id: true;
        fullName: true;
      };
    };
    likes: {
      where: {
        userId: "";
      };
      select: {
        id: true;
      };
    };
    _count: {
      select: {
        likes: true;
      };
    };
  };
}> & { isLiked: boolean };
