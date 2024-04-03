import { useMemo, useEffect, useState } from "react";

import Datasource from "services/api";
import {
  getPriorityBlances,
  sortBalances,
  formatBalances,
} from "services/utils";

import { FormattedWalletBalance, Price, WalletBalance } from "types";

export const useFormattedBalances = (balances: WalletBalance[]) => {
  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    const priorityBalances = getPriorityBlances(balances);
    const sortedBalances = sortBalances(priorityBalances);
    return formatBalances(sortedBalances);
  }, [balances]);
  return formattedBalances;
};

//moving datasource implementation to services/api
export const usePrices = () => {
  const [prices, setPrices] = useState<Price[]>([]); //set default price to array and have Price[] type
  const [isLoadingPrices, setIsLoadingPrices] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoadingPrices(true);
    Datasource.getPrices()
      .then((prices: Price[]) => {
        setPrices(prices);
        setIsLoadingPrices(false);
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setIsLoadingPrices(false);
      });
  }, []);
  return { prices, isLoadingPrices, errorMessage };
};

//just a mocking custom hook will return a list of walletbalances.
export const useWalletBalances = (): WalletBalance[] => {
  const mockingWalletBalances: WalletBalance[] = [];
  return mockingWalletBalances;
};
