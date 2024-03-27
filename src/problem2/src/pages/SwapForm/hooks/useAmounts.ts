import { useReducer } from "react";

import { Amount } from "types";

export enum amountTypes {
  PAY = "payAmount",
  RECEIVE = "receiveAmount",
}

export enum amountsActions {
  SWAP_AMOUNTS,
  UPDATE_PAY_AMOUNT,
  UPDATE_PAY_AMOUNT_CURRENCY,
  UPDATE_RECEIVE_AMOUNT,
  UPDATE_RECEIVE_AMOUNT_CURRENCY,
  UPDATE_CURRENT_FOCUS_AMOUNT_TYPE,
}

interface AmountState {
  payAmount: Amount;
  receiveAmount: Amount;
  currentFocusAmountType: amountTypes.PAY | amountTypes.RECEIVE;
}

type AMOUNTS_ACTION_TYPE =
  | { type: amountsActions.SWAP_AMOUNTS }
  | { type: amountsActions.UPDATE_PAY_AMOUNT; payload: number }
  | {
      type: amountsActions.UPDATE_PAY_AMOUNT_CURRENCY;
      payload: { currency: string; price: number };
    }
  | { type: amountsActions.UPDATE_RECEIVE_AMOUNT; payload: number }
  | {
      type: amountsActions.UPDATE_RECEIVE_AMOUNT_CURRENCY;
      payload: { currency: string; price: number };
    }
  | {
      type: amountsActions.UPDATE_CURRENT_FOCUS_AMOUNT_TYPE;
      payload: amountTypes;
    };

export const useAmounts = () => {
  const initialAmountsState: AmountState = {
    payAmount: {
      number: 0,
      currency: null,
      price: 0,
    },
    receiveAmount: {
      number: 0,
      currency: null,
      price: 0,
    },
    currentFocusAmountType: amountTypes.PAY,
  };

  const amountReducer = (
    state: AmountState,
    action: AMOUNTS_ACTION_TYPE,
  ): AmountState => {
    switch (action.type) {
      case amountsActions.SWAP_AMOUNTS:
        return {
          ...state,
          payAmount: { ...state.receiveAmount },
          receiveAmount: { ...state.payAmount },
        };
      case amountsActions.UPDATE_PAY_AMOUNT:
        return {
          ...state,
          payAmount: {
            ...state.payAmount,
            number: action.payload,
          },
        };
      case amountsActions.UPDATE_RECEIVE_AMOUNT:
        return {
          ...state,
          receiveAmount: {
            ...state.receiveAmount,
            number: action.payload,
          },
        };
      case amountsActions.UPDATE_PAY_AMOUNT_CURRENCY:
        return {
          ...state,
          payAmount: {
            ...state.payAmount,
            currency: action.payload.currency,
            price: action.payload.price,
          },
        };
      case amountsActions.UPDATE_RECEIVE_AMOUNT_CURRENCY:
        return {
          ...state,
          receiveAmount: {
            ...state.receiveAmount,
            currency: action.payload.currency,
            price: action.payload.price,
          },
        };
      case amountsActions.UPDATE_CURRENT_FOCUS_AMOUNT_TYPE:
        return {
          ...state,
          currentFocusAmountType: action.payload,
        };
      default:
        return { ...state };
    }
  };
  const [amountState, amountDipatch] = useReducer(
    amountReducer,
    initialAmountsState,
  );
  return {
    amountState,
    amountDipatch,
    setPayAmount: (payload: number) =>
      amountDipatch({
        type: amountsActions.UPDATE_PAY_AMOUNT,
        payload,
      }),
    setReceiveAmount: (payload: number) => {
      amountDipatch({
        type: amountsActions.UPDATE_RECEIVE_AMOUNT,
        payload,
      });
    },
    setPayCurrency: (currency: string, price: number) => {
      amountDipatch({
        type: amountsActions.UPDATE_PAY_AMOUNT_CURRENCY,
        payload: { currency: currency, price: price },
      });
    },
    swapAmounts: () => {
      amountDipatch({ type: amountsActions.SWAP_AMOUNTS });
    },
    setReceiveCurrency: (currency: string, price: number) => {
      amountDipatch({
        type: amountsActions.UPDATE_RECEIVE_AMOUNT_CURRENCY,
        payload: { currency: currency, price: price },
      });
    },
    setFocusPayCurrency: () => {
      amountDipatch({
        type: amountsActions.UPDATE_CURRENT_FOCUS_AMOUNT_TYPE,
        payload: amountTypes.PAY,
      });
    },
    setFocusReceiveCurrency: () => {
      amountDipatch({
        type: amountsActions.UPDATE_CURRENT_FOCUS_AMOUNT_TYPE,
        payload: amountTypes.RECEIVE,
      });
    },
  };
};
