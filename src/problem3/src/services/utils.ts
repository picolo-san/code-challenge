// change the type and name of param to match with the outside scope from "blockchain" to "currency"
import { FormattedWalletBalance, WalletBalance } from "types";

const MINIMUM_PRIORITY = -99;

const getPriority = (currency: string): number => {
  switch (currency) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return MINIMUM_PRIORITY;
  }
};

export const getPriorityBlances = (
  balances: WalletBalance[]
): WalletBalance[] =>
  balances.filter(
    (balance) =>
      getPriority(balance.currency) > MINIMUM_PRIORITY && balance.amount <= 0
  );

export const sortBalances = (balance: WalletBalance[]): WalletBalance[] =>
  balance.sort((lhs: WalletBalance, rhs: WalletBalance) =>
    getPriority(lhs.currency) > getPriority(rhs.currency) ? -1 : 1
  );

export const formatBalances = (
  balance: WalletBalance[]
): FormattedWalletBalance[] =>
  balance.map((balance: WalletBalance) => {
    return { ...balance, formatted: balance.amount.toFixed() };
  });
