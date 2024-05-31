import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcAddImage, FcVideoFile } from "react-icons/fc";
import { getServerSession } from "next-auth";
import CreatePostPopup from "./CreatePostPopup";

const CreatePost = () => {
  return (
    <div className="rounded-md border-card bg-card p-2">
      <div className=" flex gap-1">
        <Link href={`/profile/${"session?.user?.id"}`}>
          <Avatar className="">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Input placeholder="What is on your mind..." className="bg-black" />
      </div>
      <Separator className="my-2" />

      <CreatePostPopup />
    </div>
  );
};

export default CreatePost;
