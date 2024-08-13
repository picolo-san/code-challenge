import React, { useState, useCallback, FormEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { debounce } from "lodash";
import { twMerge } from "tailwind-merge";

import { mostPopularCurrencies } from "./constants";
import { useCurrencies } from "./hooks";
import { ICurrency, MODAL_STATUS } from "types";
import { INPUT_NAME } from "pages/SwapForm";

import { CryptoIcon, Heading, Span, Title } from "components/common";
import { ReactComponent as CrossIcon } from "assets/icons/svg/others/cross.svg";
import { ReactComponent as SearchIcon } from "assets/icons/svg/others/search.svg";
import { ReactComponent as TickIcon } from "assets/icons/svg/others/tick.svg";

import {
  modalStyles,
  overlayStyles,
  closedOverlayStyles,
  openedOverlayStyles,
  headerStyles,
  inputWraperStyles,
  inputStyles,
  popularTokenStyles,
  popularTokensStyles,
  popularTokensTitleStyles,
  foundTokenStyles,
  foundTokensStyles,
  foundTokenNameStyles,
  foundTokenIconStyles,
  foundTokenSubtitleStyles,
  foundTokensTickIconStyles,
} from "./styles";
import { SubTitle } from "components/common";

interface CurrencyModalProps {
  isOpen: MODAL_STATUS;
  isSelectedFor: INPUT_NAME;
  currentCurrency?: string | null;
  close: () => void;
  onSelectCurrency: (inputName: INPUT_NAME, currency: ICurrency) => void;
}

export const CurrencyModal: React.FunctionComponent<CurrencyModalProps> = ({
  isOpen,
  isSelectedFor,
  currentCurrency = "",
  close,
  onSelectCurrency,
}) => {
  const [search, setSearch] = useState<string>("");
  const currencies = useCurrencies();
  const searchRef = useRef<HTMLInputElement>(null);

  const debounceSetSearch = useCallback(
    debounce((value) => setSearch(value), 1000),
    [],
  );

  const resetSearchValue = () => {
    setSearch("");
    if (searchRef.current) searchRef.current.value = "";
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    let { target } = event;
    let { currentTarget } = event;
    if (target === currentTarget) {
      close();
      resetSearchValue();
    }
  };
  const handleSearch = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    debounceSetSearch(value);
  };
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    resetSearchValue();
    close();
  };
  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { currentTarget } = event;
    const currencyName = currentTarget.getAttribute("data-currency");
    const price = currentTarget.getAttribute("data-price");
    const date = currentTarget.getAttribute("data-date");
    if (currencyName && price && date)
      onSelectCurrency(isSelectedFor, {
        code: currencyName,
        price: Number(price),
        date: date,
      });
    resetSearchValue();
    close();
  };

  return (
    <>
      {createPortal(
        <div
          className={twMerge(
            overlayStyles,
            isOpen === MODAL_STATUS.OPENED && openedOverlayStyles,
            isOpen === MODAL_STATUS.CLOSED && closedOverlayStyles,
            isOpen === MODAL_STATUS.FIRST_TIME_LOADED && "",
          )}
          onClick={handleClickOutside}
        >
          <div role="dialog" className={modalStyles}>
            <div className={`${headerStyles}`}>
              <Heading className="text-colors-text" level={2}>
                Select a token
              </Heading>
              <button className="hover:opacity-65" onClick={handleClose}>
                <CrossIcon className="text-colors-primary h-6 w-6" />
              </button>
            </div>
            <div className={inputWraperStyles}>
              <SearchIcon className="h-6 w-6" />
              <input
                ref={searchRef}
                className={inputStyles}
                type="text"
                placeholder="Search name or paste address"
                onChange={handleSearch}
              />
            </div>
            <div className={`${popularTokensStyles}`}>
              <Heading className={popularTokensTitleStyles} level={5}>
                Popular tokens
              </Heading>
              {mostPopularCurrencies.map((currency) => (
                <button
                  className={popularTokenStyles}
                  data-currency={currency.code}
                  data-price={currency.price}
                  data-date={currency.date}
                  key={currency.code}
                  disabled={currency.code === currentCurrency}
                  onClick={handleClickButton}
                >
                  <CryptoIcon name={currency.code} />
                  <Span>{currency.code}</Span>
                </button>
              ))}
            </div>
            <div className={`${foundTokensStyles}`}>
              {currencies.length === 0 && (
                <SubTitle>Fetching currencies information...</SubTitle>
              )}
              {currencies.map((currency) => {
                return currency.code.includes(search) || search === "" ? (
                  <button
                    className={foundTokenStyles}
                    data-currency={currency.code}
                    data-price={currency.price}
                    data-date={currency.date}
                    key={currency.code}
                    disabled={currency.code === currentCurrency}
                    onClick={handleClickButton}
                  >
                    <CryptoIcon
                      className={foundTokenIconStyles}
                      name={currency.code}
                    />
                    <Title className={foundTokenNameStyles}>
                      {currency.code}
                    </Title>
                    <SubTitle className={foundTokenSubtitleStyles}>
                      {currency.code}
                    </SubTitle>
                    {currency.code === currentCurrency && (
                      <TickIcon className={foundTokensTickIconStyles} />
                    )}
                  </button>
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
