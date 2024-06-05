import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button } from "../ui/button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputIithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex items-center gap-1 rounded-full border bg-background focus-within:ring-1 md:px-2">
        <Button
          size={"icon"}
          variant={"ghost"}
          className="hover:bg-transparent"
        >
          <FaMagnifyingGlass />
        </Button>
        <Input
          type={type}
          error={error}
          {...props}
          className={cn(
            className,
            "hidden border-none bg-transparent outline-none focus-visible:border-none focus-visible:ring-0 md:flex",
          )}
        />
      </div>
    );
  },
);
InputIithIcon.displayName = "InputWithPlaceholder";

export { InputIithIcon };
