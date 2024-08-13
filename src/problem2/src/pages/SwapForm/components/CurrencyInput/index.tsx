import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { twMerge } from "tailwind-merge";

import { IAmount } from "types";
import { INPUT_NAME } from "pages/SwapForm";
import { formatCash } from "services/utils";

import { CryptoIcon, Title, SubTitle, Heading } from "components/common";

import {
  wraperStyles,
  labelStyles,
  inputStyles,
  selectButtonStyles,
  aCryptoChosenStyles,
  noCryptoChosenStyles,
  subTitleStyles,
} from "./styles";

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

export const CurrencyInput: React.FunctionComponent<CurrencyInputProps> = ({
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
    if (amount.number > 0)
      setInput(String(amount.number).substring(0, MAX_CURRENCY_INPUT_LENGTH));
    else setInput("");
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
    if (value.length < MAX_CURRENCY_INPUT_LENGTH) setInput(value);
    if (
      formatedNumber >= 0 &&
      value.length < MAX_CURRENCY_INPUT_LENGTH &&
      FLOAT_STRING_REGEX.test(value)
    ) {
      debounceOnchageNumber(inputName, formatedNumber);
    }
  };

  const handleFocus = () => {
    onFocusInput(inputName);
  };

  return (
    <div className={wraperStyles} onClick={handleFocus}>
      <label className={labelStyles} htmlFor={label}>
        <Title>{label}</Title>
      </label>
      <input
        className={inputStyles}
        type="number"
        autoCorrect="off"
        autoComplete="off"
        inputMode="decimal"
        placeholder="0"
        id={label}
        name={name}
        minLength={1}
        maxLength={MAX_CURRENCY_INPUT_LENGTH}
        value={input}
        pattern={`${FLOAT_STRING_REGEX}`}
        onChange={handleChange}
        onFocus={handleFocus}
        {...rest}
      />
      <button
        className={twMerge(
          selectButtonStyles,
          !!amount.currency ? aCryptoChosenStyles : noCryptoChosenStyles,
        )}
        onClick={handleClickSelectCurrency}
      >
        {amount.currency ? (
          <>
            <CryptoIcon name={amount.currency} />
            <Heading className="text-colors-text" level={4}>
              {amount.currency}
            </Heading>
          </>
        ) : (
          <>
            <Heading className="text-colors-invertedContrast" level={4}>
              Select token
            </Heading>
          </>
        )}
      </button>
      {amount.currency && amount.number > 0 && amount.price && (
        <SubTitle className={subTitleStyles}>
          {formatCash(amount.number * amount.price)} USD
        </SubTitle>
      )}
    </div>
  );
};
