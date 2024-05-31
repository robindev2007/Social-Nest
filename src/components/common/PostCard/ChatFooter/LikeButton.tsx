"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";

const LikeButton = ({
  onClick,
  liked,
}: {
  onClick: () => void;
  liked: boolean;
}) => {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className={cn(
        "flex w-full items-center gap-1 font-semibold hover:bg-secondary",
        liked && "fill-primary text-primary hover:text-primary",
      )}
    >
      {liked ? (
        <>
          <HiThumbUp className="size-5" /> Like
        </>
      ) : (
        <>
          <HiOutlineThumbUp className="size-5" /> Like
        </>
      )}
    </Button>
  );
};

export default LikeButton;
