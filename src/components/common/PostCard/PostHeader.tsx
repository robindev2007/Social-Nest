import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { PostWithAuthorData } from "@/types/post";

const PostHeader = ({ post }: { post: PostWithAuthorData }) => {
  return (
    <div className="flex gap-1">
      <Link href={`/profile/${post.author.id}`}>
        <Avatar>
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>Aa</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-col gap-0">
        <Link href={`/profile/${post.author.id}`}>
          <p className="font-medium">{post.author.fullName}</p>
        </Link>
        <span className="text-sm font-medium text-muted-foreground">
          {format(post.updatedAt, "dd MMMM yyyy")}
        </span>
      </div>
    </div>
  );
};

export default PostHeader;
