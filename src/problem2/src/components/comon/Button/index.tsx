import React from "react";

import { ButtonWraper } from "./styles";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isFullWidth?: boolean;
  size?: "big" | "small";
}

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  isFullWidth = false,
  size = "small",
  ...rest
}) => {
  return (
    <ButtonWraper $size={size} $isFullWidth={isFullWidth} {...rest}>
      {children}
    </ButtonWraper>
  );
};

export default Button;
