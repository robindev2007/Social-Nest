"use client";
import React from "react";
import HeaderSearch from "./HeaderSearch";

import Logo from "@/components/common/Logo";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <div className="sticky left-0 top-0 z-20 flex items-center justify-between border-b border-border/30 bg-card p-2 py-1 shadow-lg">
      <div className="flex items-center gap-4">
        <Logo />
        <HeaderSearch />
      </div>
      <HeaderRight />
    </div>
  );
};

export default Header;
