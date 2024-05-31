"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useOptimistic } from "react";
import { HiThumbUp } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import { PostWithAuthorData } from "@/types/post";
import { addLike } from "@/actions/post";
import LikeButton from "./ChatFooter/LikeButton";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-2 px-2">
      <div className="px-2 text-sm text-muted-foreground">
        <span>{optimisticPostData.likes} likes</span>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex justify-between gap-2">
        <LikeButton onClick={addNewLike} liked={optimisticPostData.liked} />
        <Button
          variant={"ghost"}
          className="flex w-full items-center gap-1 hover:bg-secondary"
        >
          <FaRegComment className="size-5" /> Comments
        </Button>
        <Button
          variant={"ghost"}
          className="flex w-full items-center gap-1 hover:bg-secondary"
        >
          <HiThumbUp className="size-5" /> Share
        </Button>
      </div>
    </div>
  );
};

export default CardFooter;
