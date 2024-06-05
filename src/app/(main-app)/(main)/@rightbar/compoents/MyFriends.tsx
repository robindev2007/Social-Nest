import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/types/post";
import React from "react";

const MyFriends = ({ friends }: { friends?: user[] }) => {
  return (
    <div className="card p-1">
      <div className="flex w-full flex-col gap-card">
        {friends && friends.length
          ? friends.map((friend) => (
              <SingleFriend friend={friend} key={friend.id} />
            ))
          : "No friends found"}
      </div>
    </div>
  );
};

export default MyFriends;

const SingleFriend = ({ friend }: { friend: user }) => {
  return (
    <div className="flex w-full items-center gap-1 rounded-md border border-transparent px-2 py-1 transition-all duration-200 hover:border-border hover:bg-secondary hover:shadow-md">
      <Avatar>
        <AvatarImage src={friend.avatar} />
        <AvatarFallback>Aa</AvatarFallback>
      </Avatar>
      <div>
        <p>{friend.fullName}</p>
        <span>{}</span>
      </div>
    </div>
  );
};
