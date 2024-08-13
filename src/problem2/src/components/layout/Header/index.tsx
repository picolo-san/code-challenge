import React, { useState } from "react";
import { MetaMaskAvatar } from 'react-metamask-avatar';

import { Button, Title } from "components/common";

interface HeaderProps {
  openWalletModal: () => void;
}

const headerStyles =
  " w-full fixed top-0 left-0 h-14 grid grid-rows-1 md:grid-cols-[13rem_auto_10rem] 2xs:grid-cols-[13rem_10rem] md:justify-normal 2xs:justify-between gap-7 px-4 bg-colors-backgroundAlt z-50 items-center border-b border-b-colors-cardBorder";

const logoStyles = "text-colors-text text-3xl font-bold";

const navStyles = "md:flex 2xs:hidden justify-self-start h-full";

const ulStyles = "flex items-center h-full";

const liStyles = "h-full flex items-center";

const aStyles =
  "h-5/6 flex items-center hover:bg-colors-tertiary px-4 rounded-lg";


export const Header: React.FunctionComponent<HeaderProps> = ({
  openWalletModal,
  ...rest
}) => {

  const [address, setAddress] = useState<string>("");
  const randomAddress = "0x8C2BB4D7AC26C6AD45B7DF6E4597BCC5DA8DBEC5"

  return (
    <header className={headerStyles} {...rest}>
      <a href="/" className={logoStyles}>
        My Little Swap
      </a>
      <nav className={navStyles}>
        <ul className={ulStyles}>
          <li className={liStyles}>
            <a className={aStyles} href="/">
              <Title className="text-colors-secondary font-semibold">
                Swap
              </Title>
            </a>
          </li>
          <li className={liStyles}>
            <a className={aStyles} href="https://app.uniswap.org/explore">
              <Title className="text-colors-textSubtle">Explore</Title>
            </a>
          </li>
          <li className={liStyles}>
            <a className={aStyles} href="https://app.uniswap.org/nfts">
              <Title className="text-colors-textSubtle">NFTs</Title>
            </a>
          </li>
          <li className={liStyles}>
            <a className={aStyles} href="https://app.uniswap.org/pool">
              <Title className="text-colors-textSubtle">Pool</Title>
            </a>
          </li>
        </ul>
      </nav>
      <Button
        className="justify-self-end"
        onClick={() => setAddress(randomAddress)}
        size="small"
      >
        {address && address != "" ? 
        <div className="flex items-center ">
          <MetaMaskAvatar address={address} size={24} /> {address.slice(0,6) + "..."}
        </div>
        : "Connect Wallet"}
      </Button>
    </header>
  );
};
