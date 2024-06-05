import SimpleCard from "@/components/ui/SimpleCard";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaBell } from "react-icons/fa6";
import Notifications from "./Notifications";

const HeaderRight = () => {
  const buttons = [
    {
      title: "Notifications",
      icon: <FaBell className="size-7 p-1" />,
      disabled: false,
    },
  ];
  return (
    <div className="relative">
      {buttons.map((button) => (
        <div key={button.title}>
          <Button
            disabled={button.disabled}
            key={button.title}
            variant={"secondary"}
            size={"icon"}
          >
            {button.icon}
          </Button>
        </div>
      ))}
      <div className="absolute right-0 top-full z-30 p-2">
        <Notifications />
      </div>
    </div>
  );
};

export default HeaderRight;
