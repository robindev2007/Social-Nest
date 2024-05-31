"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PostImage = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Image
            src={imgSrc}
            height={900}
            width={500}
            alt={"post.title"}
            className="w-full max-h-96 object-cover border-y"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Image
          src={imgSrc}
          height={900}
          width={500}
          alt={"post.title"}
          className="w-full h-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default PostImage;
