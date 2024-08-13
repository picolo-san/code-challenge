import React from "react";
import { twMerge } from "tailwind-merge";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const Paragraph: React.FunctionComponent<ParagraphProps> = ({
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
