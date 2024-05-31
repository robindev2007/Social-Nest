"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const PostContent = ({ content }: { content: string }) => {
  const [showFull, setShowFull] = useState(false);
  return (
    <div className="relative pb-2 text-base">
      <p className={cn(!showFull && "line-clamp-3", "relative text-pretty")}>
        {content}
      </p>
      {/* {!showFull && ( */}
      <div className="absolute -right-1 bottom-1 z-10 flex h-fit w-fit items-center p-1 px-2 pb-[2px] pl-4 text-sm text-blue-400">
        <div className="h-full w-24 bg-gradient-to-r from-transparent to-card text-transparent">
          a
        </div>
        <button
          onClick={() => setShowFull((prev) => !prev)}
          className="bg-card"
        >
          {showFull ? "(See less)" : "(See more)"}
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default PostContent;
