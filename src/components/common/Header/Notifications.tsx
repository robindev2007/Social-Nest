import SimpleCard from "@/components/ui/SimpleCard";
import React from "react";

type not = {
  title: string;
  creadetAt: string;
  notificationype: string;
};

const Notifications = () => {
  const Notificationsss = [
    {
      title: "Sk send you a friend request",
    },
  ];
  return <SimpleCard>Notifications</SimpleCard>;
};

export default Notifications;
