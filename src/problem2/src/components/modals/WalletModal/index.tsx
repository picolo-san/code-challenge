import React, { useState, useCallback, FormEvent } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import { MODAL_STATUS } from "types";

import { Heading, Paragraph, Span, Title } from "components/common";
import { ReactComponent as CrossIcon } from "assets/icons/svg/others/cross.svg";

import {
  modalStyles,
  overlayStyles,
  closedOverlayStyles,
  openedOverlayStyles,
  walletsStyles,
  walletStyles,
  walletImgStyles,
} from "./styles";

interface WalletModalProps {
  isOpen: MODAL_STATUS;
  close: () => void;
}

export const WalletModal: React.FunctionComponent<WalletModalProps> = ({
  isOpen,
  close,
}) => {
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    let { target } = event;
    let { currentTarget } = event;
    if (target === currentTarget) close();
  };

  const handleClose = () => {
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
            <div className="flex justify-between">
              <Heading className="text-xl font-semibold" level={4}>
                Connect Wallet
              </Heading>
              <button className="hover:opacity-65" onClick={handleClose}>
                <CrossIcon className="text-colors-primary h-6 w-6" />
              </button>
            </div>
            <Paragraph className="text-sm text-colors-textSubtle">
              Start by connecting with one of the wallets below. Be sure to
              store your private keys or seed phrase securely. Never share them
              with anyone.
            </Paragraph>

            <div className={walletsStyles}>
              <button className={walletStyles}>
                <img
                  className={walletImgStyles}
                  src="https://assets.pancakeswap.finance/web/wallets/metamask.png"
                />
                <Title>MetaMask</Title>
              </button>
              <button className={walletStyles}>
                <img
                  className={walletImgStyles}
                  src="https://assets.pancakeswap.finance/web/wallets/binance-w3w.png"
                />
                <Title>Binance Web3 Wallet</Title>
              </button>
              <button className={walletStyles}>
                <img
                  className={walletImgStyles}
                  src="https://assets.pancakeswap.finance/web/wallets/coinbase.png"
                />
                <Title>Coinbase Wallet</Title>
              </button>
              <button className={walletStyles}>
                <img
                  className={walletImgStyles}
                  src="https://assets.pancakeswap.finance/web/wallets/trust.png"
                />
                <Title>Trust Wallet</Title>
              </button>
              <button className={walletStyles}>
                <img
                  className={walletImgStyles}
                  src="https://assets.pancakeswap.finance/web/wallets/walletconnect.png"
                />
                <Title>WalletConnect</Title>
              </button>
              <button className={walletStyles}>
                <img
                  className={walletImgStyles}
                  src="https://assets.pancakeswap.finance/web/wallets/opera.png"
                />
                <Title>Opera Wallet</Title>
              </button>
              <button className={walletStyles}>
                <img
                  className={walletImgStyles}
                  src="https://assets.pancakeswap.finance/web/wallets/brave.png"
                />
                <Title>Brave Wallet</Title>
              </button>
              <button className={walletStyles}>
                <img
                  className={walletImgStyles}
                  src="https://assets.pancakeswap.finance/web/wallets/rabby.png"
                />
                <Span>Rabby Wallet</Span>
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
