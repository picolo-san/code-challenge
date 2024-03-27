import { useMemo } from "react";

import { getPriority } from "./utils";
import { FormattedWalletBalance, Price, WalletBalance } from "./types";

export const useFormattedBalances = (balances: WalletBalance[]) => {
  const MINIMUM_PRIORITY = -99;
  const getPriorityBlances = (balances: WalletBalance[]): WalletBalance[] =>
    balances.filter(
      (balance) =>
        getPriority(balance.currency) > MINIMUM_PRIORITY && balance.amount <= 0
    );

  const getSortedPriorityBalances = (
    priorityBalances: WalletBalance[]
  ): WalletBalance[] =>
    priorityBalances.sort((lhs: WalletBalance, rhs: WalletBalance) =>
      getPriority(lhs.currency) > getPriority(rhs.currency) ? -1 : 1
    );

  const getformattedBalances = (
    sortedPriorityBalances: WalletBalance[]
  ): FormattedWalletBalance[] =>
    sortedPriorityBalances.map((balance: WalletBalance) => {
      return { ...balance, formatted: balance.amount.toFixed() };
    });

  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    const priorityBalances = getPriorityBlances(balances);
    const sortedBalances = getSortedPriorityBalances(priorityBalances);
    const formattedBalances = getformattedBalances(sortedBalances);
    return formattedBalances;
  }, [balances]);

  return sortedBalances;
};

export const usePrices = (): Price[] => {
  const mockingPrices: Price[] = [];
  return mockingPrices;
};
export const useWalletBalances = (): WalletBalance[] => {
  const mockingWalletBalances: WalletBalance[] = [];
  return mockingWalletBalances;
};
