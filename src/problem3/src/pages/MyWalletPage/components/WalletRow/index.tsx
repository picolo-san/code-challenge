import React from "react";

import { FormattedWalletBalance } from "types";

interface WalletRowProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: FormattedWalletBalance["amount"];
  usdValue: number;
  formattedAmount: FormattedWalletBalance["formatted"];
}

export const WalletRow: React.FC<WalletRowProps> = ({
  amount = 0,
  usdValue = 0,
  formattedAmount = "",
  ...rest
}) => <div {...rest}></div>;

//I have take the "WalletRow" out and turn it into a small component, maybe a stateless one.
// the "{...rest}" will make sure WalletRow will receive a custom styling classes from its parents.
