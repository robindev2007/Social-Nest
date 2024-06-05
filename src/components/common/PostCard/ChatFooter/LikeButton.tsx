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
      size={"sm"}
      className={cn(
        "flex items-center gap-1 font-semibold hover:bg-secondary",
        liked && "fill-primary text-primary hover:text-primary",
      )}
    >
      {liked ? (
        <>
          <HiThumbUp className="size-6" /> <p className="pt-1">Like</p>
        </>
      ) : (
        <>
          <HiOutlineThumbUp className="size-6" /> <p className="pt-1">Like</p>
        </>
      )}
    </Button>
  );
};

export default LikeButton;
