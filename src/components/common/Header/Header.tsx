"use client";
import React from "react";
import HeaderSearch from "./HeaderSearch";
import Link from "next/link";

const Header = () => {
  return (
    <div className="sticky left-0 top-0 z-20 flex items-center justify-between border-b border-border/30 bg-card p-2 shadow-lg">
      <div className="flex items-center gap-2">
        <Link href={"/"}>logo</Link>
        <HeaderSearch />
      </div>
    </div>
  );
};

export default Header;
