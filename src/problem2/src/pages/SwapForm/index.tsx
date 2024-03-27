import React, { useState } from "react";

import Button from "components/comon/Button";
import CurrencyInput from "./components/CurrencyInput";
import CurrencyModal from "./components/CurrencyModal";
import { ReactComponent as SwapDownIcon } from "assets/icons/svg/arrows/swap-down.svg";
import { amountTypes, useAmounts, useComputedAmounts } from "./hooks";
import { Container, Form, Title, ButtonSwap } from "./styles";

const SwapForm = () => {
  const {
    amountState,
    setPayAmount,
    setReceiveAmount,
    setPayCurrency,
    swapAmounts,
    setReceiveCurrency,
    setFocusPayCurrency,
    setFocusReceiveCurrency,
  } = useAmounts();

  const { caculateAmountCounterPartByItself, caculateAmountByItsCounterPart } =
    useComputedAmounts();
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] =
    useState<boolean>(false);

  const toggleCurrencyModel = () =>
    setIsCurrencyModalOpen(!isCurrencyModalOpen);

  const handleChangePayAmount = (number: number) => {
    setReceiveAmount(
      caculateAmountCounterPartByItself(amountState.receiveAmount, {
        ...amountState.payAmount,
        number: number,
      }),
    );
    setPayAmount(number);
  };

  const handleChangeReceiveAmount = (number: number) => {
    setPayAmount(
      caculateAmountCounterPartByItself(amountState.payAmount, {
        ...amountState.receiveAmount,
        number: number,
      }),
    );
    setReceiveAmount(number);
  };

  const handleSelectCurrency = (currency: string, price: number) => {
    if (amountState.currentFocusAmountType === amountTypes.PAY) {
      setPayAmount(
        caculateAmountByItsCounterPart(
          {
            ...amountState.payAmount,
            currency: currency,
            price: price,
          },
          amountState.receiveAmount,
        ),
      );
      setPayCurrency(currency, price);
    }
    if (amountState.currentFocusAmountType === amountTypes.RECEIVE) {
      setReceiveAmount(
        caculateAmountByItsCounterPart(
          {
            ...amountState.receiveAmount,
            currency: currency,
            price: price,
          },
          amountState.payAmount,
        ),
      );
      setReceiveCurrency(currency, price);
    }
  };

  const handleClickSwap = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    swapAmounts();
  };

  return (
    <Container>
      <Title>Swap</Title>
      <Form>
        <CurrencyInput
          label="You pay"
          amount={amountState.payAmount}
          onChangeNumber={handleChangePayAmount}
          onClickCurrency={toggleCurrencyModel}
          onFocus={setFocusPayCurrency}
        />
        <CurrencyInput
          label="You receive"
          amount={amountState.receiveAmount}
          onChangeNumber={handleChangeReceiveAmount}
          onClickCurrency={toggleCurrencyModel}
          onFocus={setFocusReceiveCurrency}
        />
        <Button isFullWidth size="big">
          Connect Wallet
        </Button>
        <ButtonSwap onClick={handleClickSwap}>
          <SwapDownIcon />
        </ButtonSwap>
      </Form>
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        currentCurrency={
          amountState[amountState.currentFocusAmountType].currency
        }
        onSelectCurrency={handleSelectCurrency}
        closeModal={toggleCurrencyModel}
      />
    </Container>
  );
};

export default SwapForm;
