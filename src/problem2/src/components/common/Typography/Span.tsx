import React from "react";
import { twMerge } from "tailwind-merge";

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const Span: React.FunctionComponent<SpanProps> = ({
  className = "",
  children,
  ...rest
}) => {
  return (
    <span
      className={twMerge("text-base mx-0 my-0 text-colors-text", className)}
      {...rest}
    >
      {children}
    </span>
  );
};
