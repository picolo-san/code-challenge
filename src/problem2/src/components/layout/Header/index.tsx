import React from "react";

import { Button } from "components/common";

const headerStyles =
  "flex w-full fixed top-0 left-0 h-14 flex-row-reverse px-4 bg-colors-backgroundAlt z-10 items-center";

const Header: React.FunctionComponent<React.HTMLAttributes<HTMLElement>> = (
  props,
) => {
  return (
    <header className={headerStyles} {...props}>
      <Button size="small">Connect Wallet</Button>
    </header>
  );
};

export default Header;
