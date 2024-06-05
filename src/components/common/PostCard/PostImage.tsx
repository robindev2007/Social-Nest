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
            className="max-h-[40rem] w-full border-y-2 object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Image
          src={imgSrc}
          height={900}
          width={500}
          alt={"post.title"}
          className="h-full w-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default PostImage;
