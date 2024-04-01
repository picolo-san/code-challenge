import React from "react";

import { Button } from "components/common";

interface HeaderProps {
  openWalletModal: () => void;
}

const headerStyles =
  "flex w-full fixed top-0 left-0 h-14 flex-row-reverse px-4 bg-colors-backgroundAlt z-10 items-center";

export const Header: React.FunctionComponent<HeaderProps> = ({
  openWalletModal,
  ...rest
}) => {
  return (
    <header className={headerStyles} {...rest}>
      <Button onClick={openWalletModal} size="small">
        Connect Wallet
      </Button>
    </header>
  );
};
