import { mockingCurrencies } from "./mockingData";
import { Currency } from "types";

export const getCurrencies = (): Promise<Currency[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockingCurrencies);
    }, 0);
  });
};
