import { useEffect, useState } from "react";

import { IAmount, ICurrency } from "types";
import { INPUT_NAME } from "pages/SwapForm";

interface ISwapFormState {
  payment: IAmount;
  receipt: IAmount;
  totalPrice: number;
}

const initialState: ISwapFormState = {
  payment: {
    number: 0,
    currency: null,
    price: 0,
  },
  receipt: {
    number: 0,
    currency: null,
    price: 0,
  },
  totalPrice: 0,
};

export const useSwapForm = () => {
  const [formState, setFormState] = useState<ISwapFormState>(initialState);

  useEffect(() => {
    setFormState((prevState) => {
      const newNumber =
        prevState.receipt.price > 0
          ? prevState.totalPrice / prevState.receipt.price
          : prevState.receipt.number;
      return {
        ...prevState,
        receipt: {
          ...prevState.receipt,
          number: newNumber,
        },
      };
    });
  }, [formState.payment.currency, formState.payment.number]);

  useEffect(() => {
    setFormState((prevState) => {
      const newNumber =
        prevState.payment.price > 0
          ? prevState.totalPrice / prevState.payment.price
          : prevState.payment.number;
      return {
        ...prevState,
        payment: {
          ...prevState.payment,
          number: newNumber,
        },
      };
    });
  }, [formState.receipt.currency, formState.receipt.number]);

  const changeAmount = (
    inputName: INPUT_NAME.PAYMENT | INPUT_NAME.RECEIPT,
    value: number,
  ) => {
    setFormState((prevState) => {
      const newValue = {
        ...prevState[inputName],
        number: value,
      };
      const newTotalPrice = newValue.price
        ? newValue.price * newValue.number
        : prevState.totalPrice;
      return {
        ...prevState,
        [inputName]: newValue,
        totalPrice: newTotalPrice,
      };
    });
  };

  const changeCurrency = (
    inputName: INPUT_NAME.PAYMENT | INPUT_NAME.RECEIPT,
    currency: ICurrency,
  ) => {
    const newPrice = currency.price || 0;
    setFormState((prevState) => {
      if (newPrice > 0 && prevState[inputName].number === 0) {
        const newValue = {
          number: prevState.totalPrice / newPrice,
          currency: currency.code,
          price: newPrice,
        };
        return {
          ...prevState,
          [inputName]: newValue,
        };
      } else if (newPrice > 0 && prevState[inputName].number > 0) {
        const newValue = {
          ...prevState[inputName],
          currency: currency.code,
          price: newPrice,
        };
        return {
          ...prevState,
          [inputName]: newValue,
          totalPrice: newPrice * newValue.number,
        };
      } else {
        return { ...prevState };
      }
    });
  };

  const swapInputs = () => {
    setFormState((prevState) => ({
      ...prevState,
      payment: prevState.receipt,
      receipt: prevState.payment,
    }));
  };

  return {
    formState,
    changeAmount,
    changeCurrency,
    swapInputs,
  };
};
