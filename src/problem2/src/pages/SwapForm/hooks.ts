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
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  useEffect(() => {
    if (!isSwapping) {
      setFormState((prevState) => {
        const newTotalPrice =
          prevState.receipt.price > 0
            ? prevState.totalPrice / prevState.receipt.price
            : 0;
        return {
          ...prevState,
          receipt: {
            ...prevState.receipt,
            number: newTotalPrice,
          },
        };
      });
      setIsSwapping(false);
    }
  }, [formState.payment.currency, formState.payment.number]);

  useEffect(() => {
    if (!isSwapping) {
      setFormState((prevState) => {
        const newTotalPrice =
          prevState.payment.price > 0
            ? prevState.totalPrice / prevState.payment.price
            : 0;
        return {
          ...prevState,
          payment: {
            ...prevState.payment,
            number: newTotalPrice,
          },
        };
      });
      setIsSwapping(false);
    }
  }, [formState.receipt.currency, formState.receipt.number]);

  const changeInputValue = (
    inputName: INPUT_NAME.PAYMENT | INPUT_NAME.RECEIPT,
    value: number,
  ) => {
    setFormState((prevState) => {
      const newValue = {
        ...prevState[inputName],
        number: value,
      };
      const newTotalPrice = newValue.price * newValue.number;
      return { ...prevState, [inputName]: newValue, totalPrice: newTotalPrice };
    });
  };

  const changeCurrcenyInsideInput = (
    inputName: INPUT_NAME.PAYMENT | INPUT_NAME.RECEIPT,
    currency: ICurrency,
  ) => {
    setFormState((prevState) => {
      const newValue = {
        ...prevState[inputName],
        currency: currency.code,
        price: currency.price || 0,
      };
      const newTotalPrice = newValue.price * newValue.number;
      return { ...prevState, [inputName]: newValue, totalPrice: newTotalPrice };
    });
  };

  const swapInputs = () => {
    setIsSwapping(true);
    setFormState((prevState) => ({
      ...prevState,
      payment: prevState.receipt,
      receipt: prevState.payment,
    }));
  };

  return {
    formState,
    changeInputValue,
    changeCurrcenyInsideInput,
    swapInputs,
  };
};
