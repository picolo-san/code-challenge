import React from "react";
import { twMerge } from "tailwind-merge";

interface CryptoIconProps extends React.SVGProps<SVGSVGElement> {
  name?: string;
  className?: string;
}

export const CryptoIcon: React.FunctionComponent<CryptoIconProps> = ({
  name = "",
  className = "",
}) => (
  <img className={twMerge("h-6 w-6", className)} src={`/tokens/${name}.svg`} />
);
