// change the type and name of param to match with the outside scope from "blockchain" to "currency"
import { FormattedWalletBalance, WalletBalance } from "types";

const MINIMUM_PRIORITY = -99;

const getPriority = (blockchain: WalletBalance["blockchain"]): number => {
  switch (blockchain) {
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
      getPriority(balance.blockchain) > MINIMUM_PRIORITY && balance.amount <= 0
  );

export const sortBalances = (balance: WalletBalance[]): WalletBalance[] =>
  balance.sort(
    (lhs: WalletBalance, rhs: WalletBalance) =>
      getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
  );

export const formatBalances = (
  balance: WalletBalance[]
): FormattedWalletBalance[] =>
  balance.map((balance: WalletBalance) => {
    return { ...balance, formatted: balance.amount.toFixed() };
  });
