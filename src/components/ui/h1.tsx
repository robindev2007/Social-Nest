import React, {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from "react";

type props = ComponentPropsWithoutRef<"h1"> & {
  children: ReactNode;
};

const H1 = ({ children, ...props }: props) => {
  return (
    <h1 className="text-2xl font-bold" {...props}>
      {children}
    </h1>
  );
};

export default H1;
