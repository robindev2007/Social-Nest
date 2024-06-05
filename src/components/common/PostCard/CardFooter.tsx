"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useOptimistic } from "react";
import { HiThumbUp } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import { PostWithAuthorData } from "@/types/post";
import { addLike } from "@/actions/post";
import LikeButton from "./ChatFooter/LikeButton";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TbShare3 } from "react-icons/tb";

const CardFooter = ({ post }: { post: PostWithAuthorData }) => {
  const [optimisticPostData, setOptimisticPostData] = useOptimistic({
    likes: post._count.likes,
    liked: post.isLiked,
  });

  const addNewLike = async () => {
    const newLikedState = !optimisticPostData.liked;
    const newLikesCount = newLikedState
      ? optimisticPostData.likes + 1
      : optimisticPostData.likes - 1;

    setOptimisticPostData({
      ...optimisticPostData,
      liked: newLikedState,
      likes: newLikesCount,
    });

    const like = await addLike({ postId: post.id });

    if (like.error) {
      // Revert the optimistic update in case of an error
      setOptimisticPostData({
        ...optimisticPostData,
        liked: !newLikedState,
        likes: optimisticPostData.likes,
      });
    }
  };

  return (
    <div className="flex justify-between p-2 pb-0">
      <div className="flex gap-2">
        <LikeButton onClick={addNewLike} liked={optimisticPostData.liked} />
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center justify-center gap-1 text-center hover:bg-secondary"
        >
          <IoChatbubbleOutline className="size-5" />
          <p className="pt-0">Comments</p>
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center justify-center gap-1 text-center hover:bg-secondary"
        >
          <TbShare3 className="size-6" /> Share
        </Button>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Likes {optimisticPostData.likes}</span>
      </div>
    </div>
  );
};

export default CardFooter;
