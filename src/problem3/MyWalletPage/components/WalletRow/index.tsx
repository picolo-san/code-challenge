import React, { ComponentProps } from "react";

import { WalletBalance } from "../../types";

interface WalletRowProps extends ComponentProps<"div"> {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({
  number,
  usdValue,
  formattedAmount,
}) => <></>;

export default WalletRow;
