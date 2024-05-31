"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import H2 from "@/components/ui/h2";
import { userWithOutPass } from "@/types/post";
import Image from "next/image";
import React from "react";

const Profile = ({ user }: { user: userWithOutPass }) => {
  return (
    <div className="card flex w-full flex-col items-center p-2">
      <div className="">
        <Image
          src={
            "https://miro.medium.com/v2/resize:fit:720/format:webp/1*twYd3oKq2030tFIP3BMiuQ@2x.jpeg"
          }
          height={700}
          width={900}
          alt=""
          className="h-32 overflow-hidden rounded-md object-cover"
        />
        <div className="flex flex-col items-center justify-center px-10">
          <Avatar className="size-16 -translate-y-1/2 border-2 border-primary">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Aa</AvatarFallback>
          </Avatar>
          <div className="-mt-8 text-center">
            <H2>{user.fullName}</H2>
            <span className="truncate text-muted-foreground">
              Im usering this application
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
