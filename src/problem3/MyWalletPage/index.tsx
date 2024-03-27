import React from "react";

import { useWalletBalances, usePrices, useFormattedBalances } from "./hooks";
import { WalletBalance, FormattedWalletBalance, Price } from "./types";
import WalletRow from "./components/WalletRow";
import { classes } from "./styles";

// remove the unused props and the Props interface

const WalletPage = () => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Price[] = usePrices();
  const formattedBalances = useFormattedBalances(balances);
  return (
    <div>
      {formattedBalances.map((balance: FormattedWalletBalance) => (
        <WalletRow
          // no import statement for class name for styling
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

export default WalletPage;
