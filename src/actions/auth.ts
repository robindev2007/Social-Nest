"use server";
import { db } from "@/lib/prisma";
import { compare, hash } from "bcrypt";

export const singUpWithCredential = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already exist" };
  }
  const hashPassword = await hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email,
      fullName,
      password: hashPassword,
      avatar:
        "https://dseamzcnlda5cir3.public.blob.vercel-storage.com/avatar/avatar-account-icon-default-social-media-profile-photo-vector-wwIW3e8V5Qr2JcZXgTHTSEetc8ZeXJ.jpg",
    },
  });

  const { password: newUserPassword, ...rest } = newUser;

  return { user: rest };
};
