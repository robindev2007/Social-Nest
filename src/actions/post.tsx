"use server";

import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createPost = async ({ formData }: { formData: any }) => {
  const session = await getServerSession(authOptions);

  const image = formData.get("file");
  const text = formData.get("text") as string | null;

  let imageData;

  if (image) {
    formData.append("file", image as any);
    formData.append("upload_preset", "ml_default");
    formData.append("api_key", "792469126438849");

    const uploadImgRes = await fetch(
      "https://api.cloudinary.com/v1_1/dyprhpyjc/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const uploadImgData = await uploadImgRes.json();

    imageData = {
      url: uploadImgData.url,
      height: uploadImgData.height,
      width: uploadImgData.width,
    };
  }

  try {
    await db.post.create({
      data: {
        image: imageData?.url || null,
        content: text,
        authorId: session?.user.id as string,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Someting went worng" };
  }
};

export const addLike = async ({ postId }: { postId: string }) => {
  const session = await getServerSession(authOptions);

  try {
    const alreadyLiked = await db.like.findFirst({
      where: {
        userId: session?.user.id,
        postId: postId,
      },
    });

    if (alreadyLiked) {
      await db.like.delete({
        where: {
          id: alreadyLiked.id,
        },
      });
      return { msg: "Like removed" };
    } else {
      const like = await db.like.create({
        data: {
          userId: session?.user.id as string,
          postId,
        },
        select: {
          id: true,
        },
      });
      return { data: like, msg: "Like added" };
    }
  } catch (error) {
    return { error: "Something went worng" };
  }
};
