import React, { useState } from "react";

import { ICurrency, MODAL_STATUS } from "types";
import { useSwapForm } from "./hooks";
import { formatCash } from "services/utils";

import { CurrencyInput, CurrencyModal, SettingModal } from "./components";
import { Heading, Button, Collapse, Span } from "components/common";
import { ReactComponent as SwapDownIcon } from "assets/icons/svg/arrows/swap-down.svg";
import { ReactComponent as EqualIcon } from "assets/icons/svg/others/equal.svg";

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

interface SwapFormProps {
  openWalletModal: () => void;
}

export const SwapForm: React.FunctionComponent<SwapFormProps> = ({
  openWalletModal,
}) => {
  const [currentFocusInput, setCurrentFocusInput] = useState<INPUT_NAME>(
    INPUT_NAME.PAYMENT,
  );
  const { formState, changeAmount, changeCurrency, swapInputs } = useSwapForm();
  const [isModalOpen, setModalOpen] = useState<MODAL_STATUS>(
    MODAL_STATUS.FIRST_TIME_LOADED,
  );
  const isShowSwapDetail =
    formState.payment.currency &&
    formState.receipt.currency &&
    formState.payment.currency !== formState.receipt.currency;

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
      <div className={headingStyles}>
        <Heading level={2}>Swap</Heading>
        <SettingModal />
      </div>
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
      {isShowSwapDetail && (
        <Collapse>
          <Span>
            1&nbsp;&nbsp;
            {formState.payment.currency}
          </Span>
          <EqualIcon />
          <Span className="text-colors-warning">
            {formatCash(formState.payment.price / formState.receipt.price)}
            &nbsp;&nbsp;
            {formState.receipt.currency}
          </Span>
        </Collapse>
      )}
      <Button onClick={openWalletModal} isFullWidth size="big">
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
