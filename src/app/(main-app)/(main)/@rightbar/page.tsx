import React from "react";
import TopTrending from "./compoents/TopTrending";
import MyFriends from "./compoents/MyFriends";
import { db } from "@/lib/prisma";

const getFriends  = async ()=>{
try {
  const friends = await db.user.findMany({ take: 10 });
  return friends
} catch (error) {
  console.log(error)
  return []
}
}

const RightbarPage = async () => {
  const firends = await getFriends()
  return (
    <div className="flex w-full max-w-md flex-col gap-card">
      {/* <TopTrending /> */}
      <MyFriends friends={firends} />
    </div>
  );
};

export default RightbarPage;
