import React from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const Title: React.FunctionComponent<TitleProps> = ({
  className = "",
  children,
  ...rest
}) => {
  return (
    <p
      className={twMerge("text-base mx-0 my-0 text-colors-text", className)}
      {...rest}
    >
      {children}
    </p>
  );
};
