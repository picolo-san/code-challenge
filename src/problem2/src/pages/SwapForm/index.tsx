import React, { useState } from "react";

import Button from "components/comon/Button";
import CurrencyInput from "./components/CurrencyInput";
import CurrencyModal from "./components/CurrencyModal";
import { ReactComponent as SwapDownIcon } from "assets/icons/svg/arrows/swap-down.svg";
import { useSwapForm } from "./hooks";
import { Container, Form, Title, ButtonSwap } from "./styles";
import { ICurrency } from "types";

export enum INPUT_NAME {
  PAYMENT = "payment",
  RECEIPT = "receipt",
}

const SwapForm = () => {
  const [currentFocusInput, setCurrentFocusInput] = useState<INPUT_NAME>(
    INPUT_NAME.PAYMENT,
  );
  const { formState, changeInputValue, changeCurrcenyInsideInput, swapInputs } =
    useSwapForm();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => setModalOpen((prevState) => !prevState);

  const handleChange = (inputName: INPUT_NAME, value: number) => {
    changeInputValue(inputName, value);
  };

  const handleSelectCurrency = (inputName: INPUT_NAME, value: ICurrency) => {
    changeCurrcenyInsideInput(inputName, value);
  };

  const handleClickSwap = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    swapInputs();
  };

  const handleFocus = (inputName: INPUT_NAME) => {
    setCurrentFocusInput(inputName);
  };

  return (
    <Container>
      <Title>Swap</Title>
      <Form>
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
        <Button isFullWidth size="big">
          Connect Wallet
        </Button>
        <ButtonSwap onClick={handleClickSwap}>
          <SwapDownIcon />
        </ButtonSwap>
      </Form>
      <CurrencyModal
        isOpen={isModalOpen}
        isSelectedFor={currentFocusInput}
        currentCurrency={formState[currentFocusInput].currency}
        onSelectCurrency={handleSelectCurrency}
        close={toggleModal}
      />
    </Container>
  );
};

export default SwapForm;
