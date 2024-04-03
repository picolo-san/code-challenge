import React from "react";
import { twMerge } from "tailwind-merge";

import { Paragraph, Span } from "components/common";

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Collapse: React.FunctionComponent<CollapseProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={twMerge(
        "collapse collapse-arrow bg-colors-invertedContrast",
        className,
      )}
    >
      <input type="checkbox" />
      <div className="collapse-title bg-colors-input rounded-2xl">
        <Paragraph className="text-colors-textSubtle flex items-center gap-1">
          {children}
        </Paragraph>
      </div>
      <div className="collapse-content rounded-2xl ">
        <div className="flex flex-col pt-4 gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Span className="text-colors-textSubtle">Price impact</Span>
              <Span className="text-colors-textSubtle">Max. slippage</Span>
              <Span className="text-colors-textSubtle">Fee (0.15%)</Span>
              <Span className="text-colors-textSubtle">Network cost</Span>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <Span className="text-colors-warning">0%</Span>
              <Span>0%</Span>
              <Span>$0</Span>
              <Span>$0</Span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Span className="text-colors-disabled">Order routing</Span>
            </div>
            <div className="flex flex-col text-right">
              <Span>MyLittleSwapApi</Span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
