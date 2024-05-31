import React, {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from "react";

type props = ComponentPropsWithoutRef<"h3"> & {
  children: ReactNode;
};

const H3 = ({ children, ...props }: props) => {
  return (
    <h3 className="text-lg font-medium" {...props}>
      {children}
    </h3>
  );
};

export default H3;
