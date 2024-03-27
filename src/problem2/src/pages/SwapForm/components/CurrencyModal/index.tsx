import React, { useState, useCallback, FormEvent } from "react";
import { createPortal } from "react-dom";
import { debounce } from "lodash";

import CryptoIcon from "components/comon/CryptoIcon";
import { ReactComponent as CrossIcon } from "assets/icons/svg/others/cross.svg";
import { ReactComponent as SearchIcon } from "assets/icons/svg/others/search.svg";
import { ReactComponent as TickIcon } from "assets/icons/svg/others/tick.svg";
import { mostPopularCurrencies } from "./constants";
import { useCurrencies } from "./hooks";
import {
  Modal,
  Overlay,
  Header,
  InputWraper,
  PopularToken,
  PopularTokens,
  FoundToken,
  FoundTokens,
  LoadingMessage,
} from "./styles";

interface CurrencyModalProps {
  isOpen: boolean;
  currentCurrency?: string | null;
  onSelectCurrency: (currency: string, price: number) => void;
  closeModal: () => void;
}
const CurrencyModal: React.FunctionComponent<CurrencyModalProps> = ({
  isOpen = false,
  currentCurrency = "",
  closeModal,
  onSelectCurrency,
}) => {
  const [search, setSearch] = useState<string>("");
  const currencies = useCurrencies();

  const debounceSetSearch = useCallback(
    debounce((value) => setSearch(value), 1000),
    [],
  );

  const handleSearch = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    debounceSetSearch(value);
  };
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    closeModal();
  };
  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { currentTarget } = event;
    const currency = currentTarget.getAttribute("data-currency");
    const price = currentTarget.getAttribute("data-price");
    if (currency && price) onSelectCurrency(currency, Number(price));
    closeModal();
  };

  return (
    <>
      {createPortal(
        <Overlay $isOpen={isOpen}>
          <Modal>
            <Header>
              <span>Select a token</span>
              <button onClick={handleClose}>
                <CrossIcon />
              </button>
            </Header>
            <InputWraper>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search name or paste address"
                onChange={handleSearch}
              />
            </InputWraper>
            <PopularTokens>
              {mostPopularCurrencies.map((currency) => (
                <PopularToken
                  data-currency={currency.code}
                  data-price={currency.price}
                  key={currency.code}
                  onClick={handleClickButton}
                >
                  <CryptoIcon name={currency.code} />
                  {currency.code}
                </PopularToken>
              ))}
            </PopularTokens>
            <FoundTokens>
              {currencies.length === 0 && (
                <LoadingMessage>
                  Fetching currencies information...
                </LoadingMessage>
              )}
              {currencies.map((currency) => {
                const regExp = new RegExp(`[${currency.code}]`, "gi");
                return regExp.test(search) || search === "" ? (
                  <FoundToken
                    data-currency={currency.code}
                    data-price={currency.price}
                    $isCurrentCurrency={currency.code === currentCurrency}
                    key={currency.code}
                    onClick={handleClickButton}
                  >
                    <CryptoIcon name={currency.code} />
                    <p>{currency.code}</p>
                    <span>{currency.code}</span>
                    {currency.code === currentCurrency && <TickIcon />}
                  </FoundToken>
                ) : (
                  <></>
                );
              })}
            </FoundTokens>
          </Modal>
        </Overlay>,
        document.body,
      )}
    </>
  );
};

export default CurrencyModal;
