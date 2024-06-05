"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const searchUser = async ({ name }: { name: string }) => {
  try {
    const users = await db.user.findMany({
      where: {
        fullName: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        fullName: true,
        avatar: true,
        id: true,
      },
    });

    return { users };
  } catch (error) {
    return { error: "adf" };
  }
};

export type useraWithouPass = Prisma.UserGetPayload<{}>;

export const getUserById = async ({
  userId,
  includePassWord,
}: {
  userId: string;
  includePassWord?: boolean;
}) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {};
    }

    const { password: a, ...userWithoutPass } = user;

    return user;
  } catch (error) {
    console.log(error);
    return { error: "Something went worng" };
  }
};
