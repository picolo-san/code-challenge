import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { formatCash } from "services/utils";
import CryptoIcon from "components/comon/CryptoIcon";
import { ReactComponent as ArrowDownIcon } from "assets/icons/svg/arrows/arrow-down.svg";
import {
  InputWraper,
  Label,
  Input,
  Cash,
  SelectCurrencyButton,
} from "./styles";
import { IAmount } from "types";
import { INPUT_NAME } from "pages/SwapForm";

interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  amount: IAmount;
  name: INPUT_NAME;
  onChangeNumber: (inputName: INPUT_NAME, value: number) => void;
  onClickCurrency: () => void;
  onFocusInput: (inputName: INPUT_NAME) => void;
}

const MAX_CURRENCY_INPUT_LENGTH = 20;
const FLOAT_STRING_REGEX = /^[+-]?([0-9]*[.{0,1}])?[0-9]*$/;

const CurrencyInput: React.FunctionComponent<CurrencyInputProps> = ({
  label = "",
  amount,
  name,
  onChangeNumber,
  onClickCurrency,
  onFocusInput,
  ...rest
}) => {
  const [input, setInput] = useState<string>("");
  const inputName = name;

  useEffect(() => {
    setInput(String(amount.number));
  }, [amount.number]);

  const debounceOnchageNumber = useCallback(
    debounce(
      (inputName, formatedNumber) => onChangeNumber(inputName, formatedNumber),
      1000,
    ),
    [],
  );

  const handleClickSelectCurrency = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    onClickCurrency();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const formatedNumber = Number(value);
    setInput(value);
    if (
      formatedNumber >= 0 &&
      // value.length < MAX_CURRENCY_INPUT_LENGTH &&
      FLOAT_STRING_REGEX.test(value)
    ) {
      debounceOnchageNumber(inputName, formatedNumber);
    }
  };

  const handleFocus = () => {
    onFocusInput(inputName);
  };

  return (
    <InputWraper onClick={handleFocus}>
      <Label htmlFor={label}>{label}</Label>
      <Input
        type="number"
        autoComplete="off"
        inputMode="decimal"
        id={label}
        name={name}
        maxLength={MAX_CURRENCY_INPUT_LENGTH}
        value={input}
        pattern={`${FLOAT_STRING_REGEX}`}
        onChange={handleChange}
        onFocus={handleFocus}
        {...rest}
      />
      <SelectCurrencyButton
        onClick={handleClickSelectCurrency}
        $isCrytoChosen={!!amount.currency}
      >
        {amount.currency ? (
          <>
            <CryptoIcon name={amount.currency} />
            {amount.currency}
            <ArrowDownIcon />
          </>
        ) : (
          <>
            Select token
            <ArrowDownIcon />
          </>
        )}
      </SelectCurrencyButton>
      {amount.currency && amount.number > 0 && amount.price && (
        <Cash>${formatCash(amount.number * amount.price)} USD</Cash>
      )}
    </InputWraper>
  );
};

export default CurrencyInput;
