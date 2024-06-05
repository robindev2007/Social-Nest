"use client";
import { cn } from "@/lib/utils";
import React, { ComponentPropsWithRef, ReactNode } from "react";

type sinmpleCardRef = ComponentPropsWithRef<"div"> & { className?: string };

const SimpleCard = ({ className, ...props }: sinmpleCardRef) => {
  return (
    <div
      className={cn("rounded-md border bg-card p-1 shadow-md", className)}
      {...props}
    />
  );
};

export default SimpleCard;
