import React from "react";
import { twMerge } from "tailwind-merge";

import { Span } from "components/common/Typography";

import { buttonStyles, spanStyles } from "./styles";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isFullWidth?: boolean;
  size?: "big" | "small";
  className?: string;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  isFullWidth = false,
  size = "small",
  className = "",
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        `${size === "big" ? "h-12" : "h-8"} ${isFullWidth ? "w-full" : "w-auto"}`,
        buttonStyles,
        className,
      )}
      {...rest}
    >
      <Span className={`${spanStyles}`}>{children}</Span>
    </button>
  );
};
