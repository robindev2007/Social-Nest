import Image from "next/image";
import React from "react";

const ProfileHead = () => {
  return (
    <div className="flex w-full h-full flex-col">
      <Image
        src={
          "https://as2.ftcdn.net/v2/jpg/05/18/41/91/1000_F_518419158_yXXBww2r5Z3XoutBxRX8KHNZOpPjhC03.jpg"
        }
        height={500}
        width={500}
        alt=""
        className="h-[30vh] w-full object-cover"
      />

      <div className="p-3">
        <p>Robin Mia</p>
      </div>
    </div>
  );
};

export default ProfileHead;
