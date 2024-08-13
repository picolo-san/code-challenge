import React from "react";
import { twMerge } from "tailwind-merge";

interface SubTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const SubTitle: React.FunctionComponent<SubTitleProps> = ({
  className = "",
  children,
  ...rest
}) => {
  return (
    <p
      className={twMerge("text-xs mx-0 my-0 text-colors-textSubtle", className)}
      {...rest}
    >
      {children}
    </p>
  );
};
