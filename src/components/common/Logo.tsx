import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={"/img/logo.png"}
        height={171}
        width={424}
        alt=""
        className="h-6 w-auto drop-shadow-md"
      />
    </Link>
  );
};

export default Logo;
