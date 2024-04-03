import React from "react";

import { useWalletBalances, usePrices, useFormattedBalances } from "./hooks";
import { WalletBalance, FormattedWalletBalance, Price } from "types";

import { WalletRow } from "./components/WalletRow";

import { classes } from "./styles";

// remove the unused props and the Props interface and change the "Props" into "WalletPageProps"
// remove the BoxProps sinces it is undefined.

interface WalletPageProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WalletPage: React.FunctionComponent<WalletPageProps> = ({
  ...rest
}) => {
  const balances: WalletBalance[] = useWalletBalances(); //since i consider this as a blind custom hook just expect its outcome to be a "WalletBalance[]"
  const formattedBalances: FormattedWalletBalance[] =
    useFormattedBalances(balances); // bring all logic for formatting "WalletBalance" into a custom hook
  const { prices, isLoadingPrices, errorMessage } = usePrices(); // pull state "prices" and useEffect to getPrices into a custom hook.

  const getPrice = (currency: FormattedWalletBalance["currency"]): number =>
    prices?.find((price: Price) => price.currency === currency)?.price || 0;
  return (
    <div {...rest}>
      {isLoadingPrices && <>Loading...</>}
      {error ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          {formattedBalances.map((formattedBalance: FormattedWalletBalance) => (
            <WalletRow
              className={classes.row}
              key={formattedBalance.currency} // change the "index" into formattedBalance.currency as key.
              amount={formattedBalance.amount}
              usdValue={
                getPrice(formattedBalance.currency) * formattedBalance.amount
              }
              formattedAmount={formattedBalance.formatted}
            />
          ))}
        </>
      )}
    </div>
  );
};
