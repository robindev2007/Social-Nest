import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import CreatePostPopup from "./CreatePostPopup";
import { Session } from "next-auth";
import SimpleCard from "@/components/ui/SimpleCard";

const CreatePost = ({ session }: { session: Session | null }) => {
  return (
    <SimpleCard className="w-full">
      <div className="flex w-full gap-1">
        <Link href={`/profile/${session?.user.id}`}>
          <Avatar className="">
            <AvatarImage src={session?.user.id} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Input
          placeholder="What is on your mind..."
          className="w-full bg-black"
        />
      </div>
      <Separator className="my-2" />

      <CreatePostPopup />
    </SimpleCard>
  );
};

export default CreatePost;
