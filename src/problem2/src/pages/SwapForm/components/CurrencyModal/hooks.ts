import { useEffect, useState } from "react";
import { getCurrencies } from "services/api/currency";
import { ICurrency } from "types";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (e) {
        console.error(e);
        setCurrencies([]);
      }
    };
    fetchData();
  }, []);

  return currencies;
};
