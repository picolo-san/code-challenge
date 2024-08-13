import { mockingCurrencies } from "./mockingData";
import { ICurrency } from "types";

export const getCurrencies = (): Promise<ICurrency[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockingCurrencies);
    }, 0);
  });
};
