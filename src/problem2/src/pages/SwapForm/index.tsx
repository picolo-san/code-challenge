import React, { useState } from "react";

import { ICurrency } from "types";
import { useSwapForm } from "./hooks";

import { CurrencyInput } from "./components";
import { Heading, Button } from "components/common";
import { ReactComponent as SwapDownIcon } from "assets/icons/svg/arrows/swap-down.svg";
import CurrencyModal from "./components/CurrencyModal";

import {
  containerStyles,
  headingStyles,
  swapButtonStyles,
  formStyles,
} from "./styles";

export enum INPUT_NAME {
  PAYMENT = "payment",
  RECEIPT = "receipt",
}

export enum MODAL_STATUS {
  OPENED,
  CLOSED,
  FIRST_TIME_LOADED,
}

const SwapForm = () => {
  const [currentFocusInput, setCurrentFocusInput] = useState<INPUT_NAME>(
    INPUT_NAME.PAYMENT,
  );
  const { formState, changeAmount, changeCurrency, swapInputs } = useSwapForm();
  const [isModalOpen, setModalOpen] = useState<MODAL_STATUS>(
    MODAL_STATUS.FIRST_TIME_LOADED,
  );

  const toggleModal = () =>
    setModalOpen((prevState) =>
      prevState === MODAL_STATUS.CLOSED ||
      prevState === MODAL_STATUS.FIRST_TIME_LOADED
        ? MODAL_STATUS.OPENED
        : MODAL_STATUS.CLOSED,
    );

  const handleChange = (inputName: INPUT_NAME, value: number) => {
    changeAmount(inputName, value);
  };

  const handleSelectCurrency = (inputName: INPUT_NAME, value: ICurrency) => {
    changeCurrency(inputName, value);
  };

  const handleClickSwap = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    swapInputs();
  };

  const handleFocus = (inputName: INPUT_NAME) => {
    setCurrentFocusInput(inputName);
  };

  return (
    <div className={containerStyles}>
      <Heading level={2} className={headingStyles}>
        Swap
      </Heading>
      <form className={formStyles}>
        <CurrencyInput
          label="You pay"
          name={INPUT_NAME.PAYMENT}
          amount={formState.payment}
          onFocusInput={handleFocus}
          onChangeNumber={handleChange}
          onClickCurrency={toggleModal}
        />
        <CurrencyInput
          label="You receive"
          name={INPUT_NAME.RECEIPT}
          amount={formState.receipt}
          onFocusInput={handleFocus}
          onChangeNumber={handleChange}
          onClickCurrency={toggleModal}
        />

        <Button className={swapButtonStyles} onClick={handleClickSwap}>
          <SwapDownIcon className="h-4 w-4" />
        </Button>
      </form>
      <Button isFullWidth size="big">
        Connect Wallet
      </Button>
      <CurrencyModal
        isOpen={isModalOpen}
        isSelectedFor={currentFocusInput}
        currentCurrency={formState[currentFocusInput].currency}
        onSelectCurrency={handleSelectCurrency}
        close={toggleModal}
      />
    </div>
  );
};

export default SwapForm;
