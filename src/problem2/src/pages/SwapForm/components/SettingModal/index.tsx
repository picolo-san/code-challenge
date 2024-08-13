import React from "react";
import { twMerge } from "tailwind-merge";

import { Paragraph, Span, Heading, Title } from "components/common";
import { ReactComponent as GearIcon } from "assets/icons/svg/others/gear.svg";
import { ReactComponent as DiamondIcon } from "assets/icons/svg/others/diamond.svg";

interface SettingModalProps extends React.HTMLAttributes<HTMLDetailsElement> {
  className?: string;
}

export const SettingModal: React.FunctionComponent<SettingModalProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <details className={twMerge("dropdown dropdown-end", className)} {...rest}>
      <summary className="text-colors-text marker:content-none hover:opacity-65 cursor-pointer">
        <GearIcon />
      </summary>
      <div className=" dropdown-content z-10 bg-colors-backgroundAlt w-80 border-colors-cardBorder border rounded-2xl p-4 border-solid">
        <div className="flex flex-col gap-7">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Heading
                level={4}
                className="text-colors-primary flex gap-2 items-center"
              >
                <DiamondIcon /> Swap Premium
              </Heading>
              <Paragraph className="text-sm text-muted-foreground">
                When enabled, you'll get access to premium features like lower
                fees
              </Paragraph>
            </div>
            <input
              type="checkbox"
              className="toggle checked:[--tglbg:#1fc7d4] [--tglbg:#372f47] bg-colors-backgroundAlt hover:bg-colors-backgroundAlt hover:opacity-65 border-none checked:bg-colors-backgroundAlt"
            />
          </div>
          <div>
            <div className="grid grid-rows-1 grid-cols-[auto_4rem] gap-x-2  items-center h-14">
              <Title className="inline-flex gap-1 items-center">
                Max.slippage (%)
              </Title>
              <input
                type="number"
                placeholder="0.5"
                className="bg-colors-input rounded-2xl focus:shadow-focus outline-none px-3 py-2 text-xs placeholder:text-colors-textSubtle"
              />
            </div>
            <div className="grid grid-rows-1 grid-cols-[auto_4rem] gap-x-2  items-center h-14">
              <Title className="inline-flex gap-1 items-center">
                Transaction deadline (mins)
              </Title>
              <input
                type="number"
                placeholder="10"
                className="bg-colors-input rounded-2xl focus:shadow-focus outline-none px-3 py-2 text-xs placeholder:text-colors-textSubtle"
              />
            </div>
          </div>
        </div>
      </div>
    </details>
  );
};
